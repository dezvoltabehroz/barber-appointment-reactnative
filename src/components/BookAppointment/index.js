
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Button, BookingScrollSlot } from '..';
import styles from './style';

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
      daysDate: [],
      daysName: [],
      other: true,
      myBooking: false,
      slotArray: [],
      slots: [
        { "slot": "9:00am - 9:30am" },
        { "slot": "9:30am - 10:00am" },
        { "slot": "10:00am - 11:00am" },
        { "slot": "11:00am - 11:30am" },
        { "slot": "11:30am - 12:00pm" },
        { "slot": "12:00pm - 12:30pm" },
        { "slot": "1:00pm - 01:30pm" },
        { "slot": "01:30pm - 02:00pm" },
        { "slot": "02:00pm - 02:30pm" },
        { "slot": "02:30pm - 03:00pm" },
        { "slot": "03:00pm - 03:30pm" },
        { "slot": "03:30pm - 04:00pm" },
        { "slot": "04:00pm - 04:30pm" },
        { "slot": "04:30pm - 05:00pm" },
      ],
      myBookings: [
        { "booking": "10:30am - 11:00am" },
        { "booking": "12:30pm - 01:00pm" },
        { "booking": "01:30pm - 02:00pm" },
      ],
    }

  }

  componentDidMount = () => {
    var date = new Date();
    this.GetDates(date, 7)
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
      <TouchableOpacity style={styles.flatlistContainer}>
        <Text style={styles.textFlatlistStyle} >{item.slot}</Text>
      </TouchableOpacity>
    )
  }

  _renderBookingItems = ({ index, item }) => {
    return (
      <TouchableOpacity style={styles.flatlistContainer}>
        <Text style={styles.textFlatlistStyle} >{item.booking}</Text>
      </TouchableOpacity >
    )
  }

  renderSeparator = () => {
    return (<View style={styles.gapHeight}></View>)
  }

  render() {

    const { bookingModal } = this.state;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.lineStyle}></View>
          <View style={styles.rowContainer}>

            {
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
            }
          </View>
          <View style={styles.lineStyle}></View>
          {
            this.state.myBooking ?
              <FlatList data={this.state.myBookings}
                keyExtractor={item => item}
                ItemSeparatorComponent={this.renderSeparator}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                renderItem={({ index, item }) => this._renderBookingItems({ index, item })} />
              :
              <FlatList data={this.state.slots}
                keyExtractor={item => item}
                ItemSeparatorComponent={this.renderSeparator}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                renderItem={({ index, item }) => this._renderItems({ index, item })} />
          }
          <View style={styles.lineStyle}></View>
          <View style={styles.bookingRowContainer}>
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
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Make Booking" onPress={() => this.setState({ bookingModal: true })}

            />
          </View>

        </View>
        <BookingScrollSlot
          duration={(this.props.time)}
          onSubmit={(data) => this.handleOnSubmit(data)}
          showBookingSlot={bookingModal}
          onCancel={() => this.setState({ bookingModal: false })} />
      </>
    );
  }
};

