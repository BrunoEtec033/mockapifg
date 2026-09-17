import { MD3LightTheme, configureFonts } from 'react-native-paper';
import { cores, fontes, semantica } from './tokens';

const configFontes = configureFonts({
  config: {
    displayLarge: { fontFamily: fontes.displayExtra, fontWeight: '800' as const, fontSize: 34, lineHeight: 40, letterSpacing: -1 },
    headlineSmall: { fontFamily: fontes.displayBold, fontWeight: '700' as const, fontSize: 21, lineHeight: 27, letterSpacing: -0.3 },
    titleMedium: { fontFamily: fontes.corpoSemi, fontWeight: '600' as const, fontSize: 16, lineHeight: 22, letterSpacing: 0 },
    bodyMedium: { fontFamily: fontes.corpo, fontWeight: '400' as const, fontSize: 15, lineHeight: 22, letterSpacing: 0 },
    labelLarge: { fontFamily: fontes.corpoSemi, fontWeight: '600' as const, fontSize: 14, lineHeight: 18, letterSpacing: 0.2 },
    labelSmall: { fontFamily: fontes.corpoSemi, fontWeight: '600' as const, fontSize: 11, lineHeight: 14, letterSpacing: 0.7 },
  },
});

export const temaLinha = {
  ...MD3LightTheme,
  roundness: 0,
  fonts: configFontes,
  colors: {
    ...MD3LightTheme.colors,
    primary: cores.sinal,
    onPrimary: cores.branco,
    primaryContainer: cores.sinalSuave,
    onPrimaryContainer: cores.sinalEscuro,
    secondary: cores.ciano,
    secondaryContainer: cores.cianoSuave,
    tertiary: cores.ancorado,
    background: semantica.fundo,
    surface: semantica.fundoElevado,
    surfaceVariant: cores.neve100,
    onSurface: semantica.texto,
    onSurfaceVariant: semantica.textoSecundario,
    outline: semantica.borda,
    outlineVariant: semantica.borda,
    error: cores.risco,
    errorContainer: cores.riscoSuave,
  },
};

export type TemaLinha = typeof temaLinha;
