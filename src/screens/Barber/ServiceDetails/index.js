import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, } from 'react-native';
import { FooterButton, Icon } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import { connect } from 'react-redux'
import moment from 'moment'
import { BookingServices } from '../../../services';
class ServiceDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            serviceList: [],
            totalTime: null,
            timeInHour: '',
            totalPrice: '',
            loading: false,
            bookingStartingTime: '',
            bookingEndingTime: '',
            bookingDate: '2020-12-10'
        }
    }
    componentDidMount = () => {
        this.setState({ loading: true })
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            barber_id: this.props.user.userData.id,
            booking_id: this.props.bookingId
        }
        let userdata = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            type: this.props.user.userData.type,
            booking_id: this.props.bookingId
        }
        BookingServices.getBookingDetails(userData)
            .then((res) => {
                if (res.data.status) {
                    this.setState({
                        serviceList: res.data.booking_service_details.services,
                        totalPrice: res.data.booking_service_details.booking_price,
                        totalTime: res.data.booking_service_details.booking_time_duration,
                        bookingDate: res.data.booking_service_details.booking_date,
                        stepCounter: res.data.booking_service_details.stepCounter,
                        customerId: res.data.booking_service_details.customer_id
                    }, () => {
                        let time = parseInt(moment.duration(res.data.booking_service_details.booking_time_duration).asMinutes())
                        var h = time / 60 | 0;
                        var m = time % 60 | 0;
                        this.setState({ timeInHour: moment.utc().hours(h).minutes(m).format("HH:mm"), })
                    })
                }
            })
            .catch((err) => console.log(err))
        BookingServices.getBookingTiming(userdata)
            .then((res) => {
                if (res.data.status) {
                    if (this.props.notification) {
                        this.setState({
                            bookingEndingTime: '',
                            bookingStartingTime: '',
                            loading: false
                        })
                    } else {
                        if (res.data.timeData.length != 0) {
                            this.setState({
                                bookingEndingTime: res.data.timeData[0].ending_time,
                                bookingStartingTime: res.data.timeData[0].starting_time,
                                loading: false
                            })
                        }
                        else {
                            this.setState({
                                bookingEndingTime: '',
                                bookingStartingTime: '',
                                loading: false
                            })
                        }
                    }

                }
            })
            .catch((err) => console.log(err))

    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    _renderItems = ({ item, index }) => {
        return (
            <View style={styles.row}>
                <View style={styles.nameContainer}>
                    <Text style={styles.textStyle}>{item.serviceName}</Text>
                </View>
                <View style={styles.priceContainer} >
                    <Text style={styles.timeTextStyle}>${item.price}</Text>
                </View>
                <View style={styles.timeContainer}>
                    <View style={styles.priceAndTimeContainer}>
                        <Text style={styles.timeTextStyle}>00:{item.time}</Text>
                    </View>
                </View>
            </View>
        )
    }



    render() {
        const { onPayment, history, cancelled } = this.props;
        const { serviceList, timeInHour, totalPrice, stepCounter, bookingEndingTime, bookingStartingTime, bookingDate,customerId } = this.state;

        return (
            <>
                {
                    this.state.loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR }} >
                            <ActivityIndicator />
                        </View>
                        :
                        <View style={styles.container}>
                            <View style={styles.upperContainer}>
                                <View style={styles.headingContainer}>
                                    <View style={styles.nameContainer}>
                                        <Text style={styles.headingTextStyle}>Services</Text>
                                    </View>
                                    <View style={styles.priceContainer} >
                                        <Text style={styles.headingTextStyle1}>Price</Text>
                                    </View>
                                    <View style={styles.timeContainer}>
                                        <Text style={styles.headingTextStyle1}>Est. Duration</Text>
                                    </View>
                                </View>
                                <View style={styles.flatlistContainer}>
                                    {
                                        serviceList != undefined ?
                                            serviceList.map((item) => {
                                                let time = (parseInt(moment.duration(item.time_duration).asMinutes()) * item.quantity)
                                                var h = time / 60 | 0;
                                                var m = time % 60 | 0;
                                                let timeInHour = moment.utc().hours(h).minutes(m).format("HH:mm");

                                                return (
                                                    <>
                                                        <View style={styles.row}>
                                                            <View style={styles.nameContainer}>
                                                                <Text style={styles.textStyle}>{item.service_name}{item.quantity == '1' ? "" : ` (${item.quantity})`}</Text>
                                                            </View>
                                                            <View style={styles.priceContainer} >
                                                                <Text style={styles.timeTextStyle}>${(item.price * item.quantity)}</Text>
                                                            </View>
                                                            <View style={styles.timeContainer}>
                                                                <View style={styles.priceAndTimeContainer}>
                                                                    <Text style={styles.timeTextStyle}>
                                                                        {timeInHour[0] == '0' && timeInHour[1] == '0' ? "" : " " + timeInHour[1]}
                                                                        {
                                                                            timeInHour[0] == '0' && timeInHour[1] == '0' ?
                                                                                null
                                                                                :
                                                                                <Text style={styles.textStyles}> hr</Text>
                                                                        }
                                                                        {timeInHour[3] == 0 && timeInHour[4] == 0 ? "" : ` ${timeInHour[3]}${timeInHour[4]}`}
                                                                        {
                                                                            timeInHour[3] == 0 && timeInHour[4] == 0 ?
                                                                                null
                                                                                :
                                                                                <Text style={styles.textStyles}> mins</Text>
                                                                        }
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <View style={styles.seperatorStyle}></View>
                                                    </>
                                                )
                                            })
                                            :
                                            null
                                    }
                                </View>
                                <View style={styles.timeAndAmountCotainer}>
                                    <View style={[styles.rowStyle, { marginTop: '5%' }]}>
                                        <Text style={styles.headingText}>Total Time of Service:</Text>
                                        <Text style={[styles.headingText, { color: THEME.PRIMARY_COLOR }]}>
                                            {timeInHour[0] == '0' && timeInHour[1] == '0' ? "" : "  " + timeInHour[1]}
                                            {
                                                timeInHour[0] == '0' && timeInHour[1] == '0' ?
                                                    null
                                                    :
                                                    <Text style={styles.textStyles}> hr</Text>
                                            }
                                            {timeInHour[3] == 0 && timeInHour[4] == 0 ? "" : ` ${timeInHour[3]}${timeInHour[4]}`}
                                            {
                                                timeInHour[3] == 0 && timeInHour[4] == 0 ?
                                                    null
                                                    :
                                                    <Text style={styles.textStyles}> mins</Text>
                                            }
                                        </Text>
                                    </View>
                                    <View style={styles.rowStyle}>
                                        <Text style={styles.headingText}>Total Amount of Service:</Text>
                                        <Text style={[styles.headingText, { color: THEME.PRIMARY_COLOR }]}> ${totalPrice}</Text>
                                    </View>
                                    {
                                        this.props.notification ?
                                            <View style={styles.rowStyle}>
                                                <Text style={styles.headingText}>Booking Date:</Text>
                                                <Text style={[styles.headingText, { color: THEME.PRIMARY_COLOR }]}> {moment(bookingDate).format('Do MMM YYYY')}</Text>
                                            </View>
                                            :
                                            null
                                    }
                                </View>
                                {
                                    stepCounter == 0 ?
                                        null
                                        : bookingEndingTime == '' && bookingStartingTime == '' ?
                                            null
                                            :
                                            <View style={styles.borderStyle}>

                                                <View style={styles.rowStyle}>
                                                    {/* <Icon.Entypo name='dot-single' color={THEME.COLOR_WHITE} size={20} /> */}
                                                    <Text style={styles.headingText}>Service Start Time:</Text>
                                                    <Text style={[styles.headingText, { color: THEME.PRIMARY_COLOR }]}>  {moment(bookingStartingTime).format('hh:mm A')}</Text>
                                                </View>
                                                <View style={styles.rowStyle}>
                                                    {/* <Icon.Entypo name='dot-single' color={THEME.COLOR_WHITE} size={20} /> */}
                                                    <Text style={styles.headingText}>Service End Time:</Text>
                                                    <Text style={[styles.headingText, { color: THEME.PRIMARY_COLOR }]}>  {moment(bookingEndingTime).format('hh:mm A')}</Text>
                                                </View>
                                            </View>
                                }

                            </View>
                            {
                                history ?
                                    null
                                    :
                                    <FooterButton disabled={stepCounter == 6 ? false : true} title={'Done'} onPress={() => onPayment(totalPrice,customerId)} />
                            }

                        </View>
                }
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(ServiceDetails)