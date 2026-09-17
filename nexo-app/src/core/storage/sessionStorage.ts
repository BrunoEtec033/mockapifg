import { CHAVES_STORAGE } from './keys';
import { secureStorage } from './secureStorage';

export type SessaoPersistida = {
  token: string;
  refreshToken: string | null;
  permissoes: string[];
};

/** Leitura/escrita da sessão. O httpClient lê daqui; as telas nunca. */
export const sessionStorage = {
  async carregar(): Promise<SessaoPersistida | null> {
    const token = await secureStorage.ler(CHAVES_STORAGE.token);
    if (!token) return null;
    const refreshToken = await secureStorage.ler(CHAVES_STORAGE.refreshToken);
    const permissoesBruto = await secureStorage.ler(CHAVES_STORAGE.permissoes);
    return {
      token,
      refreshToken,
      permissoes: permissoesBruto ? (JSON.parse(permissoesBruto) as string[]) : [],
    };
  },

  async salvar(sessao: SessaoPersistida): Promise<void> {
    await secureStorage.gravar(CHAVES_STORAGE.token, sessao.token);
    await secureStorage.gravar(CHAVES_STORAGE.permissoes, JSON.stringify(sessao.permissoes));
    if (sessao.refreshToken) {
      await secureStorage.gravar(CHAVES_STORAGE.refreshToken, sessao.refreshToken);
    }
  },

  async limpar(): Promise<void> {
    await secureStorage.removerVarias([
      CHAVES_STORAGE.token,
      CHAVES_STORAGE.refreshToken,
      CHAVES_STORAGE.permissoes,
      CHAVES_STORAGE.usuarioId,
    ]);
  },
};
