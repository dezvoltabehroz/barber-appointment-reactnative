import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { SearchandMapView, Icon, ProfileCard } from '../../../components';
import { Linking, Platform } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
import { BookingServices } from '../../../services';
import { connect } from 'react-redux';
import moment from 'moment';
import { ActivityIndicator } from 'react-native';

class BarberServiceAccept extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '03001234567',
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.9922,
                longitudeDelta: 0.9421,
            },
            userData: {},
            customerAddress: "",
            bookingDate: "",
            bookingTime: "",
            bookingDuration: "",
            location: "",
            url: "",
            loading: true
        }
    }

    componentWillMount = () => {

        const { item, bookingId, user } = this.props;
        let userData = {
            id: user.userData.id,
            token: user.userData.token,
            booking_id: bookingId
        }
        BookingServices.getCustomerDetails(userData)
            .then((res) => {
                if (res.data.status) {
                    BookingServices.getBookingDetails(userData)
                        .then((response) => {
                            console.log
                            if (response.data.status) {
                                this.setState({
                                    data: res.data.custProfile[0].phone,
                                    customerAddress: response.data.booking_service_details.address,
                                    region: {
                                        latitude: parseFloat(response.data.booking_service_details.latitude),
                                        longitude: parseFloat(response.data.booking_service_details.longitude),
                                        latitudeDelta: 0.22,
                                        longitudeDelta: 0.21,
                                    },
                                    bookingDate: response.data.booking_service_details.booking_date,
                                    bookingTime: response.data.booking_service_details.booking_time,
                                    bookingDuration: response.data.booking_service_details.booking_time_duration,
                                    userData: {
                                        customer_id: res.data.custProfile[0].customer_id,
                                        full_name: res.data.custProfile[0].full_name,
                                        email: res.data.custProfile[0].email,
                                        profile_picture: res.data.custProfile[0].profile_picture
                                    },
                                    location: `${response.data.booking_service_details.longitude},${response.data.booking_service_details.latitude}`,
                                    url: Platform.select({
                                        ios: `maps:${response.data.booking_service_details.longitude},${response.data.booking_service_details.latitude}`,
                                        android: `geo:${response.data.booking_service_details.longitude},${response.data.booking_service_details.latitude}?center=${response.data.booking_service_details.longitude},${response.data.booking_service_details.latitude}&q=${response.data.booking_service_details.longitude},${response.data.booking_service_details.latitude}&z=16`,
                                    }),
                                    loading: false
                                })
                            }
                        })
                        .catch((err) => console.log(err))
                }
            })
            .catch((err) => console.log(err))

    }

    openGps = (lat, lng) => {
        var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
        var url = scheme + `${lat},${lng}`;
        Linking.openURL(url);
    }



    on_Phone = () => {
        const { data } = this.state;
        let number = ''
        number = 'tel:' + data;
        Linking.openURL(number);
    }

    render() {
        let { arrivedAtlocation, onChat, } = this.props;
        const { region, userData, bookingDate, url, bookingTime, loading, customerAddress, bookingDuration } = this.state;

        let date = moment(bookingDate).format('YYYY-MM-DD') + ' ' + bookingTime;
        let time = parseInt(moment.duration(bookingDuration).asMinutes())
        var h = time / 60 | 0;
        var m = time % 60 | 0;
        let timeInHour = moment.utc().hours(h).minutes(m).format("HH:mm");
        let bookingEndTime = moment(date).add(timeInHour, 'hours')
        const enable = () => {
            if (moment(date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
                if (moment().format('YYYY-MM-DD H:mm:ss') >= moment(date).format('YYYY-MM-DD H:mm:ss')) {
                    if (moment(bookingEndTime).format('YYYY-MM-DD H:mm:ss') >= moment().format('YYYY-MM-DD H:mm:ss')) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
            else {
                return true
            }
            // return false
        }
        return (

            < View style={styles.container} >
                {
                    loading ?
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator color={THEME.PRIMARY_COLOR} size="small" />
                        </View>
                        :
                        <>
                            <View style={{ flex: 0.5 }}>
                                <View style={{ width: "100%", marginHorizontal: "5%", flexDirection: "row" }}>
                                    <Text style={[styles.addressText, { fontSize: 16 }]}>Address:</Text>
                                    <Text style={[styles.addressText, { width: "70%", marginLeft: "2.5%" }]}>{customerAddress}</Text>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => Linking.openURL(url)}>
                                        <Text style={[styles.getDirectionText, { textAlign: 'right' }]}>Get Direction?</Text>
                                    </TouchableOpacity>
                                </View>
                                {
                                    region.latitude == undefined ?
                                        null
                                        :
                                        <View>
                                            <SearchandMapView accept region={(region)} />
                                        </View>}
                            </View>
                            <View style={styles.footerStyle}>
                                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "center" }}>
                                    <ProfileCard heading={"Chat"} onPress={() => onChat(userData)} />
                                    <ProfileCard heading={"Call"} onPress={() => this.on_Phone()} />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        disabled={enable()}
                                        onPress={() => arrivedAtlocation(userData)} style={[styles.customerLocationContainer, { backgroundColor: enable() ? 'lightgrey' : "#171717" }]}>
                                        <Text style={styles.buttonText}>Arrived</Text>
                                    </TouchableOpacity>
                                    {/* <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => onChat(userData)}>
                                <Icon.MaterialCommunityIcons name='chat' color={THEME.COLOR_WHITE} size={THEME.ICON_SIZE} />
                            </TouchableOpacity>
                            <View style={{ width: 20 }}></View>
                            <TouchableOpacity onPress={this.on_Phone}>
                                <Icon.MaterialCommunityIcons name='phone' color={THEME.COLOR_WHITE} size={THEME.ICON_SIZE} />
                            </TouchableOpacity>
                        </View> */}
                                </View>
                            </View>
                        </>
                }

            </View >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(BarberServiceAccept)