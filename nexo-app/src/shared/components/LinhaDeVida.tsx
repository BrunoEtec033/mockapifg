import { StyleSheet, Text, View } from 'react-native';
import { cores, espaco, semantica, tipografia } from '@shared/theme';

export type PontoAncoragem = {
  rotulo: string;
  detalhe?: string;
  /** Ponto já cumprido pelo participante. */
  ancorado: boolean;
};

/**
 * Elemento-assinatura da LINHA.
 *
 * Trilho vertical com pontos de ancoragem: cada ponto é um registro real do
 * domínio (inscrição, presença assinada, evidência, certificado). Ponto vazado
 * = etapa pendente; ponto preenchido em amarelo sinal = etapa cumprida.
 */
export function LinhaDeVida({ pontos }: { pontos: PontoAncoragem[] }) {
  return (
    <View>
      {pontos.map((ponto, indice) => {
        const ultimo = indice === pontos.length - 1;
        return (
          <View key={ponto.rotulo} style={estilos.linha}>
            <View style={estilos.colunaTrilho}>
              <View style={[estilos.ponto, ponto.ancorado ? estilos.pontoAncorado : estilos.pontoPendente]} />
              {!ultimo && (
                <View style={[estilos.cabo, ponto.ancorado ? estilos.caboAncorado : undefined]} />
              )}
            </View>
            <View style={[estilos.conteudo, ultimo ? estilos.conteudoUltimo : undefined]}>
              <Text style={[estilos.rotulo, !ponto.ancorado && estilos.rotuloPendente]}>{ponto.rotulo}</Text>
              {!!ponto.detalhe && <Text style={estilos.detalhe}>{ponto.detalhe}</Text>}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const TAMANHO_PONTO = 14;

const estilos = StyleSheet.create({
  linha: { flexDirection: 'row' },
  colunaTrilho: { width: 28, alignItems: 'center' },
  ponto: {
    width: TAMANHO_PONTO,
    height: TAMANHO_PONTO,
    borderRadius: TAMANHO_PONTO / 2,
    borderWidth: 2,
    marginTop: 3,
  },
  pontoAncorado: { backgroundColor: cores.sinal, borderColor: cores.sinalEscuro },
  pontoPendente: { backgroundColor: 'transparent', borderColor: semantica.trilho },
  cabo: { flex: 1, width: 2, backgroundColor: semantica.trilho, marginVertical: 2 },
  caboAncorado: { backgroundColor: cores.sinal },
  conteudo: { flex: 1, paddingBottom: espaco.lg, paddingLeft: espaco.xs },
  conteudoUltimo: { paddingBottom: 0 },
  rotulo: { ...tipografia.subtitulo, color: semantica.texto },
  rotuloPendente: { color: semantica.textoSecundario },
  detalhe: { ...tipografia.apoio, color: semantica.textoSecundario, marginTop: 2 },
});
