import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {ThemeProvider} from "react-native-elements";
import AssetsProvider from "./contexts/Assets";
import {NavigationContainer} from '@react-navigation/native';
import {theme} from './theme';

export default function App() {

    return (
        <ThemeProvider theme={theme}>
            <AssetsProvider>
                <StatusBar style="auto"/>
            </AssetsProvider>
        </ThemeProvider>
    )
}
