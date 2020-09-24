
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
      startTime: '09:00 AM',
      endTime: '06:00 PM',
      difference: this.props.time,
      daysDate: [],
      daysName: [],
      other: true,
      isbooked: false,
      myBooking: false,
      slotArray: [],
      slots: [],
      bookingDate: '',
      modalVisible: false

    }

  }

  componentDidMount = () => {
    var date = new Date();
    this.GetDates(date, 7)

    const { startTime, endTime, difference } = this.state;
    var startDay = moment(startTime, 'hh:mm A');
    var endDay = moment(endTime, 'hh:mm A');
    if (endDay.isBefore(startDay)) {
      endDay.add(1, 'day');
    }
    let slotendingTime = moment(startTime, 'hh:mm A');


    var timeSlots = [];
    while (startDay < endDay) {
      timeSlots.push({ slot: `${new moment(startDay).format('hh:mm A')}`, isBooked: false });
      startDay.add(difference, 'minutes');
    }
    this.setState({ slots: timeSlots, });
  }

  DayAsString = (dayIndex) => {
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    return weekdays[dayIndex];
  }

  GetDates = (startDate, daysToAdd) => {
    var aryDates = [];
    var dayNameArr = [];

    for (var i = 0; i <= daysToAdd; i++) {
      var currentDate = new Date();
      currentDate.setDate(startDate.getDate() + i);
      dayNameArr.push(this.DayAsString(currentDate.getDay()))
      aryDates.push(currentDate.getDate());
    }
    this.setState({ daysDate: aryDates, daysName: dayNameArr })
  }

  handlePressDate = ({ item, index }) => {
    const { days } = this.state;
    days.map(element => {
      if (element.date === item.date) {
        element.isSelected = true;
      } else element.isSelected = false;
    });
    this.setState({ days });
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
          this.setState({ slots: items, bookedSlot: items[index] }, () => onBookingPress("false"));
        } else {
          items[index] = { ...items[index], isBooked: true };
          this.setState({ slots: items, bookedSlot: items[index] }, () => onBookingPress("false"));
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
    this.setState({ bookingDate: day.dateString, modalVisible: false })
  }

  render() {

    const { modalVisible, bookingDate } = this.state;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.lineStyle}></View>
          <TouchableOpacity onPress={() => this.setState({ modalVisible: true })/*this.handlePressDate({ item, index })*/} style={styles.rowContainer}>
            {
              bookingDate != "" ?
                <Text style={styles.textFlatlistStyle} >{"Your Appointment Date: " + moment(bookingDate).format('ll')}</Text>
                :
                <View style={styles.rowContainer}>
                  <Text style={styles.textFlatlistStyle} >Select a Date</Text>
                  <Icon.FontAwesome name="calendar" size={20} color={THEME.COLOR_WHITE} />
                </View>
            }
          </TouchableOpacity>

          {/* {
              this.state.days.map((item, index) => {
                return (
                  <View style={styles.dateRowContainer}>
                    {index == 0 ?
                      <Text style={item.isSelected ? styles.textStyle : styles.unSelectedText} >Today</Text>
                      :
                      <Text style={item.isSelected ? styles.textStyle : styles.unSelectedText}>
                        {item.dayName[0]}{item.dayName[1]}{item.dayName[2]}
                      </Text>}
                    <View style={styles.paddingTop}>
                      <TouchableOpacity onPress={() => this.handlePressDate({ item, index })}
                        style={item.isSelected ? styles.selectedDate : styles.unSelectedDate} >
                        <Text style={styles.textStyle} >{item.date}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })
            } */}
          <View style={styles.lineStyle}></View>

          <FlatList data={this.state.slots}
            keyExtractor={item => item}
            ItemSeparatorComponent={this.renderSeparator}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            renderItem={({ index, item }) => this._renderItems({ index, item })} />
          <View style={styles.lineStyle}></View>
          {/* <View style={styles.bookingRowContainer}>
            <TouchableOpacity
              onPress={() => this.setState({ myBooking: !this.state.myBooking })}
              style={this.state.myBooking ? styles.selected : styles.unSelected}>
            </TouchableOpacity>
            <View style={styles.justify}>
              <Text style={styles.textStyle} >My Booking</Text>
            </View>
            <TouchableOpacity onPress={() => this.setState({ other: !this.state.other })}
              style={this.state.other ? styles.selected : styles.unSelected}>
            </TouchableOpacity>
            <View style={styles.justify}>
              <Text style={styles.textStyle} >Other</Text>
            </View>
          </View> */}
          {/* <View style={styles.buttonContainer}>
            <Button title="Make Booking" onPress={() => this.setState({ bookingModal: true })}

            />
          </View> */}

        </View>
        {/* <BookingScrollSlot
          duration={(this.props.time)}
          onSubmit={(data) => this.handleOnSubmit(data)}
          showBookingSlot={bookingModal}
          onCancel={() => this.setState({ bookingModal: false })} /> */}
        <Modal visible={modalVisible} >
          <View style={{ backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR, height: screenHeight, width: screenWidth, justifyContent: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <Image source={require('../../assets/images/logo.png')} resizeMode="contain" style={{ height: screenHeight * 0.25, width: screenWidth * 0.6, }} />
            </View>
            <View style={{ marginHorizontal: '5%', justifyContent: "center" }}>
              <Calendar
                minDate={new Date()}
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

