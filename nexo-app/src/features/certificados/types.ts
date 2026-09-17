export type StatusCertificado = 'valido' | 'expirado' | 'cancelado';

export type Certificado = {
  id: number;
  numero: string;
  participanteId: number;
  dataEmissao?: string;
  dataValidade?: string;
  status: StatusCertificado;
  /** Calculado no cliente a partir da validade. */
  diasParaVencer: number | null;
};

export type CertificadoDetalhado = {
  certificado: Certificado;
  funcionario: { id: number; nome: string; matricula: string; cargo?: string } | null;
  treinamento: { id: number; titulo: string; cargaHoraria: number } | null;
};
