import { z } from 'zod';

export const certificadoDto = z.object({
  id: z.number(),
  treinamentoParticipantesId: z.number(),
  numero: z.string(),
  dataEmissao: z.string().nullish(),
  dataValidade: z.string().nullish(),
  status: z.string().nullish(),
});

export const listaCertificadosDto = z.array(certificadoDto);

export const certificadoCompletoDto = z.object({
  certificado: certificadoDto,
  participante: z
    .object({ id: z.number(), treinamentoId: z.number(), funcionarioId: z.number() })
    .nullable(),
  funcionario: z
    .object({
      id: z.number(),
      nome: z.string(),
      matricula: z.string(),
      cargo: z.string().nullish(),
    })
    .nullable(),
  treinamento: z
    .object({ id: z.number(), titulo: z.string(), cargaHoraria: z.number().nullish() })
    .nullable(),
});

export type CertificadoDto = z.infer<typeof certificadoDto>;
export type CertificadoCompletoDto = z.infer<typeof certificadoCompletoDto>;
