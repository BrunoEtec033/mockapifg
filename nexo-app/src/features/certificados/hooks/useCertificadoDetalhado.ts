import { useQuery } from '@tanstack/react-query';
import { useAppErro } from '@shared/hooks';
import { certificadosService } from '../services/certificadosService';
import { chavesCertificados } from './useCertificados';

export function useCertificadoDetalhado(id: number) {
  const consulta = useQuery({
    queryKey: chavesCertificados.detalhe(id),
    queryFn: () => certificadosService.buscarDetalhado(id),
    enabled: Number.isFinite(id),
  });

  return {
    detalhe: consulta.data ?? null,
    carregando: consulta.isPending,
    erro: useAppErro(consulta.error),
    recarregar: consulta.refetch,
  };
}
