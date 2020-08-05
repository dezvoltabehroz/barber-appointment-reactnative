import React, { Component } from 'react';
import { View, Text, Modal, Dimensions } from 'react-native';
import { Button, Icon, RadioButton } from '../index';
import styles from './style';
import THEME from '../../assets/styles/theme.style';
import ScrollPicker from 'react-native-picker-scrollview';
const screenHeight = Dimensions.get('window').height;



export default class DateTimeModal extends Component {

    constructor(props) {
        super(props);
        this.inputRefs = [
            React.createRef(),
            React.createRef(),
            React.createRef(),
            React.createRef()
        ]
        this.state = {
            timeHourSlot: [],
            timeMinutesSlot: [],
            time: [],
            hours: '',
            minutes: '',
            timeStr: '',
            am: true,
            pm: false
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.hoursArray();
    }
    componentDidMount = () => {
        this.hoursArray();
        this.minutesArray();
    }
    hoursArray = () => {
        let { dayNight } = this.props;
        var set = [], range = dayNight ? 12 : 13;

        for (var i = 0; i < range; i++) {
            if (i < 9) {
                set[i] = ("0" + (dayNight ? (i + 1).toString() : i.toString()));
            } else {
                set[i] = (dayNight ? (i + 1).toString() : i.toString())
            }
        }
        this.setState({ timeHourSlot: set })
    }

    minutesArray = () => {
        var set = [], range = 60;

        for (var i = 0; i < range; i++) {
            if (i <= 9) {
                set[i] = ("0" + i.toString());
            } else {
                set[i] = i.toString()
            }
        }
        this.setState({ timeMinutesSlot: set })
    }

    handleKeyPress = (keyValue, index) => {
        if (keyValue === 'Backspace') {
            if (index === 0) {
                this.inputRefs[index].focus()
            } else {
                this.inputRefs[index - 1].focus()
            }
        } else {
            if (index < this.inputRefs.length - 1) {
                this.inputRefs[index + 1].focus()
            }
        }
    }

    handleChangeText = (value, index) => {
        const { time } = this.state;
        time[index] = value;
        var str = time.join('');
        var timeStr = '';
        if (str[0] != "undefined") {
            if (str[0] > 1) {
                alert("Invalid Hours")
            } else {
                timeStr = str[0];
            }
        }
        if (str[1] != "undefined") {
            if (str[0] == 1 && str[1] > 2) {
                alert("Invalid Hours")
            } else {
                timeStr = str[0] + str[1];
            }
        }
        if (str[2] != "undefined") {
            if (str[2] > 5) {
                alert("Invalid Minutes,")
            } else {
                timeStr = str[0] + str[1] + ":" + str[2] + str[3];

            }
        }
        this.setState({ timeStr });
    }

    handleSet = () => {
        const { onSet, dayNight } = this.props;
        const { am, pm, hours, minutes } = this.state;

        if (dayNight) {
            if (am == true && pm == false) {
                var value = hours + ":" + "00" + " AM";
                onSet(value);
            }
            else {
                var value = hours + ":" + "00" + " PM";
                onSet(value);
            }
        } else {
            var value = (hours == '' ? '00' : hours) + ":" + (minutes == '' ? '00' : minutes);
            onSet(value);
        }
        this.setState({ timeStr: '', hours: '', minutes: '', am: true, pm: false })
    }

    handleHours = (data) => {
        this.setState({ hours: data })
    }

    handleMinutes = (data) => {
        this.setState({ minutes: data })
    }

    render() {
        const { showTimePicker, onCancel, dayNight, } = this.props;
        const { am, pm, timeHourSlot, timeMinutesSlot } = this.state;
        return (
            <View style={styles.centeredView}>
                <Modal visible={showTimePicker}
                    animationType="slide"
                    transparent={true}>
                    <View style={styles.modalContainer}  >
                        < Text style={styles.modalText}>Set Time</Text>
                        <View style={[styles.modalInputContainerTwo, dayNight ? { width: 150, alignSelf: "center" } : styles.modalInputContainerTwo]}>
                            <ScrollPicker
                                ref={(sp) => { this.sp = sp }}
                                dataSource={timeHourSlot}
                                selectedIndex={0}
                                itemHeight={60}
                                style={{ height: 40 }}
                                wrapperHeight={screenHeight < 600 ? screenHeight * 0.25 : screenHeight * 0.3}
                                wrapperColor={THEME.PRIMARY_BACKGROUND_COLOR}
                                highlightColor={THEME.COLOR_WHITE}
                                renderItem={(data, index, isSelected) => {
                                    return (<Text style={styles.textFlatlistStyle}>{data}</Text>)
                                }}
                                onValueChange={(data, selectedIndex) => this.handleHours(data)}
                            />
                            {
                                dayNight ?
                                    null
                                    :
                                    < View style={styles.iconContainer}>
                                        <Icon.Entypo name="dots-two-vertical" color={THEME.COLOR_WHITE} size={THEME.ICON_SIZE} />
                                    </View>
                            }

                            {
                                dayNight ?
                                    null
                                    :
                                    <ScrollPicker
                                        ref={(sp) => { this.sp = sp }}
                                        dataSource={timeMinutesSlot}
                                        selectedIndex={0}
                                        itemHeight={60}
                                        style={{ height: 40 }}
                                        wrapperHeight={screenHeight < 600 ? screenHeight * 0.25 : screenHeight * 0.3}
                                        wrapperColor={THEME.PRIMARY_BACKGROUND_COLOR}
                                        highlightColor={THEME.COLOR_WHITE}
                                        renderItem={(data, index, isSelected) => {
                                            return (<Text style={styles.textFlatlistStyle}>{data}</Text>)
                                        }}
                                        onValueChange={(data, selectedIndex) => this.handleMinutes(data)}
                                    />
                            }

                        </View>
                        {
                            dayNight ?
                                <RadioButton
                                    option1={am}
                                    option2={pm}
                                    option1Text="AM"
                                    option2Text="PM"
                                    onPressOption1={() => this.setState({ am: true, pm: false })}
                                    onPressOption2={() => this.setState({ am: false, pm: true })} />
                                :
                                null
                        }

                        <View style={styles.row}>
                            <View style={styles.buttonContainer}>
                                <Button title='Cancel' onPress={onCancel} />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button title='Set' onPress={this.handleSet} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}