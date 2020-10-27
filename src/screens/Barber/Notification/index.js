import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, } from 'react-native';
import THEME from '../../../assets/styles/theme.style'
import styles from './style'
import Image from 'react-native-fast-image';
import { Avatar } from 'react-native-elements';
import moment from 'moment'
class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'John Doe',
                    profile_picture: require('../../../assets/images/logo.png'),
                    message: 'has booked your services'
                },
                {
                    name: 'John Doe',
                    profile_picture: require('../../../assets/images/logo.png'),
                    message: 'has booked your services'
                },
                {
                    name: 'John Doe',
                    profile_picture: require('../../../assets/images/logo.png'),
                    message: 'has booked your services'
                },
                {
                    name: 'John Doe',
                    profile_picture: require('../../../assets/images/logo.png'),
                    message: 'has booked your services'
                },
                {
                    name: 'John Doe',
                    profile_picture: require('../../../assets/images/logo.png'),
                    message: 'has booked your services'
                },
                {
                    name: 'John Doe',
                    profile_picture: require('../../../assets/images/logo.png'),
                    message: 'has booked your services'
                }
            ]
        }
    }
    _renderItems = (item) => {
        const image_url = require('../../../assets/images/Salon-Category.jpg');
        const { onItemPress } = this.props;
        return (
            <>
                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: THEME.COLOR_WHITE, paddingHorizontal: '5%', marginHorizontal: '5%', borderRadius: 7, paddingVertical: '5%' }}>
                    <View style={{ lex: 0.2, marginHorizontal: '5%' }}>
                        <Avatar source={require('../../../assets/images/logo.png')} rounded={true} size={60} />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: '5%' }}>
                        <Text style={styles.upperListTitleStyle}>{moment().format('ll')} | {moment().format('LT')}</Text>
                        <Text style={styles.upperListTitleStyle} >{item.name} {item.message}</Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }
    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }
    render() {
        const { data } = this.state
        return (
            <>

                <View style={{ flex: 1, paddingTop: '5%', backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR, paddingBottom: '1%' }}>
                    <View><Text style={styles.headerTitleStyle}>Notification</Text>
                    </View>
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={this._renderSeparator}
                        renderItem={({ item }) => this._renderItems(item)}
                        keyExtractor={item => item.id} />
                </View>
            </>)
    }
}
export default Notification