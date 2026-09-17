import Constants from 'expo-constants';

declare const process: { env: Record<string, string | undefined> };

type Ambiente = 'mock' | 'homolog' | 'producao';

const extra = (Constants.expoConfig?.extra ?? {}) as Record<string, unknown>;

function ler(chaveEnv: string, chaveExtra: string, padrao: string): string {
  return process.env[chaveEnv] ?? (extra[chaveExtra] as string | undefined) ?? padrao;
}

/**
 * Único ponto do app que sabe ONDE a API está.
 * Trocar Mock API -> API real altera apenas este arquivo (ou o .env).
 */
export const env = {
  apiBaseUrl: ler('EXPO_PUBLIC_API_BASE_URL', 'apiBaseUrl', 'http://localhost:3000'),
  apiTimeoutMs: Number(ler('EXPO_PUBLIC_API_TIMEOUT_MS', 'apiTimeoutMs', '15000')),
  ambiente: ler('EXPO_PUBLIC_AMBIENTE', 'ambiente', 'mock') as Ambiente,
} as const;

export const ehMock = env.ambiente === 'mock';
