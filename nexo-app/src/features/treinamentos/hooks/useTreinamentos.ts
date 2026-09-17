import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppErro } from '@shared/hooks';
import { PAGINACAO_PADRAO } from '@shared/types';
import { treinamentosService } from '../services/treinamentosService';
import { FiltroTreinamentos, StatusTreinamento } from '../types';

export const chavesTreinamentos = {
  raiz: ['treinamentos'] as const,
  lista: (filtro: FiltroTreinamentos) => ['treinamentos', 'lista', filtro] as const,
  detalhe: (id: number) => ['treinamentos', 'detalhe', id] as const,
};

export const FILTROS_STATUS: { valor: StatusTreinamento | 'todos'; rotulo: string }[] = [
  { valor: 'todos', rotulo: 'Todos' },
  { valor: 'em_andamento', rotulo: 'Em andamento' },
  { valor: 'pendente', rotulo: 'Pendentes' },
  { valor: 'concluido', rotulo: 'Concluídos' },
];

/** Estado da tela de lista: filtro + consulta. A tela só renderiza. */
export function useTreinamentos() {
  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState<StatusTreinamento | 'todos'>('todos');

  const filtro = useMemo<FiltroTreinamentos>(
    () => ({ busca: busca.trim() || undefined, status }),
    [busca, status],
  );

  const consulta = useQuery({
    queryKey: chavesTreinamentos.lista(filtro),
    queryFn: () => treinamentosService.listar(filtro, PAGINACAO_PADRAO),
    staleTime: 30_000,
  });

  return {
    treinamentos: consulta.data ?? [],
    busca,
    setBusca,
    status,
    setStatus,
    carregando: consulta.isPending,
    atualizando: consulta.isRefetching,
    erro: useAppErro(consulta.error),
    recarregar: consulta.refetch,
  };
}
