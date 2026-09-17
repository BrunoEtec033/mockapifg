import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { cores, fontes, semantica } from '@shared/theme';

/** Aparência padrão dos cabeçalhos — definida uma vez, usada por todos os stacks. */
export const opcoesCabecalho: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: semantica.fundo },
  headerShadowVisible: false,
  headerTintColor: cores.grafite900,
  headerTitleStyle: { fontFamily: fontes.displayBold, fontSize: 17 },
  headerBackTitleVisible: false,
  contentStyle: { backgroundColor: semantica.fundo },
};
