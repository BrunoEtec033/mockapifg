import { endpoints, httpClient } from '@core/api';
import { Certificado, CertificadoDetalhado } from '../types';
import { certificadoCompletoDto, listaCertificadosDto } from './certificados.dto';
import { paraCertificado, paraCertificadoDetalhado } from './certificados.mapper';

export const certificadosService = {
  async listar(): Promise<Certificado[]> {
    const dtos = await httpClient.get(endpoints.certificados.lista, listaCertificadosDto, {
      _sort: 'dataEmissao',
      _order: 'desc',
    });
    return dtos.map(paraCertificado);
  },

  async buscarDetalhado(id: number): Promise<CertificadoDetalhado> {
    const dto = await httpClient.get(endpoints.certificados.completo(id), certificadoCompletoDto);
    return paraCertificadoDetalhado(dto);
  },
};
