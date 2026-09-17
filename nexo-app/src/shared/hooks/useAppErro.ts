import { useMemo } from 'react';
import { AppError, mapHttpError } from '@core/errors';

/** Normaliza o `error` do React Query para AppError antes de chegar à tela. */
export function useAppErro(erro: unknown): AppError | null {
  return useMemo(() => (erro ? mapHttpError(erro) : null), [erro]);
}
