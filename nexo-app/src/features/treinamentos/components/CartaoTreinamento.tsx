import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { ChipStatus } from '@shared/components';
import { elevacao, espaco, raio, semantica, tipografia } from '@shared/theme';
import { formatarData } from '@shared/utils';
import { APRESENTACAO_STATUS } from '../services/treinamentos.mapper';
import { Treinamento } from '../types';

type Props = { treinamento: Treinamento; aoAbrir: (id: number) => void };
export function CartaoTreinamento({ treinamento, aoAbrir }: Props) {
  const apresentacao = APRESENTACAO_STATUS[treinamento.status];
  return <Pressable onPress={()=>aoAbrir(treinamento.id)} style={({pressed})=>[e.card,pressed&&{opacity:.82}]}>
    <View style={e.top}><Text style={e.titulo} numberOfLines={2}>{treinamento.titulo}</Text><ChipStatus rotulo={apresentacao.rotulo} tom={apresentacao.tom}/></View>
    {!!treinamento.descricao&&<Text style={e.desc} numberOfLines={2}>{treinamento.descricao}</Text>}
    <View style={e.metaRow}><View style={e.metaItem}><Icon source="calendar-blank-outline" size={14} color="#64748B"/><Text style={e.meta}>{formatarData(treinamento.dataInicio)}</Text></View><View style={e.metaItem}><Icon source="clock-outline" size={14} color="#64748B"/><Text style={e.meta}>{treinamento.cargaHoraria}h</Text></View></View>
  </Pressable>;
}
const e=StyleSheet.create({card:{backgroundColor:semantica.fundoElevado,borderRadius:raio.grande,borderWidth:1,borderColor:semantica.borda,padding:espaco.md,...elevacao.cartao},top:{flexDirection:'row',alignItems:'flex-start',gap:espaco.sm},titulo:{...tipografia.subtitulo,fontSize:14,color:semantica.texto,flex:1},desc:{...tipografia.apoio,fontSize:12,color:semantica.textoSecundario,marginTop:espaco.xs},metaRow:{flexDirection:'row',gap:espaco.md,marginTop:espaco.sm},metaItem:{flexDirection:'row',alignItems:'center',gap:4},meta:{...tipografia.apoio,fontSize:11,color:semantica.textoSecundario}});
