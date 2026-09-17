export type Instrutor = { id:number; nome:string; especialidade:string; registro?:string; email?:string; interno:boolean };
export type InstrutorInput = { nome:string; especialidade:string; registro:string; email:string; interno:boolean };
export type TreinamentoInstrutor = { id:number; treinamentoId:number; instrutorId:number };
export type TreinamentoResumo = { id:number; titulo:string; status?:string; dataInicio?:string; cargaHoraria?:number };
export type ContextoInstrutor = { instrutor:Instrutor; treinamentos:TreinamentoResumo[] };
