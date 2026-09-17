/** Contrato de paginação usado pelas listas (json-server: _page/_limit). */
export type Paginacao = {
  pagina: number;
  tamanho: number;
};

export const PAGINACAO_PADRAO: Paginacao = { pagina: 1, tamanho: 20 };
