import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSessao } from '@features/auth';
import { EstadoCarregando } from '@shared/components';
import { cores, semantica } from '@shared/theme';
import { AbasNavigator } from './AbasNavigator';
import { AuthNavigator } from './AuthNavigator';
import type { RotasRaiz } from './tipos';

const Stack = createNativeStackNavigator<RotasRaiz>();

const temaNavegacao = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: semantica.fundo,
    card: semantica.fundoElevado,
    text: semantica.texto,
    border: semantica.borda,
    primary: cores.sinal,
  },
};

/**
 * Fluxo condicional: o app NÃO navega manualmente para o login.
 * Ao perder a sessão, a árvore troca sozinha — impossível ficar numa tela
 * autenticada sem token.
 */
export function RootNavigator() {
  const { estado } = useSessao();

  if (estado === 'verificando') {
    return <EstadoCarregando mensagem="Verificando sua sessão..." />;
  }

  return (
    <NavigationContainer theme={temaNavegacao}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {estado === 'autenticado' ? (
          <Stack.Screen name="Aplicacao" component={AbasNavigator} />
        ) : (
          <Stack.Screen name="Autenticacao" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
