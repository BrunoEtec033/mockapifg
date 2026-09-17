import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { PainelScreen } from '@features/dashboard';
import { cores, semantica } from '@shared/theme';
import { CertificadosStack } from './CertificadosStack';
import { FuncionariosStack } from './FuncionariosStack';
import { MaisStack } from './MaisStack';
import { TreinamentosStack } from './TreinamentosStack';
import type { RotasAbas } from './tipos';
const Abas=createBottomTabNavigator<RotasAbas>();
const emojis:Record<keyof RotasAbas,string>={Painel:'📟',Treinamentos:'📚',Certificados:'🎖️',Funcionarios:'👥',Mais:'▦'};
export function AbasNavigator(){return <Abas.Navigator screenOptions={({route})=>({headerShown:false,tabBarActiveTintColor:cores.sinal,tabBarInactiveTintColor:cores.aco500,tabBarStyle:{backgroundColor:semantica.fundoElevado,borderTopWidth:2,borderTopColor:semantica.borda,height:68,paddingTop:7,paddingBottom:8},tabBarLabelStyle:{fontFamily:'IBMPlexMono_500Medium',fontSize:10},tabBarIcon:({color,size})=><Text style={{fontSize:size,color,opacity:color===cores.sinal?1:0.6}}>{emojis[route.name as keyof RotasAbas]}</Text>} )}><Abas.Screen name="Painel" component={PainelScreen}/><Abas.Screen name="Treinamentos" component={TreinamentosStack} options={{title:'Treinos'}}/><Abas.Screen name="Certificados" component={CertificadosStack}/><Abas.Screen name="Funcionarios" component={FuncionariosStack} options={{title:'Funcionários'}}/><Abas.Screen name="Mais" component={MaisStack}/></Abas.Navigator>}