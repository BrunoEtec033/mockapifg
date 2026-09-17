import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CertificadoDetalheScreen,CertificadosScreen } from '@features/certificados';
import type { RotasCertificados } from './tipos';
const Stack=createNativeStackNavigator<RotasCertificados>();
export function CertificadosStack(){return <Stack.Navigator screenOptions={{headerShown:false}}><Stack.Screen name="CertificadosLista" component={CertificadosScreen}/><Stack.Screen name="CertificadoDetalhe" component={CertificadoDetalheScreen}/></Stack.Navigator>}
