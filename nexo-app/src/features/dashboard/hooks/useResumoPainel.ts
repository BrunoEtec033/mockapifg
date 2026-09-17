import { useQuery } from '@tanstack/react-query';
import { useAppErro } from '@shared/hooks';
import { paraIndicadores } from '../services/dashboard.mapper';
import { dashboardService } from '../services/dashboardService';

export const chavesDashboard = {
  resumo: ['dashboard', 'resumo'] as const,
};

export function useResumoPainel() {
  const consulta = useQuery({
    queryKey: chavesDashboard.resumo,
    queryFn: dashboardService.carregarResumo,
    staleTime: 60_000,
  });

  return {
    resumo: consulta.data ?? null,
    indicadores: consulta.data ? paraIndicadores(consulta.data) : [],
    carregando: consulta.isPending,
    atualizando: consulta.isRefetching,
    erro: useAppErro(consulta.error),
    recarregar: consulta.refetch,
  };
}
