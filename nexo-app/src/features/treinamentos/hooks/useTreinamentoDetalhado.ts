import { useQuery } from '@tanstack/react-query';
import { useAppErro } from '@shared/hooks';
import { treinamentosService } from '../services/treinamentosService';
import { chavesTreinamentos } from './useTreinamentos';

export function useTreinamentoDetalhado(id: number) {
  const consulta = useQuery({
    queryKey: chavesTreinamentos.detalhe(id),
    queryFn: () => treinamentosService.buscarDetalhado(id),
    enabled: Number.isFinite(id),
  });

  return {
    detalhe: consulta.data ?? null,
    carregando: consulta.isPending,
    erro: useAppErro(consulta.error),
    recarregar: consulta.refetch,
  };
}
