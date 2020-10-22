import React, { Component } from 'react'
import { View, Text } from 'react-native';
import THEME from '../../../assets/styles/theme.style'
class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:THEME.PRIMARY_BACKGROUND_COLOR }}>
                <Text style={{ color: THEME.COLOR_WHITE, fontFamily: 'Poppins-Regular', }}>
                    Notification screen is under Development
                </Text>
            </View>
        )
    }
}
export default Notification