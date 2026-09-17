import { diasAte } from '@shared/utils';
import { Certificado, CertificadoDetalhado, StatusCertificado } from '../types';
import { CertificadoCompletoDto, CertificadoDto } from './certificados.dto';

const STATUS: StatusCertificado[] = ['valido', 'expirado', 'cancelado'];

function normalizarStatus(bruto: string | null | undefined, dataValidade?: string | null): StatusCertificado {
  const valor = (bruto ?? '').toLowerCase();
  if (STATUS.includes(valor as StatusCertificado)) {
    // A API não recalcula vencimento: um "valido" com data passada é vencido.
    const dias = diasAte(dataValidade);
    if (valor === 'valido' && dias !== null && dias < 0) return 'expirado';
    return valor as StatusCertificado;
  }
  return 'valido';
}

export function paraCertificado(dto: CertificadoDto): Certificado {
  return {
    id: dto.id,
    numero: dto.numero,
    participanteId: dto.treinamentoParticipantesId,
    dataEmissao: dto.dataEmissao ?? undefined,
    dataValidade: dto.dataValidade ?? undefined,
    status: normalizarStatus(dto.status, dto.dataValidade),
    diasParaVencer: diasAte(dto.dataValidade),
  };
}

export function paraCertificadoDetalhado(dto: CertificadoCompletoDto): CertificadoDetalhado {
  return {
    certificado: paraCertificado(dto.certificado),
    funcionario: dto.funcionario
      ? {
          id: dto.funcionario.id,
          nome: dto.funcionario.nome,
          matricula: dto.funcionario.matricula,
          cargo: dto.funcionario.cargo ?? undefined,
        }
      : null,
    treinamento: dto.treinamento
      ? {
          id: dto.treinamento.id,
          titulo: dto.treinamento.titulo,
          cargaHoraria: dto.treinamento.cargaHoraria ?? 0,
        }
      : null,
  };
}

export const APRESENTACAO_STATUS_CERTIFICADO: Record<
  StatusCertificado,
  { rotulo: string; tom: 'sucesso' | 'aviso' | 'perigo' }
> = {
  valido: { rotulo: 'Válido', tom: 'sucesso' },
  expirado: { rotulo: 'Expirado', tom: 'perigo' },
  cancelado: { rotulo: 'Cancelado', tom: 'aviso' },
};
