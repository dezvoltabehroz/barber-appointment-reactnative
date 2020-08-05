import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import AppRoutes from './navigation'

import THEME from './assets/styles/theme.style';

import { Provider } from "react-redux";
import createStore from "./redux/CreateStore";
const store = createStore();

class App extends Component {
    componentDidMount() {
        SplashScreen.hide()
    }
    render() {
        console.disableYellowBox = true;
        return (
            <>
                <Provider store={store}>
                    <NavigationContainer>
                        <SafeAreaProvider>
                            <StatusBar backgroundColor={THEME.PRIMARY_BACKGROUND_COLOR} />
                            <AppRoutes />
                        </SafeAreaProvider>
                    </NavigationContainer>
                </Provider>
            </>
        );
    }
}

export default App;
