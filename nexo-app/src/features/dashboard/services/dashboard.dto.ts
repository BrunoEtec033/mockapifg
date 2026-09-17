import { z } from 'zod';

export const resumoPainelDto = z.object({
  quantidadeFuncionarios: z.number(),
  quantidadeUsuarios: z.number(),
  quantidadeTreinamentos: z.number(),
  quantidadeInstrutores: z.number(),
  quantidadeCertificados: z.number(),
});

export type ResumoPainelDto = z.infer<typeof resumoPainelDto>;
