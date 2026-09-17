import { endpoints, httpClient } from '@core/api';
import { ResumoPainel } from '../types';
import { resumoPainelDto } from './dashboard.dto';
import { paraResumoPainel } from './dashboard.mapper';

export const dashboardService = {
  async carregarResumo(): Promise<ResumoPainel> {
    const dto = await httpClient.get(endpoints.dashboard.resumo, resumoPainelDto);
    return paraResumoPainel(dto);
  },
};
