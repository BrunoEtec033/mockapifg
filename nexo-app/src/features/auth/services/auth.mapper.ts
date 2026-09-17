import { PerfilUsuario, UsuarioLogado } from '../types';
import { MeRespostaDto, PerfilDto, UsuarioDto } from './auth.dto';

/**
 * Camada anticorrupção: DTO (formato da API) -> modelo de domínio (formato do app).
 * Quando a API real renomear um campo, só este arquivo muda.
 */

export function paraPerfil(dto: PerfilDto): PerfilUsuario {
  return { id: dto.id, nome: dto.nome, descricao: dto.descricao ?? undefined };
}

/**
 * GAP DE CONTRATO: /api/me não devolve as permissões efetivas do usuário.
 * Reconstruí-las exigiria 3 chamadas (usuarioPerfis + perfilPermissoes + permissoes).
 * Enquanto o backend não expõe `permissoes` em /api/me, derivamos pelo perfil.
 * Ver docs/api-gaps.md #2.
 */
const PERMISSOES_POR_PERFIL: Record<string, string[]> = {
  Administrador: ['TREINAMENTOS:LISTAR', 'TREINAMENTOS:CRIAR', 'USUARIOS:CRIAR', 'CERTIFICADOS:EMITIR'],
  Instrutor: ['TREINAMENTOS:LISTAR'],
  Participante: ['TREINAMENTOS:LISTAR'],
};

export function derivarPermissoes(perfis: PerfilUsuario[]): string[] {
  const conjunto = new Set<string>();
  perfis.forEach((perfil) => {
    (PERMISSOES_POR_PERFIL[perfil.nome] ?? []).forEach((p) => conjunto.add(p));
  });
  return [...conjunto];
}

export function paraUsuarioLogado(dto: MeRespostaDto): UsuarioLogado {
  const perfis = dto.perfis.map(paraPerfil);
  return {
    id: dto.usuario.id,
    email: dto.usuario.email,
    ativo: dto.usuario.ativo,
    nome: dto.funcionario?.nome ?? dto.usuario.email.split('@')[0] ?? 'Usuário',
    cargo: dto.funcionario?.cargo ?? undefined,
    setor: dto.funcionario?.setor ?? undefined,
    matricula: dto.funcionario?.matricula,
    funcionarioId: dto.usuario.funcionarioId ?? undefined,
    perfis,
    permissoes: derivarPermissoes(perfis),
  };
}

/** O POST /api/login devolve o usuário sem funcionário nem perfis. */
export function paraUsuarioMinimo(dto: UsuarioDto): UsuarioLogado {
  return {
    id: dto.id,
    email: dto.email,
    ativo: dto.ativo,
    nome: dto.email.split('@')[0] ?? 'Usuário',
    funcionarioId: dto.funcionarioId ?? undefined,
    perfis: [],
    permissoes: [],
  };
}
