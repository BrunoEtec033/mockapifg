import { useEffect,useState } from 'react';
import { StyleSheet,View } from 'react-native';
import { Button,HelperText,TextInput } from 'react-native-paper';
import { RouteProp,useNavigation,useRoute } from '@react-navigation/native';
import { TopoTela } from '@shared/components';
import { espaco,semantica } from '@shared/theme';
import { administracaoService } from '../services/administracaoService';
import { useSalvarPerfil } from '../hooks/useAdministracao';
type R=RouteProp<{PerfilAcessoForm:{id?:number}},'PerfilAcessoForm'>;
export function PerfilAcessoFormScreen(){const nav=useNavigation<any>();const route=useRoute<R>();const id=route.params?.id;const [v,setV]=useState({nome:'',descricao:''});const m=useSalvarPerfil(id);useEffect(()=>{if(id)void administracaoService.listarPerfis().then(xs=>{const p=xs.find(x=>x.id===id);if(p)setV({nome:p.nome,descricao:p.descricao??''})})},[id]);const salvar=async()=>{if(!v.nome.trim())return;await m.salvar(v);nav.goBack()};return <View style={e.tela}><TopoTela titulo={id?'Editar Perfil':'Novo Perfil'} aoVoltar={()=>nav.goBack()}/><View style={e.form}><TextInput mode="outlined" label="Nome" value={v.nome} onChangeText={x=>setV({...v,nome:x})}/><TextInput mode="outlined" label="Descrição" value={v.descricao} onChangeText={x=>setV({...v,descricao:x})} multiline numberOfLines={4}/>{m.erro&&<HelperText type="error" visible>{m.erro.message}</HelperText>}<Button mode="contained" onPress={()=>void salvar()} loading={m.salvando}>Salvar Perfil</Button></View></View>}
const e=StyleSheet.create({tela:{flex:1,backgroundColor:semantica.fundo},form:{padding:espaco.md,gap:espaco.sm}});
