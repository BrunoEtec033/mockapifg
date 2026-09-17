export type Funcionario = { id: number; nome: string; matricula: string; cargo?: string; setor?: string };
export type FuncionarioInput = { nome: string; matricula: string; cargo: string; setor: string };
export type ParticipacaoResumo = { id: number; treinamentoId: number; funcionarioId: number; status: string; inscritoEm?: string };
export type TreinamentoResumo = { id: number; titulo: string; cargaHoraria?: number; dataInicio?: string; status?: string };
export type CertificadoResumo = { id: number; treinamentoParticipantesId: number; numero: string; dataValidade?: string; status?: string };
export type ContextoFuncionario = { funcionario: Funcionario; participacoes: ParticipacaoResumo[]; treinamentos: TreinamentoResumo[]; certificados: CertificadoResumo[] };
