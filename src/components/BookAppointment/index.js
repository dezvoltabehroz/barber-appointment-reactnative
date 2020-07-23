
import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Button } from '..';
import styles from './style';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width)
const jsonData = {
  "slots": [
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
  "myBookings": [
    { "booking": "10:30am - 11:00am" },
    { "booking": "12:30pm - 01:00pm" },
    { "booking": "01:30pm - 02:00pm" },
  ],
}

export default class BookAppointment extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
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
      slotArray: []
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
      aryDates.push(dayDate = currentDate.getDate());
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
                    <View style={{ marginVertical: "10%" }}>
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
              <FlatList data={jsonData.myBookings}
                keyExtractor={item => item}
                ItemSeparatorComponent={this.renderSeparator}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                renderItem={({ index, item }) => this._renderBookingItems({ index, item })} />

              :
              <FlatList data={jsonData.slots}
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
              onPress={() => this.setState({ myBooking: true, other: false })}
              style={this.state.myBooking ? styles.selected : styles.unSelected}>
            </TouchableOpacity>
            <View style={styles.justify}>
              <Text style={styles.textStyle} >My Booking</Text>
            </View>
            <TouchableOpacity onPress={() => this.setState({ myBooking: false, other: true })}
              style={this.state.other ? styles.selected : styles.unSelected}>
            </TouchableOpacity>
            <View style={styles.justify}>
              <Text style={styles.textStyle} >Other</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Book" onPress={() => alert('Your Booking is in progress')} />

          </View>
        </View>

      </>
    );
  }
};

