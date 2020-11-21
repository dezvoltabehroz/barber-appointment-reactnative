import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator, } from 'react-native';
import THEME from '../../../assets/styles/theme.style'
import styles from './style'
import Image from 'react-native-fast-image';
import { Avatar, Header } from 'react-native-elements';
import moment from 'moment';
import { connect } from 'react-redux';
// import io from 'socket.io-client';
// const socket = io.connect('http://ec2-3-86-243-93.compute-1.amazonaws.com:3000'); //dev
class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    name: 'John Doe',
                    profile_picture: require('../../../assets/images/logo.png'),
                    message: 'has booked your services',
                    is_decline: '0'
                },
                {
                    id: 2,
                    name: 'John Doe',
                    profile_picture: require('../../../assets/images/logo.png'),
                    message: 'has booked your services',
                    is_decline: '0'
                },
                {
                    id: 3,
                    name: 'John Doe',
                    profile_picture: require('../../../assets/images/logo.png'),
                    message: 'has booked your services',
                    is_decline: '0'
                },
                {
                    id: 4,
                    name: 'John Doe',
                    profile_picture: require('../../../assets/images/logo.png'),
                    message: 'has booked your services',
                    is_decline: '0'
                },
                {
                    id: 5,
                    name: 'John Doe',
                    profile_picture: require('../../../assets/images/logo.png'),
                    message: 'has booked your services',
                    is_decline: '0'
                },
                {
                    id: 6,
                    name: 'John Doe',
                    profile_picture: require('../../../assets/images/logo.png'),
                    message: 'has booked your services',
                    is_decline: '0'
                }
            ]
        }
    }
    // UNSAFE_componentWillMount = () => {
        // socket.on("updateOutgoing", (data) => {
        //     if (data.barber_id === this.props.user.userData.id) {
        //         this.componentDidMount();
        //     }
        // });
    // }

    componentDidMount = () => {
        this.setState({ loading: true })
        setTimeout(() => {
            this.setState({ loading: false })
        }, 5000);
    }

    _renderItems = (item) => {
        const image_url = require('../../../assets/images/Salon-Category.jpg');
        const { onItemPress } = this.props;
        return (
            <>
                <TouchableOpacity onPress={() => onItemPress(item.id, item.is_decline == '1' ? true : false)} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: THEME.COLOR_WHITE, paddingHorizontal: '5%', marginHorizontal: '5%', borderRadius: 7, paddingVertical: '5%' }}>
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
        const { data, loading } = this.state
        return (
            <View style={styles.container} >
                {
                    loading ?
                        <View style={{ flex: 1, backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator />
                        </View>
                        :
                        <View style={{ flex: 1, backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR, paddingBottom: '1%' }}>
                            {data.length == 0 ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={styles.headerTitleStyle}>No Record Found</Text></View>
                                :
                                <FlatList
                                    data={data}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.loading}
                                            onRefresh={() => this.componentDidMount()}
                                            tintColor={THEME.COLOR_WHITE}
                                            colors={[THEME.PRIMARY_COLOR]}
                                        />
                                    }
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={this._renderSeparator}
                                    renderItem={({ item }) => this._renderItems(item)}
                                    keyExtractor={item => item.id} />}
                        </View>
                }
            </View>)
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(Notification)