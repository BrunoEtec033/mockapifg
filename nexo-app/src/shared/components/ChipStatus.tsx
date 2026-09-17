import { StyleSheet, Text, View } from 'react-native';
import { cores, espaco, raio, tipografia } from '@shared/theme';

export type TomStatus = 'neutro' | 'sucesso' | 'aviso' | 'perigo' | 'sinal';

const paleta: Record<TomStatus, { fundo: string; texto: string }> = {
  neutro: { fundo: cores.neve100, texto: cores.aco500 },
  sucesso: { fundo: cores.ancoradoSuave, texto: cores.ancorado },
  aviso: { fundo: cores.atencaoSuave, texto: cores.atencao },
  perigo: { fundo: cores.riscoSuave, texto: cores.risco },
  sinal: { fundo: cores.sinalSuave, texto: cores.sinal },
};

export function ChipStatus({ rotulo, tom = 'neutro' }: { rotulo: string; tom?: TomStatus }) {
  const cor = paleta[tom];
  return (
    <View style={[estilos.base, { backgroundColor: cor.fundo, borderColor: cor.texto }]}>
      <Text style={[estilos.texto, { color: cor.texto }]}>{rotulo.toUpperCase()}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: espaco.xs,
    paddingVertical: espaco.xxs,
    borderRadius: raio.pequeno,
    borderWidth: 1.5,
  },
  texto: { ...tipografia.etiqueta },
});