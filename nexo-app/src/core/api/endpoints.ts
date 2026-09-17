/** Catálogo completo das rotas publicadas pelo Swagger da Mock API. */
export const endpoints = {
  sistema: { health: '/health' },
  auth: { login: '/api/login', me: '/api/me' },
  dashboard: { resumo: '/api/dashboard' },
  funcionarios: { lista: '/api/funcionarios', porId: (id: number) => `/api/funcionarios/${id}` },
  instrutores: { lista: '/api/instrutores', porId: (id: number) => `/api/instrutores/${id}` },
  usuarios: { lista: '/api/usuarios', porId: (id: number) => `/api/usuarios/${id}` },
  perfis: { lista: '/api/perfis', porId: (id: number) => `/api/perfis/${id}` },
  permissoes: { lista: '/api/permissoes', porId: (id: number) => `/api/permissoes/${id}` },
  perfilPermissoes: { lista: '/api/perfilPermissoes', porId: (id: number) => `/api/perfilPermissoes/${id}` },
  usuarioPerfis: { lista: '/api/usuarioPerfis', porId: (id: number) => `/api/usuarioPerfis/${id}` },
  treinamentos: { lista: '/api/treinamentos', porId: (id: number) => `/api/treinamentos/${id}`, completo: (id: number) => `/api/treinamentos/${id}/completo` },
  responsaveis: { lista: '/api/treinamentoResponsaveis', porId: (id: number) => `/api/treinamentoResponsaveis/${id}` },
  instrutoresTreinamento: { lista: '/api/treinamentoInstrutores', porId: (id: number) => `/api/treinamentoInstrutores/${id}` },
  participantes: { lista: '/api/treinamentoParticipantes', porId: (id: number) => `/api/treinamentoParticipantes/${id}` },
  assinaturas: { lista: '/api/assinaturas', porId: (id: number) => `/api/assinaturas/${id}` },
  evidencias: { lista: '/api/evidencias', porId: (id: number) => `/api/evidencias/${id}` },
  certificados: { lista: '/api/certificados', porId: (id: number) => `/api/certificados/${id}`, completo: (id: number) => `/api/certificados/${id}/completo` },
  auditorias: { lista: '/api/auditorias', porId: (id: number) => `/api/auditorias/${id}` },
} as const;

export type ParamsListagem = {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  q?: string;
  [filtro: string]: string | number | boolean | undefined;
};
