import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight, ActivityIndicator } from 'react-native';
import { FooterButton, Icon } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
import { BookingServices } from '../../../services';
import moment from 'moment'
export default class CustomerServices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serviceList: [],
            timerStart: false,
            stopwatchStart: false,
            totalDuration: 90000,
            timerReset: false,
            stopwatchReset: false,
            totalTime: null,
            timeInHour: '',
            bookingDate: '',
            isCompleted: '0',
            isAccepted: '0',
            isStarted: '0',
            isArrived: '0'
        }
    }

    componentDidMount = () => {
        this.setState({ loading: true })
        let { userData } = this.props;
        BookingServices.getBookingDetails(userData)
            .then((res) => {
                if (res.data.status) {
                    this.setState({
                        isCompleted: res.data.booking_service_details.is_completed,
                        isArrived: res.data.booking_service_details.is_arrived,
                        isAccepted: res.data.booking_service_details.is_accepted,
                        isStarted: res.data.booking_service_details.is_started,
                        serviceList: res.data.booking_service_details.services,
                        totalPrice: res.data.booking_service_details.booking_price,
                        totalTime: res.data.booking_service_details.booking_time_duration,
                        bookingDate: res.data.booking_service_details.bookingDate
                    }, () => {
                        let time = parseInt(moment.duration(res.data.booking_service_details.booking_time_duration).asMinutes())
                        var h = time / 60 | 0;
                        var m = time % 60 | 0;
                        this.setState({ timeInHour: moment.utc().hours(h).minutes(m).format("HH:mm"), loading: false })
                    })
                }
            })
            .catch((err) => console.log(err))
    }



    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }



    _renderItems = (item) => {

        return (
            <>
                <View style={styles.row}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.textStyle}>{item.service_name}{item.quantity == '1' ? " (" + item.quantity + ")" : ""}</Text>
                    </View>
                    <View style={styles.priceContainer} >
                        <Text style={styles.timeTextStyle}>{(item.price * item.quantity)}$</Text>
                    </View>
                    <View style={styles.timeContainer}>
                        <View style={styles.priceAndTimeContainer}>
                            <Text style={styles.timeTextStyle}>{(parseInt(moment.duration(item.time_duration).asMinutes()) * item.quantity)}</Text>
                        </View>
                    </View>
                </View>
            </>
        )
    }



    render() {
        const { onApproved } = this.props;
        const { serviceList, totalPrice, totalTime, timeInHour, bookingDate, isAccepted, isArrived, isCompleted, isStarted } = this.state;
        const options = {
            container: {
                backgroundColor: THEME.PRIMARY_COLOR,
                padding: 5,
                borderRadius: 5,
                width: 220,
            },
            text: {
                fontSize: 30,
                color: '#FFF',
                textAlign: 'center'
            }
        };

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
                                <View style={{ marginBottom: '5%' }}>
                                </View>
                                <View style={styles.headingContainer}>
                                    <View style={styles.nameContainer}>
                                        <Text style={styles.headingTextStyle}>Services</Text>
                                    </View>
                                    <View style={styles.priceContainer} >
                                        <Text style={styles.headingTextStyle1}>Price</Text>
                                    </View>
                                    <View style={styles.timeContainer}>
                                        <Text style={styles.headingTextStyle1}>Est.Time</Text>
                                    </View>
                                </View>
                                <View style={styles.flatlistContainer}>
                                    {
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
                                                                    {timeInHour[0] == '0' && timeInHour[1] == '0' ? "" : " " + timeInHour[0] + timeInHour[1]}
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
                                    }
                                </View>
                                <View style={styles.timeAndAmountCotainer}>
                                    <View style={[styles.rowStyle, { marginTop: '5%' }]}>
                                        <Text style={styles.headingText}>Est Time for Service:</Text>
                                        <Text style={[styles.headingText, { color: THEME.PRIMARY_COLOR }]}>
                                            {timeInHour[0] == '0' && timeInHour[1] == '0' ? "" : " " + timeInHour[0] + timeInHour[1]}
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
                                        <Text style={styles.headingText}>Amount to be paid:</Text>
                                        <Text style={[styles.headingText, { color: THEME.PRIMARY_COLOR }]}> ${totalPrice}</Text>
                                    </View>
                                </View>

                                <View style={styles.stopwatchContainer}>
                                </View>
                            </View>
                            <FooterButton  disabled={isCompleted == '1' && isArrived == '1' && isStarted == '1' && isAccepted == '1'  ? false : true} title='Approve' onPress={() => onApproved(this.props.userData)} />
                        </View>}
            </>
        );
    }
}