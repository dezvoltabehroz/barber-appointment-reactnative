import React, { Component } from 'react';
import { View, Text, FlatList, ImageBackground, ScrollView, TouchableOpacity, Alert, Image, Dimensions, ActivityIndicator, RefreshControl } from "react-native";
import styles from './style';
import { Button, Icon } from '../../../components'
import { connect } from 'react-redux';
import THEME from '../../../assets/styles/theme.style'
import { BookingServices } from '../../../services';
import moment from 'moment';
import messaging from '@react-native-firebase/messaging'
import { notificationActions } from '../../../redux/actions/notification';
import { bindActionCreators } from "redux";
import { authActions } from '../../../redux/actions/auth';
import Modal from 'react-native-modal';
import { Avatar } from 'react-native-elements';
import Calendar from '../../../assets/svg/calendar.svg'
import Refresh from '../../../assets/svg/refresh.svg'
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
class BarberHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: [],
            bookingList: [],
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
                    onPress={() => { (item.name == "About Us") ? onAboutUs() : item.name == "Contact Us" ? onContactUs() : item.name == "Edit Profile" ? onEditProfile() : item.name == "Appointments History" ? onBookingHistory() : item.name == "PPE (Formerly About US)" ? this.props.authActions.healthAndSafety(true) : Alert.alert("Atention", "This screen is under Development") }} style={styles.upperListItemContainer}>
                    <ImageBackground source={item.imageUrl}
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
            <TouchableOpacity disabled={item.is_accepted == '1' ? false : true} onPress={() => onView(region, item.id, item.customer_id, item.booking_date, item.booking_time, item.booking_time_duration)} style={{ backgroundColor: '#171717', marginHorizontal: '5%', paddingHorizontal: '5%', borderWidth: 1, borderColor: 'gray' }}>
                <View style={styles.locationContainer}>
                    {/* <Icon.Entypo name='dot-single' color={THEME.COLOR_BLACK} size={20} /> */}
                    <Text style={[styles.upperListTitleStyle, { textTransform: 'capitalize' }]}>{item.customer_address}</Text>
                </View>
                <View style={styles.serviceTimeContainer}>
                    {/* <Icon.Entypo name='dot-single' color={THEME.COLOR_BLACK} size={20} /> */}
                    <Text style={[styles.upperListTitleStyle, { width: screenWidth * 0.8 }]}>{moment(item.booking_date).format('MM/DD/YYYY')} at {moment(bookingStartTime).format('hh:mm A')} to {bookingEndTime} </Text>
                </View>
                <View style={styles.serviceTimeContainer}>
                    {/* <Icon.Entypo name='dot-single' color={THEME.COLOR_BLACK} size={20} /> */}
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
        const { bookingList } = this.state
        const { userData } = this.props.user
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.nameContainer}>
                        <Image source={require('../../../assets/images/logo.png')} resizeMode='contain' style={styles.logoStyle} />
                        {<TouchableOpacity style={styles.exitContainer} onPress={() => onExit()}>
                            <View style={{}}>
                                <Avatar
                                    avatarStyle={styles.avatarStyle}
                                    source={{ uri: this.props.user.userData ? userData.profile_picture : "" }}
                                    rounded
                                    size={50} />
                            </View>
                        </TouchableOpacity>}
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.appointmentTextStyle}>My Appointments</Text>
                    </View>
                    <View style={styles.lowerListContainer}>
                        {
                            this.state.loading ?
                                <ActivityIndicator />
                                :
                                bookingList.length == 0 ?
                                    <>
                                        <View style={[styles.nameContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                                            <Calendar />
                                        </View>
                                        <Text style={[styles.appointmentTextStyle, { textAlign: 'center', marginHorizontal: '10%', marginTop: '10%' }]}>You have no appointments right now.</Text>
                                        <TouchableOpacity onPress={() => this.componentDidMount()}>
                                            <Text style={[styles.upperListTitleStyle, { fontSize: 12, color: THEME.COLOR_WHITE, textAlign: 'center', marginTop: '10%' }]}>Pull to refresh</Text>
                                            <View onPress={() => this.componentDidMount()} style={[styles.nameContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                                                <View style={{ marginLeft: '1%', paddingBottom: '1%' }} >
                                                    {/* <Icon.EvilIcons name="refresh" size={20} color={THEME.COLOR_WHITE} /> */}
                                                    <Refresh />
                                                </View>
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
                <Modal isVisible={this.props.user.modal}>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: '6%' }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={[{ marginTop: '10%', textAlign: 'center' }, styles.modalMainHeading]}>
                                    Health and Safety Commitment
                                </Text>
                                <Text style={[{ marginTop: '5%' }, styles.modalTextStyle]}>
                                    We will require clients & providers to sanitize their hands before undergoing any services.
                                    Customers experiencing flu-like symptoms will be required to reschedule until they are symptom-free. Providers have the right to refuse services for his or her own safety.
                                    Customers and/or providers may be asked to take a temperature reading before beginning the service to ensure your safety.
                                    If you or someone you are in close contact with are sick within 24 hours of your appointment, please reschedule immediately.
                                    ALL appointments must be rescheduled via the Fleek App along with submitting a medical Doctor’s note as confirmation to waive fees.
                                    We will help you reschedule your appointment at a later date.
                                    </Text>
                                <Text style={[{ marginTop: '5%' }, styles.modalMainHeading]}>
                                    Face Coverings
                                    </Text>
                                <Text style={styles.modalTextStyle}>
                                    You must have your mask or face covering on AT ALL TIMES during the appointment. Please be sure to have a well fitted mask that covers both your whole mouth and nose. This must be worn throughout the entire appointment.
                                    </Text>
                                <Text style={[{ marginTop: '5%', }, styles.modalMainHeading]}>
                                    Fleek Provider Duty
                                    </Text>
                                <Text style={styles.modalTextStyle} >
                                    As a safety percaution, all Fleek providers are required to:
                                    </Text>
                                <Text style={styles.modalTextStyle}>
                                    "Wear a face covering throughout the entire appointment."
                                    </Text>
                                <Text style={styles.modalTextStyle}>
                                    "Wear rubber gloves while conducting the service."
                                    </Text>
                                <Text style={styles.modalTextStyle}>
                                    "Maintain sanitary equipment for the health and safety of our customers"
                                    </Text>
                            </ScrollView>
                        </View>
                        <View style={{ paddingTop: '5%' }}>
                            <TouchableOpacity onPress={() => { this.props.authActions.healthAndSafety(false) }} style={{ backgroundColor: THEME.PRIMARY_COLOR, height: 50, borderRadius: 10, justifyContent: 'center' }}>
                                <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'Poppins-Medium' }} >Accept</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
        notificationActions: bindActionCreators(notificationActions, dispatch),
        authActions: bindActionCreators(authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarberHome)