import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppError } from '@core/errors';

/**
 * Cache de dados do servidor. Não repetimos tentativa em 401/403/404:
 * insistir num erro de contrato ou de permissão só atrasa o feedback.
 */
function criarCliente() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: (tentativa, erro) => {
          if (erro instanceof AppError && !erro.ehRecuperavel) return false;
          return tentativa < 2;
        },
        staleTime: 30_000,
        refetchOnWindowFocus: false,
      },
      mutations: { retry: false },
    },
  });
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [cliente] = useState(criarCliente);
  return <QueryClientProvider client={cliente}>{children}</QueryClientProvider>;
}
