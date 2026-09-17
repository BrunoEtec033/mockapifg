import {
  Evidencia,
  Instrutor,
  Participante,
  Responsavel,
  StatusParticipante,
  StatusTreinamento,
  Treinamento,
  TreinamentoDetalhado,
} from '../types';
import {
  EvidenciaDto,
  InstrutorDto,
  ParticipanteDto,
  ResponsavelDto,
  TreinamentoCompletoDto,
  TreinamentoDto,
} from './treinamentos.dto';

const STATUS_TREINAMENTO: StatusTreinamento[] = [
  'pendente',
  'em_andamento',
  'concluido',
  'cancelado',
];

const STATUS_PARTICIPANTE: StatusParticipante[] = ['pendente', 'aprovado', 'reprovado'];

function normalizarStatusTreinamento(bruto?: string | null): StatusTreinamento {
  const valor = (bruto ?? '').toLowerCase().replace(/[\s-]/g, '_');
  return STATUS_TREINAMENTO.includes(valor as StatusTreinamento)
    ? (valor as StatusTreinamento)
    : 'pendente';
}

function normalizarStatusParticipante(bruto?: string | null): StatusParticipante {
  const valor = (bruto ?? '').toLowerCase();
  return STATUS_PARTICIPANTE.includes(valor as StatusParticipante)
    ? (valor as StatusParticipante)
    : 'pendente';
}

export function paraTreinamento(dto: TreinamentoDto): Treinamento {
  return {
    id: dto.id,
    titulo: dto.titulo,
    descricao: dto.descricao ?? undefined,
    cargaHoraria: dto.cargaHoraria ?? 0,
    status: normalizarStatusTreinamento(dto.status),
    dataInicio: dto.dataInicio ?? undefined,
    dataFim: dto.dataFim ?? undefined,
  };
}

export function paraInstrutor(dto: InstrutorDto): Instrutor {
  return {
    id: dto.id,
    nome: dto.nome,
    especialidade: dto.especialidade,
    registro: dto.registro ?? undefined,
    interno: dto.interno ?? false,
  };
}

export function paraParticipante(dto: ParticipanteDto): Participante {
  return {
    id: dto.id,
    funcionarioId: dto.funcionarioId,
    status: normalizarStatusParticipante(dto.status),
    inscritoEm: dto.inscritoEm ?? undefined,
  };
}

export function paraEvidencia(dto: EvidenciaDto): Evidencia {
  return {
    id: dto.id,
    tipo: dto.tipo,
    descricao: dto.descricao ?? undefined,
    arquivo: dto.arquivo ?? undefined,
    registradoEm: dto.registradoEm ?? undefined,
  };
}

export function paraResponsavel(dto: ResponsavelDto): Responsavel {
  return { id: dto.id, email: dto.email };
}

function semNulos<T>(lista: (T | null)[]): T[] {
  return lista.filter((item): item is T => item !== null);
}

export function paraTreinamentoDetalhado(dto: TreinamentoCompletoDto): TreinamentoDetalhado {
  return {
    treinamento: paraTreinamento(dto.treinamento),
    instrutores: semNulos(dto.instrutores).map(paraInstrutor),
    responsaveis: semNulos(dto.responsaveis).map(paraResponsavel),
    participantes: semNulos(dto.participantes).map(paraParticipante),
    evidencias: semNulos(dto.evidencias).map(paraEvidencia),
    assinaturas: [],
  };
}

/** Rótulo e tom de cor por status — decisão de interface, centralizada. */
export const APRESENTACAO_STATUS: Record<
  StatusTreinamento,
  { rotulo: string; tom: 'neutro' | 'sucesso' | 'aviso' | 'perigo' | 'sinal' }
> = {
  pendente: { rotulo: 'Pendente', tom: 'aviso' },
  em_andamento: { rotulo: 'Em andamento', tom: 'sinal' },
  concluido: { rotulo: 'Concluído', tom: 'sucesso' },
  cancelado: { rotulo: 'Cancelado', tom: 'perigo' },
};
