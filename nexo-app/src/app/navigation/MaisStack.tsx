import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaisScreen } from '@features/mais';
import { InstrutorDetalheScreen,InstrutorFormScreen,InstrutoresScreen } from '@features/instrutores';
import { AuditoriaScreen,PerfilAcessoFormScreen,PerfisScreen,PermissoesScreen,UsuarioFormScreen,UsuariosScreen } from '@features/administracao';
import { PerfilScreen } from '@features/perfil';
import type { RotasMais } from './tipos';
const Stack=createNativeStackNavigator<RotasMais>();
export function MaisStack(){return <Stack.Navigator screenOptions={{headerShown:false}}><Stack.Screen name="MaisInicio" component={MaisScreen}/><Stack.Screen name="InstrutoresLista" component={InstrutoresScreen}/><Stack.Screen name="InstrutorDetalhe" component={InstrutorDetalheScreen}/><Stack.Screen name="InstrutorForm" component={InstrutorFormScreen}/><Stack.Screen name="Usuarios" component={UsuariosScreen}/><Stack.Screen name="UsuarioForm" component={UsuarioFormScreen}/><Stack.Screen name="Perfis" component={PerfisScreen}/><Stack.Screen name="PerfilAcessoForm" component={PerfilAcessoFormScreen}/><Stack.Screen name="Permissoes" component={PermissoesScreen}/><Stack.Screen name="Auditoria" component={AuditoriaScreen}/><Stack.Screen name="MeuPerfil" component={PerfilScreen}/></Stack.Navigator>}
