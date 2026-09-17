import { z } from 'zod';
import { endpoints, httpClient } from '@core/api';
import type { ContextoFuncionario, Funcionario, FuncionarioInput } from '../types';

const funcionarioDto = z.object({ id: z.number(), nome: z.string(), matricula: z.string(), cargo: z.string().nullish(), setor: z.string().nullish() });
const participanteDto = z.object({ id: z.number(), treinamentoId: z.number(), funcionarioId: z.number(), status: z.string().nullish(), inscritoEm: z.string().nullish() });
const treinamentoDto = z.object({ id: z.number(), titulo: z.string(), cargaHoraria: z.number().nullish(), dataInicio: z.string().nullish(), status: z.string().nullish() });
const certificadoDto = z.object({ id: z.number(), treinamentoParticipantesId: z.number(), numero: z.string(), dataValidade: z.string().nullish(), status: z.string().nullish() });

const mapFuncionario = (x: z.infer<typeof funcionarioDto>): Funcionario => ({ id: x.id, nome: x.nome, matricula: x.matricula, cargo: x.cargo ?? undefined, setor: x.setor ?? undefined });

export const funcionariosService = {
  async listar(busca?: string): Promise<Funcionario[]> {
    const itens = await httpClient.get(endpoints.funcionarios.lista, z.array(funcionarioDto), busca ? { q: busca } : { _sort: 'nome', _order: 'asc' });
    return itens.map(mapFuncionario);
  },
  async buscar(id: number): Promise<Funcionario> {
    return mapFuncionario(await httpClient.get(endpoints.funcionarios.porId(id), funcionarioDto));
  },
  async salvar(input: FuncionarioInput, id?: number): Promise<Funcionario> {
    const dto = id
      ? await httpClient.put(endpoints.funcionarios.porId(id), funcionarioDto, input)
      : await httpClient.post(endpoints.funcionarios.lista, funcionarioDto, input);
    return mapFuncionario(dto);
  },
  async excluir(id: number): Promise<void> {
    await httpClient.delete(endpoints.funcionarios.porId(id), z.any());
  },
  async buscarContexto(id: number): Promise<ContextoFuncionario> {
    const [funcionario, participacoesRaw, treinamentosRaw, certificadosRaw] = await Promise.all([
      this.buscar(id),
      httpClient.get(endpoints.participantes.lista, z.array(participanteDto), { funcionarioId: id }),
      httpClient.get(endpoints.treinamentos.lista, z.array(treinamentoDto)),
      httpClient.get(endpoints.certificados.lista, z.array(certificadoDto)),
    ]);
    const participacoes = participacoesRaw.map(p => ({ ...p, status: p.status ?? 'pendente', inscritoEm: p.inscritoEm ?? undefined }));
    const idsPart = new Set(participacoes.map(p => p.id));
    const idsTreino = new Set(participacoes.map(p => p.treinamentoId));
    return {
      funcionario,
      participacoes,
      treinamentos: treinamentosRaw.filter(t => idsTreino.has(t.id)).map(t => ({ id: t.id, titulo: t.titulo, cargaHoraria: t.cargaHoraria ?? undefined, dataInicio: t.dataInicio ?? undefined, status: t.status ?? undefined })),
      certificados: certificadosRaw.filter(c => idsPart.has(c.treinamentoParticipantesId)).map(c => ({ id: c.id, treinamentoParticipantesId: c.treinamentoParticipantesId, numero: c.numero, dataValidade: c.dataValidade ?? undefined, status: c.status ?? undefined })),
    };
  },
};
