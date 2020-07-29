import React, { Component } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import styles from './style'
import { DateTime, Button } from '..';
import THEME from '../../assets/styles/theme.style';
import moment from 'moment';

export default class BookingScrollSlot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: '09:00 AM',
            endTime: '06:00 PM',
            difference: 30,
            slots: [],
            bookingTime: null,
            showTimePicker: false
        };
    }

    componentDidMount = () => {
        const { startTime, endTime, difference } = this.state;
        var startDay = moment(startTime, 'hh:mm A');
        var endDay = moment(endTime, 'hh:mm A');

        if (endDay.isBefore(startDay)) {
            endDay.add(1, 'day');
        }

        var timeSlots = [];
        let day = moment(startTime, 'hh:mm A');
        console.log(day)
        while (startDay < endDay) {
            day.add(difference, 'minutes');
            timeSlots.push(`${new moment(startDay).format('hh:mm A')} - ${new moment(day).format('hh:mm A')}`);
            startDay.add(difference, 'minutes');
        }
        this.setState({ slots: timeSlots, });


    }


    renderSeparator = () => {
        return (<View style={styles.gapHeight}></View>)
    }

    _renderItems = ({ index, item }) => {
        return (
            <TouchableOpacity style={styles.flatlistContainer}>
                <Text style={styles.textFlatlistStyle} >{item}</Text>
            </TouchableOpacity>
        )
    }
    onChangeTime = (event, selectedDate) => {
        var time = selectedDate.getHours();
        time += ":";
        time += (selectedDate.getMinutes());
        // time += ":";
        // time += (selectedDate.getSeconds());
        this.setState({
            bookingTime,
            showTimePicker: false
        }, () => {
            console.log(this.state.bookingTime)
        })
    };

    render() {
        const { showBookingSlot, onCancel } = this.props;
        const { slots, showTimePicker } = this.state;

        return (
            <>
                <Modal visible={showBookingSlot}
                    animationType="slide">
                    <View style={styles.modalContainer}  >
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingTextStyle}>Make a Booking</Text>
                        </View>
                        <View style={styles.modalInputContainer}>
                            {/* <FlatList
                                data={slots}
                                keyExtractor={item => item}
                                ItemSeparatorComponent={this.renderSeparator}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ index, item }) => this._renderItems({ index, item })}
                            /> */}

                            {/* {
                                showTimePicker == false ?
                                    setTimeout(() => {
                                        this.setState({ showTimePicker: true });
                                    }, 3000)
                                    :
                                    null
                            } */}
                            {
                                showTimePicker ?
                                    <View>
                                        <DateTime onChangeDate={this.onChangeTime} />
                                    </View>
                                    :
                                    null
                            }
                        </View>
                        <View style={styles.modalInputContainer}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={styles.rowButtonContainer}>
                                    <Button title="Cancel" onPress={onCancel} />
                                </View>
                                <View style={styles.rowButtonContainer}>
                                    <Button title="Submit" onPress={this.getTimeSlots} />
                                </View>
                            </View>
                        </View>

                    </View>
                </Modal>

            </>
        )
    }
}