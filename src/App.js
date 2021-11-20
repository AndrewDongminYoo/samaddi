import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo-app-loading';
import * as Font from 'expo-font';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { theme } from './theme';

export default function App() {

  const [isReady, setIsReady] = useState(false);

  const _loadAssets = async () => {
    const imageAssets = cacheImages([require('../assets/splash.png')]);
    const fontAssets = cacheFonts([require('../assets/fonts/NotoSansKR-Regular.otf')]);
    await Promise.all([...imageAssets, ...fontAssets]);
  }

  return isReady ? (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  ) : (
    <AppLoading
      startAsync={_loadAssets}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
