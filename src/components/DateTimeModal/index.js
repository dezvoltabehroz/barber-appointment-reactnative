import React, { Component } from 'react';
import { View, Text, Modal, Dimensions, Alert } from 'react-native';
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
            pm: false,
            disabled: true
        }
    }

    componentDidMount = () => {
        this.hoursArray();
        this.minutesArray();
    }

    hoursArray = () => {
        let { dayNight } = this.props;
        var set = [];
        var range = 13;

        for (var i = 0; i < range; i++) {
            if (i <= 9) {
                set[i] = ("0" + i.toString());
            } else {
                set[i] = (i.toString());
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

    handleSet = () => {
        const { onSet, dayNight } = this.props;
        const { am, pm, hours, minutes } = this.state;

        if (dayNight) {
            if (am == true && pm == false) {
                var value = hours + ":" + "00" + " AM";
                if (hours == '' || hours == '00') {
                    Alert.alert("Attension", "Please select correct Hour")
                }
                else {
                    onSet(value);

                }
            }
            else {
                var value = hours + ":" + "00" + " PM";
                if (hours == '' || hours == '00') {
                    Alert.alert("Attension", "Please select correct Hour")
                }
                else {
                    onSet(value);

                }
            }
        } else {
            if ((hours !== '' && hours !== '00') || (minutes !== '' && minutes !== '00')) {
                var value = (hours == '' ? '00' : hours) + ":" + (minutes == '' ? '00' : minutes);
                onSet(value);
            } else {


            }

        }
        this.setState({ hours: '', minutes: '', am: true, pm: false, disabled: true })
    }

    handleHours = (data) => {
        this.setState({ hours: data, disabled: false })
    }

    handleMinutes = (data) => {
        this.setState({ minutes: data, disabled: false })
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
                                onValueChange={(data, selectedIndex) => {
                                    if (selectedIndex == 0 && data == '00') {
                                        this.setState({ disabled: true })
                                        this.handleHours(data)
                                    }
                                    else {
                                        this.setState({ disabled: false })
                                        this.handleHours(data)
                                    }
                                }}
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
                                        onValueChange={(data, selectedIndex) => {
                                            if (selectedIndex == 0 && data == '00') {
                                                this.setState({ disabled: true })
                                                this.handleMinutes(data)
                                            }
                                            else {
                                                this.setState({ disabled: data == '00' ? true : false })
                                                this.handleMinutes(data)
                                            }
                                        }}
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
                                <Button title='Cancel' onPress={() => { this.setState({ disabled: true }); onCancel(); }} />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button title='Set' disabled={dayNight ? this.state.disabled : this.state.disabled} onPress={this.handleSet} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}