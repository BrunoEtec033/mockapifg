import { ReactNode } from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { temaLinha } from '@shared/theme';

export function TemaProvider({ children }: { children: ReactNode }) {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={temaLinha}>{children}</PaperProvider>
    </SafeAreaProvider>
  );
}
