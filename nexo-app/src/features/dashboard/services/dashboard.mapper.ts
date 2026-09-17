import { IndicadorPainel, ResumoPainel } from '../types';
import { ResumoPainelDto } from './dashboard.dto';

export function paraResumoPainel(dto: ResumoPainelDto): ResumoPainel {
  return {
    funcionarios: dto.quantidadeFuncionarios,
    usuarios: dto.quantidadeUsuarios,
    treinamentos: dto.quantidadeTreinamentos,
    instrutores: dto.quantidadeInstrutores,
    certificados: dto.quantidadeCertificados,
  };
}

/** A ordem aqui é a ordem exibida — decisão de produto, não da API. */
export function paraIndicadores(resumo: ResumoPainel): IndicadorPainel[] {
  return [
    { chave: 'treinamentos', rotulo: 'Treinamentos', valor: resumo.treinamentos },
    { chave: 'certificados', rotulo: 'Certificados', valor: resumo.certificados },
    { chave: 'funcionarios', rotulo: 'Funcionários', valor: resumo.funcionarios },
    { chave: 'instrutores', rotulo: 'Instrutores', valor: resumo.instrutores },
  ];
}
