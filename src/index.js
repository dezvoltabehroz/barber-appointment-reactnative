import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './navigation'

import THEME from './assets/styles/theme.style';
class App extends Component {
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
