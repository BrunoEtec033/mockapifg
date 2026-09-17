import { useCallback } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Archivo_700Bold, Archivo_800ExtraBold } from '@expo-google-fonts/archivo';
import { IBMPlexSans_400Regular, IBMPlexSans_500Medium, IBMPlexSans_600SemiBold } from '@expo-google-fonts/ibm-plex-sans';
import { IBMPlexMono_500Medium } from '@expo-google-fonts/ibm-plex-mono';
import { AppProviders } from '@app/providers';
import { RootNavigator } from '@app/navigation';
import { semantica } from '@shared/theme';

export default function App() {
  const [fontesCarregadas] = useFonts({
    Archivo_700Bold,
    Archivo_800ExtraBold,
    IBMPlexSans_400Regular,
    IBMPlexSans_500Medium,
    IBMPlexSans_600SemiBold,
    IBMPlexMono_500Medium,
  });

  const semFontes = useCallback(
    () => <View style={{ flex: 1, backgroundColor: semantica.fundo }} />,
    [],
  );

  if (!fontesCarregadas) return semFontes();

  return (
    <AppProviders>
      <StatusBar style="dark" />
      <RootNavigator />
    </AppProviders>
  );
}
