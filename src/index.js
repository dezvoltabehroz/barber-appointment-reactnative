import React, { Component } from 'react';
import { StatusBar, Linking, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import AppRoutes from './navigation'
import AsyncStorage from '@react-native-community/async-storage';
import THEME from './assets/styles/theme.style';

import { Provider } from "react-redux";
import createStore from "./redux/CreateStore";
const store = createStore();

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

export default function App() {
    const [isReady, setIsReady] = React.useState(false);
    const [initialState, setInitialState] = React.useState();

    React.useEffect(() => {
        SplashScreen.hide();
        console.disableYellowBox = true;
    });
    
    React.useEffect(() => {

        const restoreState = async () => {
            try {
                const initialUrl = await Linking.getInitialURL();
                if (Platform.OS !== 'web' && initialUrl == null) {
                    const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
                    const state = savedStateString ? JSON.parse(savedStateString) : undefined;
                    if (state !== undefined) {
                        setInitialState(state);
                    }
                }
            } finally {
                setIsReady(true);
            }
        };
        if (!isReady) {
            restoreState();
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    }
    return (
        <>
            <Provider store={store}>
                <NavigationContainer
                    initialState={initialState}
                    onStateChange={(state) => {
                        state.routes.forEach(element => {
                            if (element.name == "Register") {
                                AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
                            }
                            else {
                                AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(null))
                            }
                        });
                    }}
                >
                    <SafeAreaProvider>
                        <StatusBar backgroundColor={THEME.PRIMARY_BACKGROUND_COLOR} />
                        <AppRoutes />
                    </SafeAreaProvider>
                </NavigationContainer>
            </Provider>
        </>
    );
}


