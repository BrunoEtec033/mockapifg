import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { cores, elevacao, espaco, raio, semantica, tipografia } from '@shared/theme';

export function CartaoMenu({
  icone,
  titulo,
  descricao,
  aoPressionar,
  tom = 'azul',
}: {
  icone: string;
  titulo: string;
  descricao: string;
  aoPressionar: () => void;
  tom?: 'azul' | 'verde' | 'violeta' | 'ambar' | 'ciano' | 'cinza';
}) {
  const paleta = {
    azul: [cores.sinalSuave, cores.sinal], verde: [cores.ancoradoSuave, cores.ancorado],
    violeta: [cores.violetaSuave, cores.violeta], ambar: [cores.atencaoSuave, cores.atencao],
    ciano: [cores.cianoSuave, cores.ciano], cinza: [cores.neve100, cores.aco500],
  }[tom];
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={aoPressionar} style={estilos.base}>
      <View style={[estilos.icone, { backgroundColor: paleta[0] }]}><Icon source={icone} size={22} color={paleta[1]} /></View>
      <View style={estilos.textos}><Text style={estilos.titulo}>{titulo}</Text><Text style={estilos.desc}>{descricao}</Text></View>
      <Icon source="chevron-right" size={20} color={cores.grafite900} />
    </TouchableOpacity>
  );
}
const estilos = StyleSheet.create({
  base: { flexDirection: 'row', alignItems: 'center', gap: espaco.sm, backgroundColor: semantica.fundoElevado, borderRadius: raio.grande, borderWidth: 2, borderColor: semantica.borda, padding: espaco.md, ...elevacao.cartao },
  icone: { width: 44, height: 44, borderRadius: raio.medio, alignItems: 'center', justifyContent: 'center' },
  textos: { flex: 1 },
  titulo: { ...tipografia.subtitulo, fontSize: 14, color: semantica.texto },
  desc: { ...tipografia.apoio, fontSize: 12, color: semantica.textoSecundario, marginTop: 2 },
});