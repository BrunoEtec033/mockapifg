export type Usuario = { id:number; email:string; funcionarioId?:number; ativo:boolean; criadoEm?:string };
export type Perfil = { id:number; nome:string; descricao?:string };
export type Permissao = { id:number; codigo:string; recurso:string; metodo:string; rotaTemplate:string; descricao?:string; ehPublico:boolean };
export type Auditoria = { id:number; entidade:string; entidadeId:number; acao:string; usuarioId:number; detalhe?:string; realizadoEm?:string };
export type UsuarioInput = { email:string; senha?:string; funcionarioId:number; ativo:boolean; criadoEm:string };
export type PerfilInput = { nome:string; descricao:string };
