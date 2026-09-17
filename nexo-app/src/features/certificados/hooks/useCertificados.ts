import { useQuery } from '@tanstack/react-query';
import { useAppErro } from '@shared/hooks';
import { certificadosService } from '../services/certificadosService';

export const chavesCertificados = {
  lista: ['certificados', 'lista'] as const,
  detalhe: (id: number) => ['certificados', 'detalhe', id] as const,
};

export function useCertificados() {
  const consulta = useQuery({
    queryKey: chavesCertificados.lista,
    queryFn: certificadosService.listar,
    staleTime: 60_000,
  });

  const certificados = consulta.data ?? [];

  return {
    certificados,
    /** Alerta operacional: reciclagem em até 60 dias. */
    proximosDoVencimento: certificados.filter(
      (c) => c.status === 'valido' && c.diasParaVencer !== null && c.diasParaVencer <= 60,
    ),
    carregando: consulta.isPending,
    atualizando: consulta.isRefetching,
    erro: useAppErro(consulta.error),
    recarregar: consulta.refetch,
  };
}
