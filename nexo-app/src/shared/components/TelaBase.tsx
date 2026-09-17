import { ReactNode } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cores, espaco, semantica } from '@shared/theme';

type Props = {
  children: ReactNode;
  rolavel?: boolean;
  semPaddingLateral?: boolean;
  estilo?: ViewStyle;
  /** Habilita pull-to-refresh quando informado (só com rolavel). */
  aoAtualizar?: () => void;
  atualizando?: boolean;
};

/** Moldura padrão: fundo, safe area, respiro lateral e pull-to-refresh. */
export function TelaBase({
  children,
  rolavel = false,
  semPaddingLateral = false,
  estilo,
  aoAtualizar,
  atualizando = false,
}: Props) {
  const insets = useSafeAreaInsets();
  const base: ViewStyle = {
    paddingTop: insets.top + espaco.sm,
    paddingHorizontal: semPaddingLateral ? 0 : espaco.md,
  };

  if (rolavel) {
    return (
      <ScrollView
        style={estilos.fundo}
        contentContainerStyle={[base, estilos.rodape, estilo]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          aoAtualizar ? (
            <RefreshControl
              refreshing={atualizando}
              onRefresh={aoAtualizar}
              tintColor={cores.sinalEscuro}
            />
          ) : undefined
        }
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={[estilos.fundo, base, estilo]}>{children}</View>;
}

const estilos = StyleSheet.create({
  fundo: { flex: 1, backgroundColor: semantica.fundo },
  rodape: { paddingBottom: espaco.xxl },
});
