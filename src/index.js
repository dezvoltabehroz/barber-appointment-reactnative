import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import Splash from './screens/Splash';

import THEME from './styles/theme.style';
class App extends Component {
    render() {
        console.disableYellowBox = true;
        return (
            <>
                <StatusBar backgroundColor={THEME.PRIMARY_BACKGROUND_COLOR} />
                <Splash />
            </>
        );
    }
}

export default App;
