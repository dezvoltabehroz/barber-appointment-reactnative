import React, { useEffect, useContext, Component } from 'react'
import { StatusBar, View } from 'react-native'
import SplashView from './splashView'
import styles from './style'

class Splash extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount = () => {
        setTimeout(
            () =>
                this.props.onAuth,
            2000
        )
    }

    render() {
        return (
            <>
                {/* <StatusBar backgroundColor="#1E2023" /> */}
                <View style={styles.container}>
                    <SplashView />
                </View>
            </>
        )
    }

}

export default Splash;
