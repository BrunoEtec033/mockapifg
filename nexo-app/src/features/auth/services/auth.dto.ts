import { z } from 'zod';

/** Espelho fiel do que a API devolve hoje (schemas Usuario/LoginResponse/MeResponse). */

export const usuarioDto = z.object({
  id: z.number(),
  email: z.string(),
  funcionarioId: z.number().nullish(),
  ativo: z.boolean().default(true),
  criadoEm: z.string().nullish(),
});

export const funcionarioDto = z.object({
  id: z.number(),
  nome: z.string(),
  matricula: z.string(),
  cargo: z.string().nullish(),
  setor: z.string().nullish(),
});

export const perfilDto = z.object({
  id: z.number(),
  nome: z.string(),
  descricao: z.string().nullish(),
});

export const loginRespostaDto = z.object({
  token: z.string(),
  refreshToken: z.string().nullish(),
  usuario: usuarioDto,
});

export const meRespostaDto = z.object({
  usuario: usuarioDto,
  // A API pode devolver null quando o usuário não está vinculado a funcionário.
  funcionario: funcionarioDto.nullish(),
  perfis: z.array(perfilDto).default([]),
});

export type UsuarioDto = z.infer<typeof usuarioDto>;
export type FuncionarioDto = z.infer<typeof funcionarioDto>;
export type PerfilDto = z.infer<typeof perfilDto>;
export type LoginRespostaDto = z.infer<typeof loginRespostaDto>;
export type MeRespostaDto = z.infer<typeof meRespostaDto>;
