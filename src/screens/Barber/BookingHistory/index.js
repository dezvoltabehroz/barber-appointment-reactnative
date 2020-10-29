import React, { Component } from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, Alert, Image, Dimensions, ActivityIndicator, RefreshControl } from "react-native";
import styles from './style';
import { Button, Icon, SearchandMapView } from '../../../components'
import { connect } from 'react-redux';
import Geocoder from 'react-native-geocoder';
import THEME from '../../../assets/styles/theme.style'
import { BookingServices } from '../../../services';
import moment from 'moment';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
class BarberBookingHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: [],
            bookingList: [],
            loading: false


        }
    }
    componentDidMount = () => {
        this.setState({ loading: true })
        const { user } = this.props
        let userData = {
            id: user.userData.id,
            token: user.userData.token
        }
        BookingServices.getBarberBookingHistory(userData)
            .then((res) => {
                if (res.data.status) {
                    let items = [];
                    items = res.data.servicesList
                    items = items.reverse()
                    this.setState({ bookingList: items, loading: false })
                }
            })
            .catch((err) => console.log(err))
    }



    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }
    _renderBookingItems = (item, index) => {
        const { onPressBooking } = this.props;
        let region = {
            latitude: parseFloat(item.customer_lat),
            longitude: parseFloat(item.customer_long),
            latitudeDelta: 0.9922,
            longitudeDelta: 0.9421,
        }
        let bookingStartTime = moment(item.booking_time, 'H:mm ');
        let bookingDuration = parseInt(moment.duration(item.booking_time_duration).asMinutes())
        let tempStartTime = moment(item.booking_time, 'hh:mm A');
        let endTime = tempStartTime.add(bookingDuration, 'minutes');
        return (
            <TouchableOpacity onPress={() => onPressBooking(item.id, item.is_decline == '1'?true: false)}
                style={{ backgroundColor: THEME.COLOR_WHITE, borderRadius: 7, marginHorizontal: '5%', }}>
                <View style={styles.locationContainer}>
                    <View style={{ marginHorizontal: '2%' }}>
                        <Text style={[styles.upperListTitleBoldStyle, { textTransform: 'capitalize' }]}>Booking Id: #{item.id}</Text>
                    </View>
                    <View style={{ marginRight: '2%' }}>
                        <Text style={[styles.upperListTitleBoldStyle, { textTransform: 'capitalize' }]}>{moment(item.booking_date).format('Do MMM YYYY')} {moment(bookingStartTime).format('H:mm')}</Text>
                    </View>
                </View>
                <View style={styles.serviceTimeContainer}>
                    <Icon.Entypo name='location' color={THEME.COLOR_BLACK} size={20} />
                    <View style={{ marginLeft: '2%' }}>
                        <Text style={[styles.upperListTitleStyle, { width: screenWidth * 0.7 }]}>{item.customer_address} </Text>
                    </View>
                </View>
                <View style={styles.serviceTimeContainer}>
                    <View style={{ marginLeft: '1%' }}>
                        <Text style={[styles.upperListTitleBoldStyle]}>Status: </Text>
                    </View>
                    <View style={{ marginLeft: '2%' }}>
                        <Text style={[styles.upperListTitleStyle, { color: item.is_decline == '1' ? 'red' : THEME.PRIMARY_COLOR }]}>{item.is_decline == '1' ? 'Cancelled' : item.is_accepted == '1' && item.is_arrived == '1' && item.is_started == '1' && item.is_completed == '1' ? 'Completed' : ''} </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        let { onExit } = this.props
        const { servicelist, bookingList } = this.state
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.lowerListContainer}>
                        {
                            this.state.loading ?
                                <ActivityIndicator />
                                :
                                <FlatList
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.loading}
                                            onRefresh={() => this.componentDidMount()}
                                            tintColor={THEME.COLOR_WHITE}
                                            colors={[THEME.PRIMARY_COLOR]}
                                        />
                                    }
                                    data={bookingList}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={this._renderSeparator}
                                    renderItem={({ item, index }) => this._renderBookingItems(item, index)}
                                    keyExtractor={item => item} />}
                    </View>
                </View>
            </>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(BarberBookingHistory)