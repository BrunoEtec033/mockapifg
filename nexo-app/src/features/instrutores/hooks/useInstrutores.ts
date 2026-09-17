import { useState } from 'react';
import { useMutation,useQuery,useQueryClient } from '@tanstack/react-query';
import { useAppErro } from '@shared/hooks';
import { instrutoresService } from '../services/instrutoresService';
import type { InstrutorInput } from '../types';
export const chavesInstrutores={raiz:['instrutores'] as const,lista:(b:string)=>['instrutores','lista',b] as const,detalhe:(id:number)=>['instrutores','detalhe',id] as const};
export function useInstrutores(){const [busca,setBusca]=useState('');const qc=useQueryClient();const q=useQuery({queryKey:chavesInstrutores.lista(busca.trim()),queryFn:()=>instrutoresService.listar(busca.trim()||undefined)});const del=useMutation({mutationFn:instrutoresService.excluir,onSuccess:()=>qc.invalidateQueries({queryKey:chavesInstrutores.raiz})});return{instrutores:q.data??[],busca,setBusca,carregando:q.isPending,erro:useAppErro(q.error),recarregar:q.refetch,excluir:del.mutateAsync}}
export function useInstrutorDetalhe(id:number){const q=useQuery({queryKey:chavesInstrutores.detalhe(id),queryFn:()=>instrutoresService.contexto(id)});return{detalhe:q.data??null,carregando:q.isPending,erro:useAppErro(q.error),recarregar:q.refetch}}
export function useSalvarInstrutor(id?:number){const qc=useQueryClient();const m=useMutation({mutationFn:(input:InstrutorInput)=>instrutoresService.salvar(input,id),onSuccess:()=>qc.invalidateQueries({queryKey:chavesInstrutores.raiz})});return{salvar:m.mutateAsync,salvando:m.isPending,erro:useAppErro(m.error)}}
