import React, { Component } from 'react'
import { View, Text } from 'react-native';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontFamily: 'Poppins-Regular' }}>
                    Notification screen is under Development
                </Text>
            </View>
        )
    }
}
export default Notification