import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FooterButton, Icon, DateTimeModal } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import COMMON_STYLE from '../../../assets/styles/common.style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Calendar } from 'react-native-calendars';

export default class ScheduleTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDays: [],
            showTimePicker: false,
            indexValue: '',
            item: '',
            val: '',
            submit: false
        }
    }

    componentDidMount = () => {
        let daysArray = this.props.data;
        this.setState({ selectedDays: daysArray })
    }

    setStartTime = (index, item) => {
        this.setState({ showTimePicker: true, indexValue: index, item: item, val: '1' })
    }

    setEndTime = (index, item) => {
        this.setState({ showTimePicker: true, indexValue: index, item: item, val: '0' })
    }

    setTimeChange = (data) => {
        const { val, selectedDays, indexValue, item } = this.state;
        if (val == '1') {
            selectedDays[indexValue].startTime = data;
        }
        else {
            selectedDays[indexValue].endTime = data;
        }
        const objIndex = this.state.selectedDays.findIndex((obj => obj.id == item.id));
        let items = [...this.state.selectedDays];
        if (val == '1') {
            items[objIndex] = { ...items[objIndex], startTime: selectedDays[indexValue].startTime = data };
            this.setState({ showTimePicker: false, selectedDays: items, indexValue: null, });
            this.is_filled_check(items, objIndex)
        }
        else {
            items[objIndex] = { ...items[objIndex], endTime: selectedDays[indexValue].endTime = data };
            this.setState({ showTimePicker: false, selectedDays: items, indexValue: null, });
            this.is_filled_check(items, objIndex)
        }

    }

    is_filled_check(dayArray, index) {
        if (dayArray[index].startTime != '' && dayArray[index].endTime != '') {
            let newDayCounter = dayArray[dayArray.length - 1].dayCounter + 1;
            dayArray[dayArray.length - 1] = { ...dayArray[dayArray.length - 1], dayCounter: newDayCounter };
            dayArray[index] = { ...dayArray[index], isFilled: '1' };
            this.setState({ selectedDays: dayArray });
        }
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    on_Press_Delete = (itemData, index) => {

        let selectedDays = [...this.state.selectedDays];
        let item = { ...selectedDays[index], startTime: '', endTime: '', isFilled: '' };
        selectedDays[index] = item;
        let newDayCounter = selectedDays[selectedDays.length - 1].dayCounter - 1;
        selectedDays[selectedDays.length - 1] = { ...selectedDays[selectedDays.length - 1], dayCounter: newDayCounter };
        this.setState({ selectedDays: selectedDays.filter((obj => obj.id != itemData.id)) })
    }

    on_Press_Edit = (index) => {
        let selectedDays = [...this.state.selectedDays];
        let item = { ...selectedDays[index], startTime: '', endTime: '', isFilled: '' };
        selectedDays[index] = item;
        let newDayCounter = selectedDays[selectedDays.length - 1].dayCounter - 1;
        selectedDays[selectedDays.length - 1] = { ...selectedDays[selectedDays.length - 1], dayCounter: newDayCounter };
        this.setState({ selectedDays });
    }

    _renderItems = ({ item, index }) => {
        const { selectedDays, submit } = this.state;
        return (
            <View style={styles.contentContainer}>
                <View style={styles.headingContainer}>
                    <View style={styles.dayContainer}>
                        <Text style={styles.textStyle}>{item.day}</Text>
                    </View>
                    <View style={styles.startTimeContainer} >
                        {
                            item.startTime != '' ?
                                <View style={styles.startTimeContainer}>
                                    <Text style={styles.textStyle}>{item.startTime}</Text>
                                </View>
                                :
                                null
                        }
                    </View>
                    <View style={styles.endTimeContainer}>
                        {
                            item.endTime != '' ?
                                <View style={styles.priceAndTimeContainer}>
                                    <Text style={styles.textStyle}>{item.endTime}</Text>
                                </View>
                                :
                                null
                        }
                    </View>
                    <View style={[styles.iconContainer, { alignItems: "flex-end" }]}>
                        {
                            item.isFilled == '1' ?
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <TouchableOpacity onPress={() => this.on_Press_Edit(index)} >
                                        <Icon.MaterialIcons name='edit' size={25} color={THEME.COLOR_WHITE} />
                                    </TouchableOpacity>
                                    <View style={{ width: 5 }}></View>
                                    <TouchableOpacity onPress={() => this.on_Press_Delete(item, index)}>
                                        <Icon.MaterialIcons name='delete' size={25} color={THEME.COLOR_WHITE} />
                                    </TouchableOpacity>
                                </View>
                                : null
                        }
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    {
                        item.startTime == '' ?
                            <View>
                                <TouchableOpacity onPress={() => this.setStartTime(index, item)} style={[styles.inputDateContainerStyle,
                                selectedDays[index].startTime == '' ? THEME.inputBorder : {}]}>
                                    <Text style={styles.titleStyle}>Start Time</Text>
                                </TouchableOpacity>
                                {
                                    submit && !selectedDays[index].startTime ? <Text style={COMMON_STYLE.errorText1}>Please fill this field</Text> : null
                                }
                            </View>

                            :
                            null
                    }
                    {
                        item.endTime == '' ?
                            <View>
                                <TouchableOpacity onPress={() => this.setEndTime(index, item)} style={[styles.inputDateContainerStyle,
                                selectedDays[index].endTime == '' ? THEME.inputBorder : {}]}>
                                    <Text style={styles.titleStyle}>End Time</Text>
                                </TouchableOpacity>
                                {
                                    submit && !selectedDays[index].startTime ? <Text style={COMMON_STYLE.errorText1}>Please fill this field</Text> : null
                                }
                            </View>
                            :
                            null
                    }
                </View>
            </View>
        )
    }

    on_Press_Next = () => {
        this.setState({ submit: true })
        const { onNext } = this.props;
        const { selectedDays } = this.state;
        let counter = (selectedDays[(selectedDays.length - 1)].dayCounter);
        let length = selectedDays.length - 1;

        if (counter === length) {
            onNext();
            this.setState({ submit: false })
        }
        else {
            Alert.alert('Attention', 'All required field should be filled ')
        }
    }


    render() {
        const { onNext } = this.props;
        const { selectedDays, showTimePicker, } = this.state;
        return (
            <>
                <View style={styles.container}>

                    <View style={styles.upperContainer}>
                        <KeyboardAwareScrollView>
                            {selectedDays.length == 0 || selectedDays[0].startTime != '' || selectedDays[0].endTime != '' ?
                                <View style={styles.headingContainer}>
                                    <View style={styles.dayContainer}>
                                        <Text style={styles.headingTextStyle}>Days</Text>
                                    </View>
                                    <View style={styles.startTimeContainer} >
                                        <Text style={styles.headingTextStyle}>Start Time</Text>
                                    </View>
                                    <View style={styles.endTimeContainer}>
                                        <Text style={styles.headingTextStyle}>End Time</Text>
                                    </View>
                                    <View style={[styles.iconContainer]}></View>
                                </View> : null}
                            <FlatList
                                data={selectedDays}
                                showsVerticalScrollIndicator={false}
                                ItemSeparatorComponent={this._renderSeparator}
                                renderItem={({ item, index }) => this._renderItems({ item, index })}
                                keyExtractor={item => item} />
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



                        </KeyboardAwareScrollView>
                    </View>
                    <FooterButton title='Update & Continue' onPress={this.on_Press_Next} />
                </View>
                <DateTimeModal showTimePicker={showTimePicker}
                    dayNight={true}
                    onCancel={() => this.setState({ showTimePicker: false })}
                    onSet={(time) => this.setTimeChange(time)} />
            </>
        );
    }
}