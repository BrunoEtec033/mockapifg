import { StyleSheet, Text, View } from 'react-native';
import { cores, fontes, semantica } from '@shared/theme';
import { iniciais } from '@shared/utils';

export function AvatarNome({ nome, tamanho = 44 }: { nome: string; tamanho?: number }) {
  return (
    <View style={[estilos.base, { width: tamanho, height: tamanho }]}> 
      <Text style={[estilos.texto, { fontSize: Math.max(12, tamanho * 0.32) }]}>{iniciais(nome)}</Text>
    </View>
  );
}
const estilos = StyleSheet.create({
  base: { backgroundColor: cores.sinalSuave, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: cores.grafite900 },
  texto: { fontFamily: fontes.mono, color: semantica.primario },
});