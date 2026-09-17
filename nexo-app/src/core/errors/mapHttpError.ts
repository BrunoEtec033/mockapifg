import { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { AppError } from './AppError';
import { CODIGOS_ERRO, CodigoErro } from './errorCodes';

type EnvelopeErro = { success: false; error?: { code?: string; message?: string } };

function ehCodigoConhecido(valor: unknown): valor is CodigoErro {
  return typeof valor === 'string' && valor in CODIGOS_ERRO;
}

function porStatus(status?: number): CodigoErro {
  switch (status) {
    case 400:
      return CODIGOS_ERRO.VALIDATION_ERROR;
    case 401:
      return CODIGOS_ERRO.UNAUTHORIZED;
    case 403:
      return CODIGOS_ERRO.FORBIDDEN;
    case 404:
      return CODIGOS_ERRO.NOT_FOUND;
    case 409:
      return CODIGOS_ERRO.CONFLICT;
    case 500:
    case 502:
    case 503:
      return CODIGOS_ERRO.INTERNAL_ERROR;
    default:
      return CODIGOS_ERRO.DESCONHECIDO;
  }
}

/** Traduz qualquer falha de infraestrutura para AppError. */
export function mapHttpError(erro: unknown): AppError {
  if (erro instanceof AppError) return erro;

  if (erro instanceof ZodError) {
    const zodErro = erro as ZodError;
    return new AppError(CODIGOS_ERRO.CONTRATO_INVALIDO, zodErro.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(' | '));
  }

  const axiosErro = erro as AxiosError<EnvelopeErro>;
  if (axiosErro?.isAxiosError) {
    if (axiosErro.code === 'ECONNABORTED') {
      return new AppError(CODIGOS_ERRO.TIMEOUT, axiosErro.message);
    }
    if (!axiosErro.response) {
      return new AppError(CODIGOS_ERRO.SEM_CONEXAO, axiosErro.message);
    }
    const corpo = axiosErro.response.data;
    const codigoApi = corpo?.error?.code;
    const codigo = ehCodigoConhecido(codigoApi) ? codigoApi : porStatus(axiosErro.response.status);
    return new AppError(codigo, corpo?.error?.message, axiosErro.response.status);
  }

  return AppError.desconhecido(erro instanceof Error ? erro.message : String(erro));
}
