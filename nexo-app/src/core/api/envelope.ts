import { z } from 'zod';

/**
 * Toda resposta da API vem embrulhada em { success, data }.
 * O envelope é detalhe de transporte: some aqui e nunca chega às features.
 *
 * Validamos o envelope com `data: unknown` e só depois aplicamos o schema da
 * feature. Assim a inferência do Zod é preservada — inclusive `.default()`,
 * que muda o tipo de saída em relação ao de entrada.
 */
export const envelopeSucesso = z.object({
  success: z.literal(true),
  data: z.unknown(),
});

export const envelopeErro = z.object({
  success: z.literal(false),
  error: z.object({ code: z.string(), message: z.string() }),
});

export type EnvelopeSucesso<T> = { success: true; data: T };
