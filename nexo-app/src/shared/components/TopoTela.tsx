import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { espaco, semantica, tipografia } from '@shared/theme';

export function TopoTela({
  titulo,
  subtitulo,
  aoVoltar,
  acao,
}: {
  titulo: string;
  subtitulo?: string;
  aoVoltar?: () => void;
  acao?: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[estilos.base, { paddingTop: insets.top + espaco.sm }]}> 
      <View style={estilos.linha}>
        {!!aoVoltar && <IconButton icon="chevron-left" size={24} onPress={aoVoltar} style={estilos.voltar} />}
        <View style={estilos.textos}>
          <Text style={estilos.titulo} numberOfLines={2}>{titulo}</Text>
          {!!subtitulo && <Text style={estilos.subtitulo}>{subtitulo}</Text>}
        </View>
        {!!acao && <View style={estilos.acao}>{acao}</View>}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  base: { backgroundColor: semantica.fundoElevado, borderBottomWidth: 1, borderBottomColor: semantica.borda, paddingHorizontal: espaco.md, paddingBottom: espaco.sm },
  linha: { minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: espaco.xs },
  voltar: { margin: -6 },
  textos: { flex: 1 },
  titulo: { ...tipografia.titulo, color: semantica.texto },
  subtitulo: { ...tipografia.apoio, color: semantica.textoSecundario, marginTop: 2 },
  acao: { marginLeft: espaco.xs },
});
