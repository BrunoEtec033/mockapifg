import { useCallback, useState } from 'react';
import { AppError } from '@core/errors';
import { useSessao } from '../AuthProvider';
import { Credenciais } from '../types';

/**
 * Controla a interação da tela de login: campos, validação local e envio.
 * A tela cuida da apresentação; este hook, do comportamento.
 */
export function useLogin() {
  const { entrar } = useSessao();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<AppError | null>(null);
  const [erroCampo, setErroCampo] = useState<Partial<Record<keyof Credenciais, string>>>({});

  const validar = useCallback((): boolean => {
    const problemas: Partial<Record<keyof Credenciais, string>> = {};
    if (!email.includes('@')) problemas.email = 'Informe um e-mail válido.';
    if (senha.length < 6) problemas.senha = 'A senha tem no mínimo 6 caracteres.';
    setErroCampo(problemas);
    return Object.keys(problemas).length === 0;
  }, [email, senha]);

  const enviar = useCallback(async () => {
    if (!validar()) return;
    setEnviando(true);
    setErro(null);
    try {
      await entrar({ email: email.trim(), senha });
    } catch (falha) {
      setErro(falha as AppError);
    } finally {
      setEnviando(false);
    }
  }, [email, senha, entrar, validar]);

  return { email, setEmail, senha, setSenha, enviando, erro, erroCampo, enviar };
}
