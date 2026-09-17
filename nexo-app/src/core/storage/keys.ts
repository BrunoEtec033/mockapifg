/** Todas as chaves persistidas ficam declaradas aqui — evita string solta. */
export const CHAVES_STORAGE = {
  token: 'linha.token',
  refreshToken: 'linha.refreshToken',
  permissoes: 'linha.permissoes',
  usuarioId: 'linha.usuarioId',
} as const;

export type ChaveStorage = (typeof CHAVES_STORAGE)[keyof typeof CHAVES_STORAGE];
