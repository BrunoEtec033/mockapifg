import { z } from 'zod';
import { endpoints,httpClient } from '@core/api';
import type { Auditoria,Perfil,PerfilInput,Permissao,Usuario,UsuarioInput } from '../types';
const usuario=z.object({id:z.number(),email:z.string(),funcionarioId:z.number().nullish(),ativo:z.boolean().nullish(),criadoEm:z.string().nullish()});
const perfil=z.object({id:z.number(),nome:z.string(),descricao:z.string().nullish()});
const permissao=z.object({id:z.number(),codigo:z.string(),recurso:z.string(),metodo:z.string(),rotaTemplate:z.string(),descricao:z.string().nullish(),ehPublico:z.boolean().nullish()});
const auditoria=z.object({id:z.number(),entidade:z.string(),entidadeId:z.number(),acao:z.string(),usuarioId:z.number(),detalhe:z.string().nullish(),realizadoEm:z.string().nullish()});
const funcionario=z.object({id:z.number(),nome:z.string(),matricula:z.string(),cargo:z.string().nullish(),setor:z.string().nullish()});
const mu=(x:z.infer<typeof usuario>):Usuario=>({id:x.id,email:x.email,funcionarioId:x.funcionarioId??undefined,ativo:x.ativo??true,criadoEm:x.criadoEm??undefined});
const mp=(x:z.infer<typeof perfil>):Perfil=>({id:x.id,nome:x.nome,descricao:x.descricao??undefined});
export const administracaoService={
 listarUsuarios:async()=> (await httpClient.get(endpoints.usuarios.lista,z.array(usuario),{_sort:'criadoEm',_order:'desc'})).map(mu),
 listarFuncionarios:async()=> httpClient.get(endpoints.funcionarios.lista,z.array(funcionario),{_sort:'nome',_order:'asc'}),
 salvarUsuario:async(input:UsuarioInput,id?:number)=>mu(id?await httpClient.patch(endpoints.usuarios.porId(id),usuario,input):await httpClient.post(endpoints.usuarios.lista,usuario,input)),
 excluirUsuario:async(id:number)=>{await httpClient.delete(endpoints.usuarios.porId(id),z.any())},
 listarPerfis:async()=> (await httpClient.get(endpoints.perfis.lista,z.array(perfil),{_sort:'nome',_order:'asc'})).map(mp),
 salvarPerfil:async(input:PerfilInput,id?:number)=>mp(id?await httpClient.put(endpoints.perfis.porId(id),perfil,input):await httpClient.post(endpoints.perfis.lista,perfil,input)),
 excluirPerfil:async(id:number)=>{await httpClient.delete(endpoints.perfis.porId(id),z.any())},
 listarPermissoes:async():Promise<Permissao[]>=> (await httpClient.get(endpoints.permissoes.lista,z.array(permissao),{_sort:'recurso',_order:'asc'})).map(x=>({id:x.id,codigo:x.codigo,recurso:x.recurso,metodo:x.metodo,rotaTemplate:x.rotaTemplate,descricao:x.descricao??undefined,ehPublico:x.ehPublico??false})),
 listarAuditorias:async():Promise<Auditoria[]>=> (await httpClient.get(endpoints.auditorias.lista,z.array(auditoria),{_sort:'realizadoEm',_order:'desc'})).map(x=>({id:x.id,entidade:x.entidade,entidadeId:x.entidadeId,acao:x.acao,usuarioId:x.usuarioId,detalhe:x.detalhe??undefined,realizadoEm:x.realizadoEm??undefined})),
};
