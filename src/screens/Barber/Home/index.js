import React, { Component } from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, Alert, Image, Dimensions, ActivityIndicator, RefreshControl } from "react-native";
import styles from './style';
import { Button, Icon, SearchandMapView } from '../../../components'
import { connect } from 'react-redux';
import Geocoder from 'react-native-geocoder';
import THEME from '../../../assets/styles/theme.style'
import {  BookingServices } from '../../../services';
import moment from 'moment';

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
    componentDidMount = () => {
        this.setState({ loading: true })
        const { user } = this.props
        let userData = {
            id: user.userData.id,
            token: user.userData.token
        }
        BookingServices.getBarberBookingList(userData)
            .then((res) => {
                let locationText = []
                res.data.servicesList.map((item, index) => {
                    if (item.customer_lat && item.customer_long) {
                        let pos = {
                            lat: parseFloat(item.customer_lat),
                            lng: parseFloat(item.customer_long)
                        }
                        Geocoder.geocodePosition(pos).then((res) => {
                            locationText.push(res[0].formattedAddress)
                            this.setState({ location: locationText })
                        })
                            .catch(error => console.log(error));
                    }

                })
                this.setState({ loading: false, bookingList: res.data.servicesList, loading: false })

            })
            .catch((err) => console.log(err))
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }

    _renderItems = (item) => {
        const { onItemPress, onAboutUs, onContactUs, onEditProfile } = this.props;
        return (
            <>
                <TouchableOpacity
                    onPress={() => { (item.name == "About Us") ? onAboutUs() : item.name == "Contact Us" ? onContactUs() : item.name == "Edit Profile" ? onEditProfile() : Alert.alert("Atention", "This screen is under Development") }} style={styles.upperListItemContainer}>
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


    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }
    _renderBookingItems = (item, index) => {
        const { onAccept, onDecline, onView } = this.props;
        const { location, bookin } = this.state;
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
            <TouchableOpacity disabled={item.is_accepted == '1' ? false : true} onPress={() => onView(region,item.id,item.customer_id)} style={{ backgroundColor: THEME.COLOR_WHITE, borderRadius: 7, marginHorizontal: '5%', }}>
                <View style={styles.locationContainer}>
                    <Icon.Entypo name='dot-single' color={THEME.COLOR_BLACK} size={20} />
                    <Text style={styles.upperListTitleStyle}>{location[index]}</Text>
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
                                    await onDecline(item.id)
                                    this.setState({ bookingList: this.state.bookingList.filter(obj => obj.id != item.id) })
                                }} style={styles.cancelContainer}>
                                    <Text style={[styles.upperListTitleStyle, { color: THEME.COLOR_WHITE }]}>Decline</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => onAccept(region, item.id,item.customer_id)} style={styles.acceptContainer}>
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
                                <FlatList
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.loading}
                                            onRefresh={()=>this.componentDidMount()}
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

export default connect(mapStateToProps)(BarberHome)