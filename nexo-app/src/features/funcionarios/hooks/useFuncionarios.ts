import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppErro } from '@shared/hooks';
import { funcionariosService } from '../services/funcionariosService';
import type { FuncionarioInput } from '../types';

export const chavesFuncionarios = { raiz: ['funcionarios'] as const, lista: (busca: string) => ['funcionarios','lista',busca] as const, detalhe: (id:number) => ['funcionarios','detalhe',id] as const };

export function useFuncionarios() {
  const [busca,setBusca] = useState('');
  const qc = useQueryClient();
  const q = useQuery({ queryKey: chavesFuncionarios.lista(busca.trim()), queryFn: () => funcionariosService.listar(busca.trim() || undefined) });
  const excluir = useMutation({ mutationFn: funcionariosService.excluir, onSuccess: async () => { await qc.invalidateQueries({ queryKey: chavesFuncionarios.raiz }); } });
  return { funcionarios:q.data??[], busca,setBusca, carregando:q.isPending, atualizando:q.isRefetching, erro:useAppErro(q.error), recarregar:q.refetch, excluir:excluir.mutateAsync, excluindo:excluir.isPending, erroExclusao:useAppErro(excluir.error) };
}

export function useFuncionarioDetalhe(id:number) {
  const q=useQuery({queryKey:chavesFuncionarios.detalhe(id),queryFn:()=>funcionariosService.buscarContexto(id),enabled:Number.isFinite(id)});
  return { detalhe:q.data??null, carregando:q.isPending, erro:useAppErro(q.error), recarregar:q.refetch };
}

export function useSalvarFuncionario(id?:number) {
  const qc=useQueryClient();
  const m=useMutation({mutationFn:(input:FuncionarioInput)=>funcionariosService.salvar(input,id),onSuccess:async()=>{await qc.invalidateQueries({queryKey:chavesFuncionarios.raiz});}});
  return { salvar:m.mutateAsync, salvando:m.isPending, erro:useAppErro(m.error) };
}
