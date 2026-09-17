import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TreinamentoDetalheScreen,TreinamentoFormScreen,TreinamentosScreen } from '@features/treinamentos';
import type { RotasTreinamentos } from './tipos';
const Stack=createNativeStackNavigator<RotasTreinamentos>();
export function TreinamentosStack(){return <Stack.Navigator screenOptions={{headerShown:false}}><Stack.Screen name="TreinamentosLista" component={TreinamentosScreen}/><Stack.Screen name="TreinamentoDetalhe" component={TreinamentoDetalheScreen}/><Stack.Screen name="TreinamentoForm" component={TreinamentoFormScreen}/></Stack.Navigator>}
