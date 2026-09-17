import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppErro } from '@shared/hooks';
import { treinamentosService } from '../services/treinamentosService';
import type { TreinamentoInput } from '../types';
import { chavesTreinamentos } from './useTreinamentos';

export function useSalvarTreinamento(id?: number) {
  const qc = useQueryClient();
  const m = useMutation({
    mutationFn: (input: TreinamentoInput) => treinamentosService.salvar(input, id),
    onSuccess: async () => { await qc.invalidateQueries({ queryKey: chavesTreinamentos.raiz }); },
  });
  return { salvar: m.mutateAsync, salvando: m.isPending, erro: useAppErro(m.error) };
}

export function useExcluirTreinamento() {
  const qc = useQueryClient();
  const m = useMutation({
    mutationFn: treinamentosService.excluir,
    onSuccess: async () => { await qc.invalidateQueries({ queryKey: chavesTreinamentos.raiz }); },
  });
  return { excluir: m.mutateAsync, excluindo: m.isPending, erro: useAppErro(m.error) };
}
