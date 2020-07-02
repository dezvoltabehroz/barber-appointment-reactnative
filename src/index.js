import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import AppRoutes from './navigation'

import THEME from './assets/styles/theme.style';

class App extends Component {
    componentDidMount() {
        SplashScreen.hide()
    }
    render() {
        console.disableYellowBox = true;
        return (
            <>
                <NavigationContainer>
                    <SafeAreaProvider>
                        <StatusBar backgroundColor={THEME.PRIMARY_BACKGROUND_COLOR} />
                        <AppRoutes />
                    </SafeAreaProvider>
                </NavigationContainer>
            </>
        );
    }
}

export default App;
