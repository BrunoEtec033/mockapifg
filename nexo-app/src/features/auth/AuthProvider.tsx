import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { aoExpirarSessao } from '@core/api';
import { AppError, mapHttpError } from '@core/errors';
import { authService } from './services/authService';
import { Credenciais, UsuarioLogado } from './types';

type EstadoSessao = 'verificando' | 'autenticado' | 'visitante';

type ContextoAuth = {
  estado: EstadoSessao;
  usuario: UsuarioLogado | null;
  erro: AppError | null;
  entrar: (credenciais: Credenciais) => Promise<void>;
  sair: () => Promise<void>;
  podeFazer: (permissao: string) => boolean;
};

const Contexto = createContext<ContextoAuth | null>(null);

/**
 * Estado de sessão pertence à feature auth (é regra de negócio dela).
 * `app/providers` apenas compõe este Provider na árvore — não o implementa.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<EstadoSessao>('verificando');
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null);
  const [erro, setErro] = useState<AppError | null>(null);

  const encerrar = useCallback(async () => {
    await authService.sair();
    setUsuario(null);
    setEstado('visitante');
  }, []);

  // Restaura a sessão salva ao abrir o app.
  useEffect(() => {
    let ativo = true;
    (async () => {
      try {
        if (!(await authService.temSessaoSalva())) {
          if (ativo) setEstado('visitante');
          return;
        }
        const carregado = await authService.carregarUsuario();
        if (!ativo) return;
        setUsuario(carregado);
        setEstado('autenticado');
      } catch {
        if (ativo) await encerrar();
      }
    })();
    return () => {
      ativo = false;
    };
  }, [encerrar]);

  // 401 vindo de qualquer requisição derruba a sessão em um único lugar.
  useEffect(() => aoExpirarSessao(() => void encerrar()), [encerrar]);

  const entrar = useCallback(async (credenciais: Credenciais) => {
    setErro(null);
    try {
      const sessao = await authService.entrar(credenciais);
      // O token já é válido aqui. Se /api/me falhar, entramos com o usuário
      // mínimo do login em vez de barrar o acesso — perfil e permissões são
      // enriquecimento, não pré-requisito para autenticar.
      let usuarioFinal = sessao.usuario;
      try {
        usuarioFinal = await authService.carregarUsuario();
      } catch {
        // segue com o mínimo; o Perfil mostrará os dados incompletos
      }
      setUsuario(usuarioFinal);
      setEstado('autenticado');
    } catch (falha) {
      const appError = mapHttpError(falha);
      setErro(appError);
      throw appError;
    }
  }, []);

  const podeFazer = useCallback(
    (permissao: string) => usuario?.permissoes.includes(permissao) ?? false,
    [usuario],
  );

  const valor = useMemo<ContextoAuth>(
    () => ({ estado, usuario, erro, entrar, sair: encerrar, podeFazer }),
    [estado, usuario, erro, entrar, encerrar, podeFazer],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useSessao(): ContextoAuth {
  const contexto = useContext(Contexto);
  if (!contexto) throw new Error('useSessao precisa estar dentro de <AuthProvider>.');
  return contexto;
}
