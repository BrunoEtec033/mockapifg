import { z } from 'zod';

/**
 * A API ainda não fixou o enum de status: aceitamos qualquer string e
 * normalizamos no mapper. Assim um status novo não quebra a listagem inteira.
 */
export const treinamentoDto = z.object({
  id: z.number(),
  titulo: z.string(),
  descricao: z.string().nullish(),
  cargaHoraria: z.number().nullish(),
  status: z.string().nullish(),
  dataInicio: z.string().nullish(),
  dataFim: z.string().nullish(),
});

export const instrutorDto = z.object({
  id: z.number(),
  nome: z.string(),
  especialidade: z.string(),
  registro: z.string().nullish(),
  email: z.string().nullish(),
  interno: z.boolean().nullish(),
});

export const participanteDto = z.object({
  id: z.number(),
  treinamentoId: z.number(),
  funcionarioId: z.number(),
  status: z.string().nullish(),
  inscritoEm: z.string().nullish(),
});


export const assinaturaDto = z.object({
  id: z.number(),
  treinamentoParticipantesId: z.number(),
  tipo: z.string(),
  assinadoEm: z.string().nullish(),
  hash: z.string().nullish(),
});

export const evidenciaDto = z.object({
  id: z.number(),
  treinamentoId: z.number(),
  tipo: z.string(),
  descricao: z.string().nullish(),
  arquivo: z.string().nullish(),
  registradoEm: z.string().nullish(),
});

export const responsavelDto = z.object({
  id: z.number(),
  email: z.string(),
});

export const listaTreinamentosDto = z.array(treinamentoDto);

/**
 * O agregado /completo pode trazer buracos: quando um vínculo aponta para um
 * registro removido, a API devolve `null` dentro do array. Filtramos no mapper.
 */
export const treinamentoCompletoDto = z.object({
  treinamento: treinamentoDto,
  instrutores: z.array(instrutorDto.nullable()).default([]),
  responsaveis: z.array(responsavelDto.nullable()).default([]),
  participantes: z.array(participanteDto.nullable()).default([]),
  evidencias: z.array(evidenciaDto.nullable()).default([]),
});

export type TreinamentoDto = z.infer<typeof treinamentoDto>;
export type InstrutorDto = z.infer<typeof instrutorDto>;
export type ParticipanteDto = z.infer<typeof participanteDto>;
export type EvidenciaDto = z.infer<typeof evidenciaDto>;
export type ResponsavelDto = z.infer<typeof responsavelDto>;
export type TreinamentoCompletoDto = z.infer<typeof treinamentoCompletoDto>;

export type AssinaturaDto = z.infer<typeof assinaturaDto>;
