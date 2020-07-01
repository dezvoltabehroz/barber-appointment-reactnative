import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import styles from './style';

class AuthScreen extends Component {
    render() {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.imageStyle}
                            source={require('../../assets/images/logo.png')}
                            resizeMode='stretch' />
                    </View>
                    <View style={styles.TextContainer}>
                        <Text style={styles.headingTextStyle}>Enhance your experience with</Text>
                        <Text style={styles.babeoTextStyle}>Mr.Babeo!</Text>
                    </View>
                </View>
            </>
        )
    }
}
export default AuthScreen;