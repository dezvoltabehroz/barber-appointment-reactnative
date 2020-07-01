import React, { useEffect, useContext } from 'react'
import { StatusBar, View } from 'react-native'
import SplashView from './splashView'
import styles from './style'

const Splash = ({ navigation, route }) => {
    useEffect(() => {
        // getUserData()
        setTimeout(
            () =>
                console.log('Splash Screen'),
            5000
        )
    })

    return (
        <>
            <StatusBar backgroundColor="#1E2023" />
            <View style={styles.container}>
                <SplashView />
            </View>
        </>
    )
}

export default Splash;
