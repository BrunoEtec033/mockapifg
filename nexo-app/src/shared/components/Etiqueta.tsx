import { StyleSheet, Text, TextStyle } from 'react-native';
import { semantica, tipografia } from '@shared/theme';

/** Eyebrow de seção. Só use quando nomeia uma seção real da tela. */
export function Etiqueta({ children, estilo }: { children: string; estilo?: TextStyle }) {
  return <Text style={[estilos.texto, estilo]}>{children.toUpperCase()}</Text>;
}

const estilos = StyleSheet.create({
  texto: { ...tipografia.etiqueta, color: semantica.textoSecundario },
});
