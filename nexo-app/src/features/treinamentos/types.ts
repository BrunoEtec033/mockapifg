export type StatusTreinamento = 'pendente' | 'em_andamento' | 'concluido' | 'cancelado';

export type Treinamento = {
  id: number;
  titulo: string;
  descricao?: string;
  cargaHoraria: number;
  status: StatusTreinamento;
  dataInicio?: string;
  dataFim?: string;
};

export type Instrutor = {
  id: number;
  nome: string;
  especialidade: string;
  registro?: string;
  interno: boolean;
};

export type StatusParticipante = 'pendente' | 'aprovado' | 'reprovado';

export type Participante = {
  id: number;
  funcionarioId: number;
  status: StatusParticipante;
  inscritoEm?: string;
  nome?: string;
  matricula?: string;
};

export type Assinatura = { id: number; treinamentoParticipantesId: number; tipo: string; assinadoEm?: string; hash?: string };

export type Evidencia = {
  id: number;
  tipo: string;
  descricao?: string;
  arquivo?: string;
  registradoEm?: string;
};

export type Responsavel = {
  id: number;
  email: string;
};

/** Agregado devolvido por GET /api/treinamentos/{id}/completo. */
export type TreinamentoDetalhado = {
  treinamento: Treinamento;
  instrutores: Instrutor[];
  responsaveis: Responsavel[];
  participantes: Participante[];
  evidencias: Evidencia[];
  assinaturas: Assinatura[];
};

export type FiltroTreinamentos = {
  busca?: string;
  status?: StatusTreinamento | 'todos';
};

export type TreinamentoInput = { titulo: string; descricao: string; cargaHoraria: number; status: StatusTreinamento; dataInicio: string; dataFim: string };
