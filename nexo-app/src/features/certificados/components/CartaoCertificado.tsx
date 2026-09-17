import { Pressable,StyleSheet,Text,View } from 'react-native';
import { Icon } from 'react-native-paper';
import { ChipStatus } from '@shared/components';
import { cores,elevacao,espaco,raio,semantica,tipografia } from '@shared/theme';
import { formatarData } from '@shared/utils';
import { APRESENTACAO_STATUS_CERTIFICADO } from '../services/certificados.mapper';
import type { Certificado } from '../types';
export function CartaoCertificado({certificado,aoAbrir}:{certificado:Certificado;aoAbrir:(id:number)=>void}){const ap=APRESENTACAO_STATUS_CERTIFICADO[certificado.status];return <Pressable onPress={()=>aoAbrir(certificado.id)} style={({pressed})=>[e.card,pressed&&{opacity:.82}]}><View style={e.medal}><Icon source="medal-outline" size={22} color={cores.atencao}/></View><View style={{flex:1}}><View style={e.top}><Text style={e.num}>{certificado.numero}</Text><ChipStatus rotulo={ap.rotulo} tom={ap.tom}/></View><Text style={e.meta}>Emitido em {formatarData(certificado.dataEmissao)}</Text><Text style={e.meta}>Validade: {formatarData(certificado.dataValidade)}</Text></View></Pressable>}
const e=StyleSheet.create({card:{backgroundColor:semantica.fundoElevado,borderRadius:raio.grande,borderWidth:1,borderColor:semantica.borda,padding:espaco.md,flexDirection:'row',alignItems:'center',gap:espaco.sm,...elevacao.cartao},medal:{width:42,height:42,borderRadius:raio.medio,backgroundColor:cores.atencaoSuave,alignItems:'center',justifyContent:'center'},top:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:espaco.xs},num:{...tipografia.codigo,fontSize:13,color:semantica.texto,flex:1},meta:{...tipografia.apoio,fontSize:11,color:semantica.textoSecundario,marginTop:2}});
