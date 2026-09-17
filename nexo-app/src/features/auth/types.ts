/** Modelo de domínio da feature auth — independente do formato da API. */

export type PerfilUsuario = {
  id: number;
  nome: string;
  descricao?: string;
};

export type UsuarioLogado = {
  id: number;
  email: string;
  ativo: boolean;
  nome: string;
  cargo?: string;
  setor?: string;
  matricula?: string;
  funcionarioId?: number;
  perfis: PerfilUsuario[];
  permissoes: string[];
};

export type Sessao = {
  token: string;
  refreshToken: string | null;
  usuario: UsuarioLogado;
};

export type Credenciais = {
  email: string;
  senha: string;
};
