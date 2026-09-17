/**
 * Design System v3 — reformulação brutalista/técnica.
 * Zero arredondamento, zero sombra, tipografia mono. Mantém os nomes
 * legados para não quebrar componentes existentes.
 */
export const cores = {
  grafite900: '#0F172A',
  grafite800: '#1E293B',
  grafite700: '#334155',
  aco500: '#64748B',
  cabo300: '#94A3B8',
  neve100: '#F1F5F9',
  neve050: '#F8FAFC',
  branco: '#FFFFFF',

  sinal: '#0F766E',
  sinalEscuro: '#115E59',
  sinalSuave: '#CCFBF1',

  ancorado: '#059669',
  ancoradoSuave: '#D1FAE5',
  atencao: '#D97706',
  atencaoSuave: '#FEF3C7',
  risco: '#DC2626',
  riscoSuave: '#FEE2E2',
  violeta: '#7C3AED',
  violetaSuave: '#EDE9FE',
  ciano: '#0891B2',
  cianoSuave: '#CFFAFE',
} as const;

export const semantica = {
  fundo: '#F0FDFA',
  fundoElevado: cores.branco,
  fundoInverso: cores.grafite900,
  texto: cores.grafite900,
  textoSecundario: cores.aco500,
  textoInverso: cores.branco,
  borda: cores.grafite900,
  trilho: cores.cabo300,
  ancoragem: cores.sinal,
  sucesso: cores.ancorado,
  perigo: cores.risco,
  aviso: cores.atencao,
  primario: cores.sinal,
} as const;

export const espaco = { xxs: 4, xs: 8, sm: 12, md: 16, lg: 24, xl: 32, xxl: 48 } as const;
export const raio = { nenhum: 0, pequeno: 0, medio: 0, grande: 0, extra: 0, pilula: 0 } as const;

export const fontes = {
  displayBold: 'Archivo_700Bold',
  displayExtra: 'Archivo_800ExtraBold',
  corpo: 'IBMPlexSans_400Regular',
  corpoMedio: 'IBMPlexSans_500Medium',
  corpoSemi: 'IBMPlexSans_600SemiBold',
  mono: 'IBMPlexMono_500Medium',
} as const;

export const tipografia = {
  display: { fontFamily: fontes.mono, fontSize: 28, lineHeight: 34, letterSpacing: -0.5 },
  titulo: { fontFamily: fontes.mono, fontSize: 20, lineHeight: 26, letterSpacing: 0 },
  subtitulo: { fontFamily: fontes.mono, fontSize: 14, lineHeight: 20 },
  corpo: { fontFamily: fontes.corpo, fontSize: 15, lineHeight: 22 },
  apoio: { fontFamily: fontes.corpo, fontSize: 13, lineHeight: 18 },
  etiqueta: { fontFamily: fontes.mono, fontSize: 11, lineHeight: 14, letterSpacing: 1 },
  codigo: { fontFamily: fontes.mono, fontSize: 13, lineHeight: 18, letterSpacing: 0.2 },
} as const;

export const elevacao = {
  cartao: {
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
} as const;