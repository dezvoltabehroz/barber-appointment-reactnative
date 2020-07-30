import React, { Component } from 'react';
import { Modal, View, Text, Dimensions } from 'react-native';
import styles from './style'
import { DateTime, Button } from '..';
import THEME from '../../assets/styles/theme.style';
import moment from 'moment';
import ScrollPicker from 'react-native-picker-scrollview';
const screenHeight = Dimensions.get('window').height;
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
    handleBookedSlots = (data) => {
        let { difference } = this.state;
        var day = moment(data, 'hh:mm A');
        var tempDay = moment(data, 'hh:mm A'); ;
        var slotTime = tempDay.add(difference, 'minutes');
        this.setState({ bookedSolt: `${new moment(day).format('hh:mm A')}` + " - " + `${new moment(slotTime).format('hh:mm A')}` })
        // console.log(data)
    }

    render() {
        const { showBookingSlot, onCancel } = this.props;
        const { slots, difference } = this.state;

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
                                itemHeight={60}
                                style={{ height: 40 }}
                                wrapperHeight={screenHeight < 600 ? screenHeight * 0.25 : screenHeight * 0.3}
                                wrapperColor={THEME.PRIMARY_BACKGROUND_COLOR}
                                highlightColor={THEME.COLOR_WHITE}
                                renderItem={(data, index, isSelected) => {
                                    return (<Text style={styles.textFlatlistStyle}>{data}</Text>)
                                }}
                                onValueChange={(data, selectedIndex) => this.handleBookedSlots(data)}
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