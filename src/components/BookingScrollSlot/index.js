import React, { Component } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import styles from './style'
import { DateTime, Button } from '..';
import THEME from '../../assets/styles/theme.style';
import moment from 'moment';
import ScrollPicker from 'react-native-picker-scrollview';

export default class BookingScrollSlot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startTime: '09:00 AM',
            endTime: '06:00 PM',
            difference: this.props.duration,
            slots: [],
            bookedSolt: '',
            selectedItem: 0,
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
        while (startDay < endDay) {
            timeSlots.push(`${new moment(startDay).format('hh:mm A')}`);
            startDay.add(difference, 'minutes');
        }
        this.setState({ slots: timeSlots, });
    }
    handleOnPress = () => {
        const { onSubmit } = this.props;
        onSubmit(this.state.bookedSolt)
    }

    render() {
        const { showBookingSlot, onCancel } = this.props;
        const { slots } = this.state;

        return (
            <>
                <Modal visible={showBookingSlot}
                    animationType="slide">
                    <View style={styles.modalContainer}  >
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingTextStyle}>Make a Booking</Text>
                        </View>
                        <View style={styles.modalInputContainer}>
                            <ScrollPicker
                                ref={(sp) => { this.sp = sp }}
                                dataSource={slots}
                                selectedIndex={0}
                                itemHeight={45}
                                wrapperHeight={180}
                                wrapperColor={THEME.PRIMARY_BACKGROUND_COLOR}
                                highlightColor={THEME.COLOR_WHITE}
                                renderItem={(data, index, isSelected) => {
                                    return (<Text style={styles.textFlatlistStyle}>{data}</Text>)
                                }}
                                onValueChange={(data, selectedIndex) => {
                                    this.setState({ bookedSolt: data })
                                    // console.log(data)
                                }}
                            />
                        </View>
                        <View style={styles.modalInputContainer}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={styles.rowButtonContainer}>
                                    <Button title="Cancel" onPress={onCancel} />
                                </View>
                                <View style={styles.rowButtonContainer}>
                                    <Button title="Submit" onPress={this.handleOnPress} />
                                </View>
                            </View>
                        </View>

                    </View>
                </Modal>
            </>
        )
    }
}