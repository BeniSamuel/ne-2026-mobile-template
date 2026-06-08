import { Ionicons } from '@expo/vector-icons';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from './src/navigations/RootNavigator';
import { DictionaryProvider } from './src/store/DictionaryContext';
import { colors } from './src/theme/colors';
import { fonts } from './src/theme/fonts';

SplashScreen.preventAutoHideAsync().catch(() => null);
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => null);
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppLoadingScreen />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DictionaryProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </DictionaryProvider>
    </GestureHandlerRootView>
  );
}

function AppLoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingIcon}>
        <Ionicons name="book-outline" color={colors.primary} size={34} />
      </View>
      <Text style={styles.loadingTitle}>Lexi Dictionary</Text>
      <Text style={styles.loadingMessage}>Preparing word library...</Text>
      <ActivityIndicator color={colors.primary} size="small" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    padding: 24,
  },
  loadingIcon: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    height: 70,
    justifyContent: 'center',
    marginBottom: 8,
    width: 70,
  },
  loadingTitle: {
    color: colors.text,
    fontFamily: fonts.extraBold,
    fontSize: 25,
  },
  loadingMessage: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
});
