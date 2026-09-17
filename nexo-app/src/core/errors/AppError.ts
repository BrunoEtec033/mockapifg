import { CODIGOS_ERRO, CodigoErro, MENSAGENS_ERRO } from './errorCodes';

/**
 * Erro único que circula do core até a tela.
 * Nenhuma camada acima do core enxerga AxiosError ou status HTTP.
 */
export class AppError extends Error {
  readonly codigo: CodigoErro;
  readonly statusHttp?: number;
  readonly detalhe?: string;

  constructor(codigo: CodigoErro, detalhe?: string, statusHttp?: number) {
    super(MENSAGENS_ERRO[codigo]);
    this.name = 'AppError';
    this.codigo = codigo;
    this.detalhe = detalhe;
    this.statusHttp = statusHttp;
  }

  static desconhecido(detalhe?: string): AppError {
    return new AppError(CODIGOS_ERRO.DESCONHECIDO, detalhe);
  }

  get exigeNovoLogin(): boolean {
    return this.codigo === CODIGOS_ERRO.UNAUTHORIZED;
  }

  get ehRecuperavel(): boolean {
    return (
      this.codigo === CODIGOS_ERRO.SEM_CONEXAO ||
      this.codigo === CODIGOS_ERRO.TIMEOUT ||
      this.codigo === CODIGOS_ERRO.INTERNAL_ERROR
    );
  }
}

export function ehAppError(erro: unknown): erro is AppError {
  return erro instanceof AppError;
}
