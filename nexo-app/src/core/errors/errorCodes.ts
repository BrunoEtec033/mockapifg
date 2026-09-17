/** Códigos devolvidos pela Mock API + códigos criados pelo cliente. */
export const CODIGOS_ERRO = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  CONFLICT: 'CONFLICT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  // gerados no cliente
  SEM_CONEXAO: 'SEM_CONEXAO',
  TIMEOUT: 'TIMEOUT',
  CONTRATO_INVALIDO: 'CONTRATO_INVALIDO',
  DESCONHECIDO: 'DESCONHECIDO',
} as const;

export type CodigoErro = (typeof CODIGOS_ERRO)[keyof typeof CODIGOS_ERRO];

/** Texto exibido ao usuário. A tela nunca escreve mensagem de erro de HTTP. */
export const MENSAGENS_ERRO: Record<CodigoErro, string> = {
  UNAUTHORIZED: 'Sua sessão expirou. Entre novamente.',
  FORBIDDEN: 'Seu perfil não tem permissão para esta ação.',
  NOT_FOUND: 'Não encontramos este registro.',
  VALIDATION_ERROR: 'Revise os campos destacados.',
  CONFLICT: 'Este registro já existe.',
  INTERNAL_ERROR: 'A API falhou ao responder. Tente de novo.',
  SEM_CONEXAO: 'Sem conexão com o servidor. Verifique a rede.',
  TIMEOUT: 'O servidor demorou demais para responder.',
  CONTRATO_INVALIDO: 'A resposta da API mudou de formato. Avise a equipe.',
  DESCONHECIDO: 'Algo saiu do previsto. Tente de novo.',
};
