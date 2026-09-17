import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '@features/auth';
import type { RotasAuth } from './tipos';

const Stack = createNativeStackNavigator<RotasAuth>();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
