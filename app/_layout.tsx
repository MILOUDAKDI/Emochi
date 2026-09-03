// Powered by OnSpace.AI
import { AlertProvider } from '@/template';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { I18nManager } from 'react-native';

// Enable RTL for Arabic
I18nManager.allowRTL(true);

export default function RootLayout() {
  return (
    <AlertProvider>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="chat/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="character/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="rankings" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </AlertProvider>
  );
}
