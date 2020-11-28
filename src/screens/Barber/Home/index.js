import React, { Component } from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, Alert, Image, Dimensions, ActivityIndicator, RefreshControl } from "react-native";
import styles from './style';
import { Button, Icon } from '../../../components'
import { connect } from 'react-redux';
import THEME from '../../../assets/styles/theme.style'
import { BookingServices } from '../../../services';
import moment from 'moment';
import messaging from '@react-native-firebase/messaging'
import { notificationActions } from '../../../redux/actions/notification';
import { bindActionCreators } from "redux";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
class BarberHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: [],
            bookingList: [],
            servicelist: [
                {
                    name: 'Bookings History',
                    imageUrl: 'https://images.unsplash.com/photo-1580561650691-6562b4787600?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
                },

                {
                    name: 'About Us',
                    imageUrl: 'https://images.unsplash.com/photo-1580561650691-6562b4787600?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
                },
                {
                    name: 'Contact Us',
                    imageUrl: 'https://images.unsplash.com/photo-1580561650691-6562b4787600?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
                },
            ],
            loading: false


        }
    }
    getAllBookings = () => {
        this.setState({ loading: true })
        const { user } = this.props
        let userData = {
            id: user.userData.id,
            token: user.userData.token,
            current_date: moment().format('YYYY-MM-DD')
        }
        BookingServices.getBarberBookingList(userData)
            .then((res) => {
                if (res.data.status) {
                    this.setState({ bookingList: res.data.servicesList, loading: false })
                }
            })
            .catch((err) => console.log(err))
    }
    componentDidMount = () => {
        const { user } = this.props
        let userData = {
            id: user.userData.id,
            token: user.userData.token,
        }
        messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
            this.getAllBookings();
            await this.props.notificationActions.getNotification(userData);
        });
        this.getAllBookings();
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }

    _renderItems = (item) => {
        const { onItemPress, onAboutUs, onContactUs, onEditProfile, onBookingHistory } = this.props;
        return (
            <>
                <TouchableOpacity
                    onPress={() => { (item.name == "About Us") ? onAboutUs() : item.name == "Contact Us" ? onContactUs() : item.name == "Edit Profile" ? onEditProfile() : item.name == "Bookings History" ? onBookingHistory() : Alert.alert("Atention", "This screen is under Development") }} style={styles.upperListItemContainer}>
                    <ImageBackground source={{ uri: `${item.imageUrl}` }}
                        style={styles.upperListImageStyle} imageStyle={{ borderRadius: 10 }}>
                        <View style={styles.upperListTitleContainer}>
                            <Text style={[styles.upperListTitleStyle, { color: THEME.COLOR_WHITE }]} >{item.name}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </>
        )
    }

    on_Press_Accept = (data, bookingId, customerId) => {
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            booking_id: bookingId,
            userName: this.props.user.userData.full_name,
            customer_id: customerId
        }
        BookingServices.acceptBookingOfCustomer(userData)
            .then((res) => {
                if (res.data.status) {
                    this.componentDidMount()
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
        const { onDecline, onView } = this.props;
        let region = {
            latitude: parseFloat(item.customer_lat),
            longitude: parseFloat(item.customer_long),
            latitudeDelta: 0.9922,
            longitudeDelta: 0.9421,
        }
        let bookingStartTime = moment(item.booking_time, 'hh:mm A');
        let bookingDuration = parseInt(moment.duration(item.booking_time_duration).asMinutes())
        let tempStartTime = moment(item.booking_time, 'hh:mm A');
        let endTime = tempStartTime.add(bookingDuration, 'minutes');
        let bookingEndTime = new moment(endTime).format('hh:mm A');
        return (
            <TouchableOpacity disabled={item.is_accepted == '1' ? false : true} onPress={() => onView(region, item.id, item.customer_id, item.booking_date, item.booking_time)} style={{ backgroundColor: THEME.COLOR_WHITE, borderRadius: 7, marginHorizontal: '5%', }}>
                <View style={styles.locationContainer}>
                    <Icon.Entypo name='dot-single' color={THEME.COLOR_BLACK} size={20} />
                    <Text style={[styles.upperListTitleStyle, { textTransform: 'capitalize' }]}>{item.customer_address}</Text>
                </View>
                <View style={styles.serviceTimeContainer}>
                    <Icon.Entypo name='dot-single' color={THEME.COLOR_BLACK} size={20} />
                    <Text style={[styles.upperListTitleStyle, { width: screenWidth * 0.8 }]}>{moment(item.booking_date).format('dddd')} {moment(item.booking_date).format('DD/MM/YYYY')} at {moment(bookingStartTime).format('hh:mm A')} to {bookingEndTime} </Text>
                </View>
                <View style={styles.serviceTimeContainer}>
                    <Icon.Entypo name='dot-single' color={THEME.COLOR_BLACK} size={20} />
                    <Text style={styles.upperListTitleStyle}>
                        {item.services.map((data) => {
                            return (<Text style={[styles.upperListTitleStyle]}>{data.service_name}, </Text>)
                        })}...
                    </Text>
                </View>
                {
                    item.is_accepted == '1' ?
                        < View style={styles.buttonContainer}>
                        </ View>
                        :
                        < View style={styles.buttonContainer}>
                            <View>
                                <TouchableOpacity onPress={async () => {
                                    await onDecline(item.id, item.customer_id)
                                    this.setState({ bookingList: this.state.bookingList.filter(obj => obj.id != item.id) })
                                }} style={styles.cancelContainer}>
                                    <Text style={[styles.upperListTitleStyle, { color: THEME.COLOR_WHITE }]}>Decline</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => this.on_Press_Accept(region, item.id, item.customer_id)} style={styles.acceptContainer}>
                                    <Text style={[styles.upperListTitleStyle, { color: THEME.COLOR_WHITE }]}>Accept</Text>
                                </TouchableOpacity>
                            </View>
                        </View>}
            </TouchableOpacity>
        )
    }

    render() {
        let { onExit } = this.props
        const { servicelist, bookingList } = this.state
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.nameContainer}>
                        {/* <Text style={styles.appNameTextStyle} >Fleek</Text> */}
                        <Image source={require('../../../assets/images/logo.png')} resizeMode='contain' style={styles.logoStyle} />
                        {<TouchableOpacity style={styles.exitContainer} onPress={onExit}>
                            <Icon.Feather name="log-out" color="#fff" size={25} />
                        </TouchableOpacity>}
                    </View>
                    <View style={styles.upperListContainer}>
                        <FlatList
                            data={servicelist}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => this._renderItems(item)}
                            keyExtractor={item => item} />
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.appointmentTextStyle}>My Bookings</Text>
                    </View>
                    <View style={styles.lowerListContainer}>
                        {
                            this.state.loading ?
                                <ActivityIndicator />
                                :
                                bookingList.length == 0 ?
                                    <>
                                        <View style={[styles.nameContainer, { justifyContent: 'center' }]}>
                                            <Text style={[styles.appointmentTextStyle, { textAlign: 'center' }]}>No bookings</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => this.componentDidMount()} style={[styles.nameContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                                            <Text style={[styles.upperListTitleStyle, { fontSize: 12, color: THEME.COLOR_WHITE, textAlign: 'center' }]}>Tap to refresh</Text>
                                            <View style={{ marginLeft: '1%', paddingBottom: '1%' }} >
                                                <Icon.EvilIcons name="refresh" size={20} color={THEME.COLOR_WHITE} />
                                            </View>
                                        </TouchableOpacity>
                                    </>
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
const mapDispatchToProps = dispatch => {
    return {
        notificationActions: bindActionCreators(notificationActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarberHome)