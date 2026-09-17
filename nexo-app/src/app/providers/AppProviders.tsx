import { ReactNode } from 'react';
import { AuthProvider } from '@features/auth';
import { QueryProvider } from './QueryProvider';
import { TemaProvider } from './TemaProvider';

/**
 * Composição da aplicação. A ordem importa:
 * tema (visual) -> cache (dados) -> sessão (usa o cache e o cliente HTTP).
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <TemaProvider>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </TemaProvider>
  );
}
