import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, } from 'react-native';
import THEME from '../../../assets/styles/theme.style'
import styles from './style'
import Image from 'react-native-fast-image';
import { Avatar, Header } from 'react-native-elements';
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
                    <View style={{ flex: 0.2, marginHorizontal: '2%', justifyContent: "center", alignItems: 'center', }}>
                        <View style={{ height: 60, width: 60, borderRadius: 30, borderWidth: 1, justifyContent: "center", alignItems: 'center', }}>
                            <Image source={require('../../../assets/images/logo.png')} resizeMode='contain' style={{ height: 50, width: 50, }} />
                        </View>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: '5%' }}>
                        <Text style={styles.upperListTitleStyle}>{moment().format('ll')} | {moment().format('LT')}</Text>
                        <Text style={[styles.upperListTitleStyle, { marginTop: '5%' }]} >{item.name} {item.message}</Text>
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
                <Header centerComponent={{ text: 'Notification', style: { fontSize: 16, color: '#fff', fontFamily: 'Poppins-Bold' } }}
                    containerStyle={{
                        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
                        alignItems: 'center',
                        borderBottomWidth: 0
                    }} />
                <View style={{ flex: 1, backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR, paddingBottom: '1%' }}>

                    {data.length == 0 ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={styles.headerTitleStyle}>No Record Found</Text></View>
                        :
                        <FlatList
                            data={data}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this._renderSeparator}
                            renderItem={({ item }) => this._renderItems(item)}
                            keyExtractor={item => item.id} />}
                </View>
            </>
        )
    }
}
export default Notification