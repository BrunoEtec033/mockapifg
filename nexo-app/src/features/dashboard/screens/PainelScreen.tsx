import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSessao } from '@features/auth';
import { useTreinamentos } from '@features/treinamentos/hooks/useTreinamentos';
import { useCertificados } from '@features/certificados/hooks/useCertificados';
import { ChipStatus, EstadoCarregando, EstadoErro, TelaBase } from '@shared/components';
import { cores, elevacao, espaco, raio, semantica, tipografia } from '@shared/theme';
import { formatarData } from '@shared/utils';
import { useResumoPainel } from '../hooks/useResumoPainel';

export function PainelScreen() {
  const { usuario } = useSessao();
  const nav = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const painel = useResumoPainel();
  const treinos = useTreinamentos();
  const certs = useCertificados();
  if (painel.carregando) return <EstadoCarregando mensagem="Montando seu painel..." />;
  if (painel.erro) return <EstadoErro erro={painel.erro} aoTentarNovamente={painel.recarregar} />;
  const resumo = painel.resumo;
  const proximos = treinos.treinamentos.filter(t => t.status === 'pendente' || t.status === 'em_andamento').slice(0, 3);
  const alertas = certs.proximosDoVencimento;
  const cards = [
    { rotulo:'Treinamentos', valor:resumo?.treinamentos??0, icone:'book-open-page-variant-outline', fundo:cores.sinalSuave, cor:cores.sinal, destino:'Treinamentos' },
    { rotulo:'Certificados', valor:resumo?.certificados??0, icone:'medal-outline', fundo:cores.ancoradoSuave, cor:cores.ancorado, destino:'Certificados' },
    { rotulo:'Funcionários', valor:resumo?.funcionarios??0, icone:'account-group-outline', fundo:cores.violetaSuave, cor:cores.violeta, destino:'Funcionarios' },
    { rotulo:'Instrutores', valor:resumo?.instrutores??0, icone:'school-outline', fundo:cores.atencaoSuave, cor:cores.atencao, destino:'Mais' },
  ];
  return <View style={e.tela}>
    <View style={[e.hero,{paddingTop:insets.top+espaco.md}]}> 
      <View style={e.heroTop}>
        <Text style={e.tituloHero}>PAINEL</Text>
        <TouchableOpacity onPress={()=>nav.navigate('Mais',{screen:'MeuPerfil'})} style={e.perfilBotao}>
          <Icon source="account-outline" size={22} color="#FFF"/>
        </TouchableOpacity>
      </View>
      <Searchbar placeholder="Buscar treinamentos..." value="" onChangeText={()=>{}} onPressIn={()=>nav.navigate('Treinamentos')} style={e.busca} inputStyle={e.buscaInput} iconColor="#FFF" placeholderTextColor="rgba(255,255,255,.6)"/>
    </View>
    <TelaBase rolavel estilo={e.conteudo} aoAtualizar={painel.recarregar} atualizando={painel.atualizando}>
      <View style={e.grade}>{cards.map(c=><TouchableOpacity key={c.rotulo} style={e.stat} onPress={()=>nav.navigate(c.destino)}><View style={[e.statIcon,{backgroundColor:c.fundo}]}><Icon source={c.icone} size={20} color={c.cor}/></View><Text style={e.statN}>{c.valor}</Text><Text style={e.statL}>{c.rotulo.toUpperCase()}</Text></TouchableOpacity>)}</View>
      {alertas.length>0&&<TouchableOpacity style={e.alerta} onPress={()=>nav.navigate('Certificados')}><Icon source="alert-outline" size={22} color={cores.atencao}/><View style={{flex:1}}><Text style={e.alertaT}>CERTIFICADOS PRÓXIMOS DO VENCIMENTO</Text><Text style={e.alertaM}>{alertas.length} certificado(s) vencem em até 60 dias.</Text></View><Icon source="chevron-right" size={18} color={cores.atencao}/></TouchableOpacity>}
      <View style={e.secaoCab}><Text style={e.secao}>PRÓXIMOS TREINAMENTOS</Text><TouchableOpacity onPress={()=>nav.navigate('Treinamentos')}><Text style={e.link}>VER TODOS</Text></TouchableOpacity></View>
      {proximos.length===0?<Text style={e.vazio}>Nenhum treinamento pendente ou em andamento.</Text>:proximos.map(t=><TouchableOpacity key={t.id} style={e.treino} onPress={()=>nav.navigate('Treinamentos',{screen:'TreinamentoDetalhe',params:{id:t.id}})}><View style={e.calendar}><Icon source="calendar-blank-outline" size={20} color={cores.sinal}/></View><View style={{flex:1}}><Text style={e.treinoT} numberOfLines={2}>{t.titulo}</Text><Text style={e.treinoM}>{formatarData(t.dataInicio)} · {t.cargaHoraria}h</Text></View><ChipStatus rotulo={t.status==='em_andamento'?'Em andamento':'Pendente'} tom={t.status==='em_andamento'?'sinal':'aviso'}/></TouchableOpacity>)}
    </TelaBase>
  </View>;
}
const e=StyleSheet.create({
  tela:{flex:1,backgroundColor:semantica.fundo},
  hero:{backgroundColor:cores.grafite900,paddingHorizontal:espaco.md,paddingBottom:26},
  heroTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:espaco.md},
  tituloHero:{...tipografia.titulo,fontSize:22,color:'#FFF',letterSpacing:2},
  perfilBotao:{width:40,height:40,borderWidth:2,borderColor:'#FFF',alignItems:'center',justifyContent:'center'},
  busca:{backgroundColor:'transparent',borderWidth:2,borderColor:'#FFF',borderRadius:raio.medio,height:44},
  buscaInput:{color:'#FFF',minHeight:44},
  conteudo:{backgroundColor:semantica.fundo,paddingTop:espaco.lg,gap:espaco.sm},
  grade:{flexDirection:'row',flexWrap:'wrap',gap:espaco.sm},
  stat:{flexBasis:'47%',flexGrow:1,backgroundColor:semantica.fundoElevado,borderRadius:raio.grande,borderWidth:2,borderColor:semantica.borda,padding:espaco.md,...elevacao.cartao},
  statIcon:{width:38,height:38,borderRadius:raio.medio,alignItems:'center',justifyContent:'center',marginBottom:espaco.sm},
  statN:{...tipografia.display,fontSize:26,color:semantica.texto},
  statL:{...tipografia.etiqueta,color:semantica.textoSecundario},
  alerta:{marginTop:espaco.xs,backgroundColor:cores.atencaoSuave,borderWidth:2,borderColor:cores.atencao,borderRadius:raio.grande,padding:espaco.md,flexDirection:'row',alignItems:'center',gap:espaco.sm},
  alertaT:{...tipografia.etiqueta,color:'#92400E'},
  alertaM:{...tipografia.apoio,fontSize:11,color:'#A16207'},
  secaoCab:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:espaco.sm},
  secao:{...tipografia.subtitulo,fontSize:14,color:semantica.texto,letterSpacing:1},
  link:{...tipografia.etiqueta,color:semantica.primario},
  vazio:{...tipografia.apoio,color:semantica.textoSecundario},
  treino:{backgroundColor:semantica.fundoElevado,borderRadius:raio.grande,borderWidth:2,borderColor:semantica.borda,padding:espaco.sm,flexDirection:'row',alignItems:'center',gap:espaco.sm,...elevacao.cartao},
  calendar:{width:40,height:40,borderRadius:raio.medio,backgroundColor:cores.sinalSuave,alignItems:'center',justifyContent:'center'},
  treinoT:{...tipografia.subtitulo,fontSize:13,color:semantica.texto},
  treinoM:{...tipografia.apoio,fontSize:11,color:semantica.textoSecundario,marginTop:2},
});