/**
 * A API ainda NÃO está finalizada.
 * Cada flag representa um contrato que pode não existir no backend real ainda.
 * Regra: nenhuma tela é excluída do app por causa de uma flag — ela entra em
 * estado "indisponível" (EstadoIndisponivel), preservando a navegação.
 */
export const flags = {
  /** POST /api/login hoje ignora as credenciais e devolve sempre usuarios[0]. */
  loginValidaCredenciais: false,
  /** Refresh token existe no payload mas não há endpoint para renová-lo. */
  refreshTokenAtivo: false,
  /** Envelope de lista não devolve total de registros; paginação é otimista. */
  paginacaoComTotal: false,
  /** Não existe GET /api/certificados/meus — filtramos no cliente. */
  certificadosDoUsuarioNoServidor: false,
  /** Upload de evidência (POST multipart) ainda não especificado no OpenAPI. */
  uploadEvidencias: false,
  /** Assinatura digital de presença ainda não tem endpoint de escrita. */
  assinaturaPresenca: false,
} as const;

export type Flag = keyof typeof flags;
