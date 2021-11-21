import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {ThemeProvider} from "styled-components/native";
import Navigator from "./navigatior";
import {theme} from './theme';

import {ProgressProvider, UserProvider, AssetsProvider} from "./contexts";

export default function App() {

    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                <ProgressProvider>
                    <AssetsProvider>
                        <StatusBar barStyle="auto"/>
                        <Navigator/>
                    </AssetsProvider>
                </ProgressProvider>
            </UserProvider>
        </ThemeProvider>
    )
}
