
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList, Modal, Dimensions, Image
} from 'react-native';
import { Button, BookingScrollSlot, Icon } from '..';
import styles from './style';
import { Calendar } from 'react-native-calendars'
import moment from 'moment';
import THEME from '../../assets/styles/theme.style';
import { Barbers } from '../../services';
import { ActivityIndicator } from 'react-native';
import Calender from "../../assets/svg/calender.svg";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default class BookAppointment extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      bookingModal: false,
      start_time: '',
      end_time: '',
      difference: this.props.time,
      daysDate: [],
      daysName: [],
      bookedSlot: {},
      other: true,
      isbooked: false,
      myBooking: false,
      slotArray: [],
      slots: [],
      availableSlots: [],
      barber_booking_list: [],
      bookingDate: moment().format('LL'),
      modalVisible: false,
      loading: true,

    }

  }

  componentDidMount = () => {
    this.setState({ loading: true })
    const { userdata } = this.props;
    let userData = {
      id: userdata.id,
      barber_id: userdata.barber_id,
      current_date: moment(this.state.bookingDate).format('YYYY-MM-DD'),
      day: moment(this.state.bookingDate).format('dddd'),
      slot_difference: this.props.time,
      token: userdata.token
    }
    Barbers.getBarberBooking(userData)
      .then((res) => {
        if (res.data.status) {
          this.setState({
            start_time: res.data.start_time,
            end_time: res.data.end_time,
            isSchedule: res.data.isSchedule,
            availableSlots: res.data.availableSlots,
            barber_booking_list: res.data.barber_booking_list,
            loading: false
          }, () => {
            const { start_time, end_time, difference } = this.state;
            if (res.data.isSchedule && res.data.barber_booking_list == 0 && res.data.availableSlots.length == 0) {
              var startTime = moment(start_time, 'hh:mm A');
              var endTime = moment(end_time, 'hh:mm A');
              if (endTime.isBefore(startTime)) {
                endTime.add(1, 'day');
              }
              var tempDay = moment(startTime, 'hh:mm A');
              var timeSlots = [];
              while (startTime < endTime) {
                var slotTime = tempDay.add(difference, 'minutes');
                timeSlots.push({ slotStartTime: `${new moment(startTime).format('hh:mm A')}`, slotEndTime: `${new moment(slotTime).format('hh:mm A')}`, isBooked: false });
                startTime.add(difference, 'minutes');
              }
              this.setState({ slots: timeSlots, });
            }
            else {
              this.setState({ slots: res.data.availableSlots })
            }
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleOnSubmit = (data) => {
    const { onBookingPress } = this.props;
    this.setState({ bookingModal: false })
    this.state.myBookings.push({ booking: data }),
      onBookingPress("false");

  }

  _renderItems = ({ index, item }) => {
    return (
      <TouchableOpacity onPress={() => {
        let time = moment(`${this.state.bookingDate} ${item.slotStartTime}`);
        let current = moment()//.add(6,'hours')
        console.log(time.isAfter(current))
        const { onBookingPress } = this.props;
        if (time > current) {
          let items = [...this.state.slots];
          for (var i = 0; i < items.length; i++) {
            if (items[i].isBooked) {
              items[i] = { ...items[i], isBooked: false };
            }
          }
          items[index] = { ...items[index], isBooked: true };
          this.setState({ slots: items, bookedSlot: items[index].slotStartTime }, () => {
            onBookingPress("false")
            this.props.bookingDate(this.state.bookingDate)
            this.props.bookingTime(this.state.bookedSlot)

          });
        }
        else {
          alert("You cannot select past time")
        }

      }} style={[styles.flatlistContainer, { backgroundColor: item.isBooked ? THEME.PRIMARY_COLOR : "#171717" }]}>
        <Text style={[styles.textFlatlistStyle, { color: item.isBooked ? "#171717" : THEME.PRIMARY_COLOR }]} >{item.slotStartTime}</Text>
      </TouchableOpacity>
    )
  }


  renderSeparator = () => {
    return (<View style={styles.gapHeight}></View>)
  }

  handleDayPress = (day) => {
    this.setState({ bookingDate: moment(day.dateString).format('ll'), modalVisible: false }, () => this.componentDidMount());
    // this.componentDidMount();
  }

  render() {

    const { modalVisible, bookingDate, isSchedule } = this.state;
    return (
      <>
        <View style={styles.container}>
          {/* <View style={styles.lineStyle}></View> */}
          <TouchableOpacity onPress={() => this.setState({ modalVisible: true })} style={styles.rowContainer}>
            <Calender height={60} width={60} />
          </TouchableOpacity>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.textDateStyle} >{moment(bookingDate).format('LL')}</Text>
          </View>

          {/* <View style={styles.lineStyle}></View> */}
          {
            this.state.loading ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>
              :
              !isSchedule ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 18, color: 'white', fontFamily: 'Poppins-Regular' }} >Barber is not working today</Text></View>
                :
                <FlatList data={this.state.slots}
                  keyExtractor={item => item}
                  ItemSeparatorComponent={this.renderSeparator}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.contentContainer}
                  renderItem={({ index, item }) => this._renderItems({ index, item })} />}
          <View style={styles.lineStyle}></View>
        </View>
        <Modal visible={modalVisible} >
          <View style={{ backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR, height: screenHeight, width: screenWidth, justifyContent: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <Image source={require('../../assets/images/logo.png')} resizeMode="contain" style={{ height: screenHeight * 0.25, width: screenWidth * 0.6, }} />
            </View>
            <View style={{ marginHorizontal: '5%', justifyContent: "center" }}>
              <Calendar
                minDate={new Date()}
                maxDate={new Date().setDate(new Date().getDate() + 30)}
                onDayPress={(day) => this.handleDayPress(day)}
                monthFormat={'MMMM yyyy'}
                theme={{
                  calendarBackground: THEME.PRIMARY_BACKGROUND_COLOR,
                  selectedDotColor: '#ffffff',
                  selectedDayBackgroundColor: '#D2A91B',
                  selectedDayTextColor: 'black',
                  dayTextColor: 'white',
                  textDisabledColor: 'grey',
                  dotColor: '#D2A91B',
                  todayTextColor: 'white',
                  arrowColor: THEME.PRIMARY_COLOR,
                  monthTextColor: 'white',
                  textDayFontFamily: "Poppins-Medium",
                  textMonthFontFamily: "Poppins-Medium",
                  textDayHeaderFontFamily: "Poppins-Medium",
                  textDayFontSize: 10,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 10,
                }}
              />
              <View style={{ marginVertical: '3%' }}>
                <Button title="Cancel" onPress={() => this.setState({ modalVisible: false })} />
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
};

