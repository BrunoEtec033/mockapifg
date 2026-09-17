import { ReactElement } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { AppError } from '@core/errors';
import { cores, espaco, semantica, tipografia } from '@shared/theme';

type PropsCarregando = { mensagem?: string };

export function EstadoCarregando({ mensagem = 'Buscando dados...' }: PropsCarregando) {
  return (
    <View style={estilos.centro}>
      <ActivityIndicator color={cores.sinalEscuro} />
      <Text style={estilos.apoio}>{mensagem}</Text>
    </View>
  );
}

type PropsErro = { erro: AppError; aoTentarNovamente?: () => void };

/** Erro sempre diz o que houve e o que fazer — nunca só "algo deu errado". */
export function EstadoErro({ erro, aoTentarNovamente }: PropsErro) {
  return (
    <View style={estilos.centro}>
      <Text style={estilos.titulo}>{erro.message}</Text>
      {!!erro.detalhe && <Text style={estilos.apoio}>{erro.detalhe}</Text>}
      {erro.ehRecuperavel && aoTentarNovamente && (
        <Button mode="contained-tonal" onPress={aoTentarNovamente} style={estilos.acao}>
          Tentar de novo
        </Button>
      )}
    </View>
  );
}

type PropsVazio = { titulo: string; descricao?: string; acao?: ReactElement };

export function EstadoVazio({ titulo, descricao, acao }: PropsVazio) {
  return (
    <View style={estilos.centro}>
      <Text style={estilos.titulo}>{titulo}</Text>
      {!!descricao && <Text style={estilos.apoio}>{descricao}</Text>}
      {acao}
    </View>
  );
}

/** Usado quando a flag do contrato está desligada (endpoint ainda não existe). */
export function EstadoIndisponivel({ recurso }: { recurso: string }) {
  return (
    <View style={estilos.centro}>
      <Text style={estilos.titulo}>{recurso} ainda não está disponível</Text>
      <Text style={estilos.apoio}>
        O contrato desta funcionalidade não foi publicado pela API. A tela entra em produção assim
        que o endpoint existir — nada precisa mudar aqui.
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: espaco.lg,
    gap: espaco.xs,
  },
  titulo: { ...tipografia.subtitulo, color: semantica.texto, textAlign: 'center' },
  apoio: { ...tipografia.apoio, color: semantica.textoSecundario, textAlign: 'center' },
  acao: { marginTop: espaco.sm },
});
