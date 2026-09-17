import { endpoints, httpClient, ParamsListagem } from '@core/api';
import { Paginacao } from '@shared/types';
import { FiltroTreinamentos, Treinamento, TreinamentoDetalhado, TreinamentoInput } from '../types';
import { assinaturaDto, listaTreinamentosDto, treinamentoCompletoDto, treinamentoDto } from './treinamentos.dto';
import { z } from 'zod';
import { paraTreinamento, paraTreinamentoDetalhado } from './treinamentos.mapper';

function montarParams(filtro: FiltroTreinamentos, paginacao: Paginacao): ParamsListagem {
  const params: ParamsListagem = {
    _page: paginacao.pagina,
    _limit: paginacao.tamanho,
    _sort: 'dataInicio',
    _order: 'desc',
  };
  if (filtro.busca) params.q = filtro.busca;
  if (filtro.status && filtro.status !== 'todos') params.status = filtro.status;
  return params;
}

export const treinamentosService = {
  async listar(filtro: FiltroTreinamentos, paginacao: Paginacao): Promise<Treinamento[]> {
    const dtos = await httpClient.get(
      endpoints.treinamentos.lista,
      listaTreinamentosDto,
      montarParams(filtro, paginacao),
    );
    return dtos.map(paraTreinamento);
  },

  async buscarPorId(id: number): Promise<Treinamento> {
    const dto = await httpClient.get(endpoints.treinamentos.porId(id), treinamentoDto);
    return paraTreinamento(dto);
  },



  async salvar(input: TreinamentoInput, id?: number): Promise<Treinamento> {
    const dto = id
      ? await httpClient.put(endpoints.treinamentos.porId(id), treinamentoDto, input)
      : await httpClient.post(endpoints.treinamentos.lista, treinamentoDto, input);
    return paraTreinamento(dto);
  },

  async excluir(id: number): Promise<void> {
    await httpClient.delete(endpoints.treinamentos.porId(id), z.any());
  },

  /** Uma chamada em vez de cinco: o agregado /completo evita cascata de requests. */
  async buscarDetalhado(id: number): Promise<TreinamentoDetalhado> {
    const funcionarioMiniDto = z.object({ id: z.number(), nome: z.string(), matricula: z.string() });
    const [dto, assinaturasDto, funcionarios] = await Promise.all([
      httpClient.get(endpoints.treinamentos.completo(id), treinamentoCompletoDto),
      httpClient.get(endpoints.assinaturas.lista, z.array(assinaturaDto)),
      httpClient.get(endpoints.funcionarios.lista, z.array(funcionarioMiniDto)),
    ]);
    const detalhe = paraTreinamentoDetalhado(dto);
    detalhe.participantes = detalhe.participantes.map((p) => {
      const f = funcionarios.find((x) => x.id === p.funcionarioId);
      return { ...p, nome: f?.nome, matricula: f?.matricula };
    });
    const idsParticipantes = new Set(detalhe.participantes.map((p) => p.id));
    detalhe.assinaturas = assinaturasDto
      .filter((a) => idsParticipantes.has(a.treinamentoParticipantesId))
      .map((a) => ({ id: a.id, treinamentoParticipantesId: a.treinamentoParticipantesId, tipo: a.tipo, assinadoEm: a.assinadoEm ?? undefined, hash: a.hash ?? undefined }));
    return detalhe;
  },
};
