import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from './theme';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default function App() {

  const [isReady, setIsReady] = useState(false);

  const _loadAssets = async () => {
    const imageAssets = cacheImages([
      require('../assets/splash.png'),
      require('../assets/logo.png'),
      require('../assets/icon.png'),
      require('../assets/graphic.png')
    ]);
    const fontAssets = cacheFonts([
      FontAwesome.font,
      require('../assets/fonts/NotoSansKR-Regular.otf'),
      require('../assets/fonts/BlackHanSans-Regular.ttf'),
      require('../assets/fonts/NotoSansKR-Bold.otf'),
      require('../assets/fonts/NotoSansKR-Medium.otf')
    ]);
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
