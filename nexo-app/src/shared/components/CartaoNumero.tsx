import { StyleSheet, Text, View } from 'react-native';
import { elevacao, espaco, raio, semantica, tipografia } from '@shared/theme';

/** Indicador do dashboard: número grande, rótulo pequeno. */
export function CartaoNumero({ valor, rotulo }: { valor: number | string; rotulo: string }) {
  return (
    <View style={estilos.cartao}>
      <Text style={estilos.valor}>{valor}</Text>
      <Text style={estilos.rotulo}>{rotulo.toUpperCase()}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    flexGrow: 1,
    flexBasis: '47%',
    backgroundColor: semantica.fundoElevado,
    borderRadius: raio.medio,
    borderWidth: 2,
    borderColor: semantica.borda,
    padding: espaco.md,
    ...elevacao.cartao,
  },
  valor: { ...tipografia.display, color: semantica.texto },
  rotulo: { ...tipografia.etiqueta, color: semantica.textoSecundario, marginTop: espaco.xxs },
});