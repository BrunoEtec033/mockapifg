import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { z, ZodTypeAny } from 'zod';
import { env } from '@core/config';
import { AppError, mapHttpError } from '@core/errors';
import { sessionStorage } from '@core/storage';
import { envelopeSucesso } from './envelope';

type Ouvinte = () => void;
const ouvintesSessaoExpirada = new Set<Ouvinte>();

/** O AuthProvider se inscreve aqui para derrubar a sessão em 401. */
export function aoExpirarSessao(ouvinte: Ouvinte): () => void {
  ouvintesSessaoExpirada.add(ouvinte);
  return () => ouvintesSessaoExpirada.delete(ouvinte);
}

const instancia: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeoutMs,
  headers: { 'Content-Type': 'application/json' },
});

// Requisição: injeta credenciais. Nenhuma feature monta header de auth.
instancia.interceptors.request.use(async (config) => {
  const sessao = await sessionStorage.carregar();
  if (sessao?.token) {
    config.headers.set('Authorization', `Bearer ${sessao.token}`);
    // A Mock API exige x-permissoes em rotas restritas (simularPermissoes: true).
    if (sessao.permissoes.length > 0) {
      config.headers.set('x-permissoes', sessao.permissoes.join(','));
    }
  }
  return config;
});

// Resposta: 401 derruba a sessão uma única vez, de forma centralizada.
instancia.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    const appError = mapHttpError(erro);
    if (appError.exigeNovoLogin) {
      ouvintesSessaoExpirada.forEach((ouvinte) => ouvinte());
    }
    return Promise.reject(appError);
  },
);

/**
 * Executa a chamada, desembrulha o envelope e valida o contrato com Zod.
 * A API não está finalizada: validar em runtime transforma "undefined is not
 * an object" numa falha nomeada (CONTRATO_INVALIDO) com o caminho do campo.
 */
async function requisitar<S extends ZodTypeAny>(
  config: AxiosRequestConfig,
  schema: S,
): Promise<z.output<S>> {
  try {
    const resposta = await instancia.request(config);
    const { data } = envelopeSucesso.parse(resposta.data);
    return schema.parse(data);
  } catch (erro) {
    throw mapHttpError(erro);
  }
}

export const httpClient = {
  get: <S extends ZodTypeAny>(url: string, schema: S, params?: Record<string, unknown>) =>
    requisitar({ method: 'GET', url, params }, schema),

  post: <S extends ZodTypeAny>(url: string, schema: S, corpo?: unknown) =>
    requisitar({ method: 'POST', url, data: corpo }, schema),

  put: <S extends ZodTypeAny>(url: string, schema: S, corpo?: unknown) =>
    requisitar({ method: 'PUT', url, data: corpo }, schema),

  patch: <S extends ZodTypeAny>(url: string, schema: S, corpo?: unknown) =>
    requisitar({ method: 'PATCH', url, data: corpo }, schema),

  delete: <S extends ZodTypeAny>(url: string, schema: S) =>
    requisitar({ method: 'DELETE', url }, schema),
};

export type { AppError };
