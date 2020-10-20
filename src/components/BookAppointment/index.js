
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
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default class BookAppointment extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      bookingModal: false,
      days: [
        {
          dayName: 'Thursday',
          date: '23',
          isSelected: true,
        },
        {
          dayName: 'Friday',
          date: '24',
          isSelected: false,
        },
        {
          dayName: 'Saturday',
          date: '25',
          isSelected: false,
        },
        {
          dayName: 'Sunday',
          date: '26',
          isSelected: false,
        },
        {
          dayName: 'Monday',
          date: '27',
          isSelected: false,
        },
        {
          dayName: 'Tuesday',
          date: '28',
          isSelected: false,
        },
        {
          dayName: 'Wednesday',
          date: '29',
          isSelected: false,
        },
      ],
      startTime: '09:00:00',
      endTime: '18:00:00',
      difference: this.props.time,
      daysDate: [],
      daysName: [],
      bookedSlot: '',
      other: true,
      isbooked: false,
      myBooking: false,
      slotArray: [],
      slots: [],
      bookingDate: moment().format('LL'),
      modalVisible: false,

    }

  }

  componentDidMount = () => {
    var date = new Date();
    const { startTime, endTime, difference } = this.state;
    var startDay = moment(startTime, 'hh:mm A');
    var endDay = moment(endTime, 'hh:mm A');
    if (endDay.isBefore(startDay)) {
      endDay.add(1, 'day');
    }
    let barberBookingList = ['14:00:00', '15:00:00']
    var tempDay = moment(startTime, 'hh:mm A');
    var timeSlots = [];
    while (startDay < endDay) {
      var slotTime = tempDay.add(difference, 'minutes');
      timeSlots.push({ slotStartTime: `${new moment(startDay, 'hh:mm A')}`, slotEndTime: `${new moment(slotTime, 'hh:mm A')}`, isBooked: false });
      startDay.add(difference, 'minutes');
    }
    let slotArray = [];
    for (let i = 0; i <= barberBookingList.length - 1; i++) {
      timeSlots.forEach((element, index) => {
        if (moment(barberBookingList[i], 'hh:mm A') >= element.slotStartTime && moment(barberBookingList[i], 'hh:mm A') <= element.slotEndTime) { }
        else {
          if (i == barberBookingList.length - 1) {
            slotArray.push({ slot: moment(parseInt(element.slotStartTime)).format('hh:mm A'), isBooked: false });
          }
        }
      })
    }
    this.setState({ slots: slotArray, });
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
        const { onBookingPress } = this.props;
        let items = [...this.state.slots];
        if (items[index].isBooked) {
          items[index] = { ...items[index], isBooked: false };
          this.setState({ slots: items, bookedSlot: items[index] }, () => {
            onBookingPress("false")
            this.props.bookingDate(this.state.bookingDate)

          });
        } else {
          items[index] = { ...items[index], isBooked: true };
          this.setState({ slots: items, bookedSlot: items[index].slot }, () => {
            onBookingPress("false")
            this.props.bookingDate(this.state.bookingDate)
            this.props.bookingTime(this.state.bookedSlot)

          });
        }
      }} style={[styles.flatlistContainer, { backgroundColor: item.isBooked ? THEME.COLOR_GREY : THEME.PRIMARY_COLOR }]}>
        <Text style={styles.textFlatlistStyle} >{item.slot}</Text>
      </TouchableOpacity>
    )
  }


  renderSeparator = () => {
    return (<View style={styles.gapHeight}></View>)
  }

  handleDayPress = (day) => {
    this.setState({ bookingDate: moment(day.dateString).format('ll'), modalVisible: false });

  }

  render() {

    const { modalVisible, bookingDate } = this.state;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.lineStyle}></View>
          <TouchableOpacity onPress={() => this.setState({ modalVisible: true })} style={styles.rowContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.textFlatlistStyle} >{moment(bookingDate).format('LL')}</Text>
              <Icon.FontAwesome name="calendar" size={20} color={THEME.COLOR_WHITE} />
            </View>
          </TouchableOpacity>
          <View style={styles.lineStyle}></View>
          <FlatList data={this.state.slots}
            keyExtractor={item => item}
            ItemSeparatorComponent={this.renderSeparator}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            renderItem={({ index, item }) => this._renderItems({ index, item })} />
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

