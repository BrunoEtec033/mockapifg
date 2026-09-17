import { z } from 'zod';
import { endpoints, httpClient } from '@core/api';
import type { ContextoInstrutor, Instrutor, InstrutorInput } from '../types';
const dto=z.object({id:z.number(),nome:z.string(),especialidade:z.string(),registro:z.string().nullish(),email:z.string().nullish(),interno:z.boolean().nullish()});
const linkDto=z.object({id:z.number(),treinamentoId:z.number(),instrutorId:z.number()});
const treinoDto=z.object({id:z.number(),titulo:z.string(),status:z.string().nullish(),dataInicio:z.string().nullish(),cargaHoraria:z.number().nullish()});
const map=(x:z.infer<typeof dto>):Instrutor=>({id:x.id,nome:x.nome,especialidade:x.especialidade,registro:x.registro??undefined,email:x.email??undefined,interno:x.interno??false});
export const instrutoresService={
 async listar(busca?:string){const xs=await httpClient.get(endpoints.instrutores.lista,z.array(dto),busca?{q:busca}:{_sort:'nome',_order:'asc'});return xs.map(map)},
 async buscar(id:number){return map(await httpClient.get(endpoints.instrutores.porId(id),dto))},
 async salvar(input:InstrutorInput,id?:number){const x=id?await httpClient.put(endpoints.instrutores.porId(id),dto,input):await httpClient.post(endpoints.instrutores.lista,dto,input);return map(x)},
 async excluir(id:number){await httpClient.delete(endpoints.instrutores.porId(id),z.any())},
 async contexto(id:number):Promise<ContextoInstrutor>{const [instrutor,links,treinos]=await Promise.all([this.buscar(id),httpClient.get(endpoints.instrutoresTreinamento.lista,z.array(linkDto),{instrutorId:id}),httpClient.get(endpoints.treinamentos.lista,z.array(treinoDto))]);const ids=new Set(links.map(x=>x.treinamentoId));return {instrutor,treinamentos:treinos.filter(t=>ids.has(t.id)).map(t=>({id:t.id,titulo:t.titulo,status:t.status??undefined,dataInicio:t.dataInicio??undefined,cargaHoraria:t.cargaHoraria??undefined}))}}
};
