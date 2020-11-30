import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { SearchandMapView, Icon } from '../../../components';
import { Linking, Platform } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
import { BookingServices } from '../../../services';
import { connect } from 'react-redux';
import moment from 'moment';

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
                    this.setState({
                        data: res.data.custProfile[0].phone,
                        userData: {
                            customer_id: res.data.custProfile[0].customer_id,
                            full_name: res.data.custProfile[0].full_name,
                            email: res.data.custProfile[0].email,
                            profile_picture: res.data.custProfile[0].profile_picture
                        }
                    })
                }
            })
            .catch((err) => console.log(err))
        this.setState({ region: item });

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
        let { bookingDate, bookingTime, arrivedAtlocation, onChat, bookingDuration } = this.props;
        const { region, userData } = this.state;
        const location = `${region.latitude},${region.longitude}`;
        const url = Platform.select({
            ios: `maps:${location}`,
            android: `geo:${location}?center=${location}&q=${location}&z=16`,
        });
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
                    else{
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
        }
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.8 }}>
                    <View>
                        <TouchableOpacity onPress={() => Linking.openURL(url)}>
                            <Text style={styles.getDirectionText}>Get Direction</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <SearchandMapView accept region={(region)} />
                    </View>
                </View>
                <View style={styles.footerStyle}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity disabled={enable()} onPress={arrivedAtlocation} style={[styles.customerLocationContainer, { backgroundColor: enable() ? 'lightgrey' : THEME.PRIMARY_COLOR }]}>
                            <Text style={styles.buttonText}>Arrived</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => onChat(userData)}>
                                <Icon.MaterialCommunityIcons name='chat' color={THEME.COLOR_WHITE} size={THEME.ICON_SIZE} />
                            </TouchableOpacity>
                            <View style={{ width: 20 }}></View>
                            <TouchableOpacity onPress={this.on_Phone}>
                                <Icon.MaterialCommunityIcons name='phone' color={THEME.COLOR_WHITE} size={THEME.ICON_SIZE} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(BarberServiceAccept)