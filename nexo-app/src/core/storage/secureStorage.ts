import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { ChaveStorage } from './keys';

/**
 * Fachada de armazenamento.
 *
 * expo-secure-store NÃO existe na web: qualquer chamada lança exceção. Como o
 * app roda no navegador durante o desenvolvimento (`npm start` -> tecla w),
 * escolhemos o adaptador por plataforma. Trocar por MMKV no futuro mexe só aqui.
 *
 * Na web usamos localStorage — suficiente para desenvolvimento, NÃO seguro para
 * produção. O alvo de produção é Android/iOS, onde vale o SecureStore.
 */

type Adaptador = {
  ler(chave: string): Promise<string | null>;
  gravar(chave: string, valor: string): Promise<void>;
  remover(chave: string): Promise<void>;
};

/** Último recurso: mantém a sessão viva enquanto o app estiver aberto. */
const memoria = new Map<string, string>();

const adaptadorMemoria: Adaptador = {
  async ler(chave) {
    return memoria.get(chave) ?? null;
  },
  async gravar(chave, valor) {
    memoria.set(chave, valor);
  },
  async remover(chave) {
    memoria.delete(chave);
  },
};

const adaptadorWeb: Adaptador = {
  async ler(chave) {
    try {
      return globalThis.localStorage.getItem(chave);
    } catch {
      return adaptadorMemoria.ler(chave);
    }
  },
  async gravar(chave, valor) {
    try {
      globalThis.localStorage.setItem(chave, valor);
    } catch {
      await adaptadorMemoria.gravar(chave, valor);
    }
  },
  async remover(chave) {
    try {
      globalThis.localStorage.removeItem(chave);
    } catch {
      await adaptadorMemoria.remover(chave);
    }
  },
};

const adaptadorNativo: Adaptador = {
  async ler(chave) {
    return SecureStore.getItemAsync(chave);
  },
  async gravar(chave, valor) {
    await SecureStore.setItemAsync(chave, valor);
  },
  async remover(chave) {
    await SecureStore.deleteItemAsync(chave);
  },
};

const adaptador: Adaptador = Platform.OS === 'web' ? adaptadorWeb : adaptadorNativo;

export const secureStorage = {
  /** Leitura nunca derruba o app: sem valor legível, tratamos como sem sessão. */
  async ler(chave: ChaveStorage): Promise<string | null> {
    try {
      return await adaptador.ler(chave);
    } catch {
      return null;
    }
  },

  /**
   * A escrita cai para memória em vez de lançar: perder a persistência entre
   * aberturas é um problema menor do que impedir o login.
   */
  async gravar(chave: ChaveStorage, valor: string): Promise<void> {
    try {
      await adaptador.gravar(chave, valor);
    } catch {
      await adaptadorMemoria.gravar(chave, valor);
    }
  },

  async remover(chave: ChaveStorage): Promise<void> {
    try {
      await adaptador.remover(chave);
    } catch {
      // já não existe: nada a fazer
    }
    await adaptadorMemoria.remover(chave);
  },

  async removerVarias(chaves: ChaveStorage[]): Promise<void> {
    await Promise.all(chaves.map((c) => secureStorage.remover(c)));
  },
};
