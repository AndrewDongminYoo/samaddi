import React from 'react';
import {useState, createContext} from 'react';
import {Image} from "react-native";
import * as Font from "expo-font";
import {FontAwesome} from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import {Asset} from "expo-asset";

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

const AssetsContext = createContext({
    isLoaded: false
});

const AssetsProvider = ({ children }) => {

    const [value, setValue] = useState(false);

    const _loadAssets = async () => {
        const fonts = {
            'BlackHanSans': require('../../assets/fonts/BlackHanSans-Regular.ttf'),
            'NotoSansRegular': require('../../assets/fonts/NotoSansKR-Regular.otf'),
            'NotoSansBold': require('../../assets/fonts/NotoSansKR-Bold.otf')
        }
        const imageAssets = cacheImages([
            require('../../assets/splash.png'),
            require('../../assets/logo.png'),
            require('../../assets/icon.png'),
            require('../../assets/graphic.png')
        ]);
        const fontAssets = cacheFonts([
            FontAwesome.font,
            fonts
        ]);
        await Promise.all([...imageAssets, ...fontAssets]);
    };

    return value ? (
        <AssetsContext.Provider value={value}>
            {children}
        </AssetsContext.Provider>
    ) : (
        <AppLoading
            startAsync={_loadAssets}
            onFinish={() => setValue(true)}
            onError={console.warn}
        />
    )
}

export default AssetsProvider;

