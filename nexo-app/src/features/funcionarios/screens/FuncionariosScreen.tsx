import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FAB, IconButton, Searchbar, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AvatarNome, EstadoCarregando, EstadoErro, EstadoVazio, TopoTela } from '@shared/components';
import { elevacao, espaco, raio, semantica, tipografia } from '@shared/theme';
import { useFuncionarios } from '../hooks/useFuncionarios';

export function FuncionariosScreen() {
  const nav=useNavigation<any>(); const {funcionarios,busca,setBusca,carregando,atualizando,erro,recarregar,excluir}=useFuncionarios();
  const [mensagem,setMensagem]=useState('');
  const remover=async(id:number)=>{await excluir(id); setMensagem('Funcionário excluído.');};
  return <View style={estilos.tela}>
    <TopoTela titulo="Funcionários" subtitulo={`${funcionarios.length} registros`} />
    <View style={estilos.filtros}><Searchbar placeholder="Nome, matrícula, cargo ou setor..." value={busca} onChangeText={setBusca} style={estilos.busca} /></View>
    {carregando ? <EstadoCarregando mensagem="Carregando funcionários..."/> : erro ? <EstadoErro erro={erro} aoTentarNovamente={recarregar}/> :
      <FlatList data={funcionarios} keyExtractor={i=>String(i.id)} contentContainerStyle={estilos.lista} refreshing={atualizando} onRefresh={recarregar}
        ListEmptyComponent={<EstadoVazio titulo="Nenhum funcionário encontrado" descricao="Ajuste a busca ou cadastre um novo funcionário."/>}
        renderItem={({item})=><View style={estilos.cartao}>
          <TouchableOpacity style={estilos.linha} onPress={()=>nav.navigate('FuncionarioDetalhe',{id:item.id})}>
            <AvatarNome nome={item.nome}/><View style={estilos.info}><Text style={estilos.nome}>{item.nome}</Text><Text style={estilos.meta}>{item.cargo||'Cargo não informado'} · {item.setor||'Sem setor'}</Text><Text style={estilos.matricula}>{item.matricula}</Text></View><IconButton icon="chevron-right" size={20}/>
          </TouchableOpacity>
          <View style={estilos.acoes}><IconButton icon="pencil-outline" size={18} onPress={()=>nav.navigate('FuncionarioForm',{id:item.id})}/><IconButton icon="trash-can-outline" iconColor="#DC2626" size={18} onPress={()=>void remover(item.id)}/></View>
        </View>}/>} 
    <FAB icon="plus" style={estilos.fab} onPress={()=>nav.navigate('FuncionarioForm')} />
    <Snackbar visible={!!mensagem} onDismiss={()=>setMensagem('')} duration={2500}>{mensagem}</Snackbar>
  </View>;
}
const estilos=StyleSheet.create({tela:{flex:1,backgroundColor:semantica.fundo},filtros:{padding:espaco.md,paddingBottom:espaco.xs},busca:{backgroundColor:semantica.fundoElevado,borderRadius:raio.medio},lista:{padding:espaco.md,paddingTop:espaco.xs,paddingBottom:100,gap:espaco.sm},cartao:{backgroundColor:semantica.fundoElevado,borderRadius:raio.grande,borderWidth:1,borderColor:semantica.borda,...elevacao.cartao},linha:{flexDirection:'row',alignItems:'center',gap:espaco.sm,padding:espaco.md},info:{flex:1},nome:{...tipografia.subtitulo,fontSize:14,color:semantica.texto},meta:{...tipografia.apoio,fontSize:12,color:semantica.textoSecundario,marginTop:2},matricula:{...tipografia.codigo,fontSize:11,color:semantica.textoSecundario,marginTop:4},acoes:{borderTopWidth:1,borderTopColor:semantica.borda,flexDirection:'row',justifyContent:'flex-end',paddingHorizontal:espaco.xs},fab:{position:'absolute',right:espaco.md,bottom:espaco.md,backgroundColor:semantica.primario}});
