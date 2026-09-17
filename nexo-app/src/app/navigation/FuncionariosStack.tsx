import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FuncionarioDetalheScreen,FuncionarioFormScreen,FuncionariosScreen } from '@features/funcionarios';
import type { RotasFuncionarios } from './tipos';
const Stack=createNativeStackNavigator<RotasFuncionarios>();
export function FuncionariosStack(){return <Stack.Navigator screenOptions={{headerShown:false}}><Stack.Screen name="FuncionariosLista" component={FuncionariosScreen}/><Stack.Screen name="FuncionarioDetalhe" component={FuncionarioDetalheScreen}/><Stack.Screen name="FuncionarioForm" component={FuncionarioFormScreen}/></Stack.Navigator>}
