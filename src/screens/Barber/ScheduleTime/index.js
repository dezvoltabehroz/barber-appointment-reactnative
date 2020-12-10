import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import { FooterButton, Button, Icon, DateTimeModal } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import COMMON_STYLE from '../../../assets/styles/common.style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Calendar } from 'react-native-calendars';
import { Barbers, RegisterUser } from '../../../services';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../../redux/actions/auth';
class ScheduleTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDays: [],
            showTimePicker: false,
            indexValue: '',
            item: null,
            val: '',
            submit: false,
            loading: false,
            buttonLoading: false,
            startTime: '',
            endTime: '',
            showEditService: false
        }
    }

    componentDidMount = () => {
        this.setState({ loading: true, });
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token
        }
        Barbers.getBarberWorkingDays(userData)
            .then((res) => {
                if (res.data.status) {
                    let myArray = [...res.data.data]
                    myArray.map((item, index) => {
                        myArray[index] = { ...myArray[index], isFilled: '0', startTime: '', endTime: '', }
                    });
                    myArray.push({ dayCounter: 0 })
                    this.setState({ selectedDays: myArray, loading: false })
                }
            })
    }

    setStartTime = (index, item) => {
        this.setState({ showTimePicker: true, indexValue: index, index: index, item: item, val: '1' })
    }

    setEndTime = (index, item) => {
        this.setState({ showTimePicker: true, indexValue: index, index: index, item: item, val: '0' })
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
    setEditTimeChange = (item, index) => {
        const objIndex = this.state.selectedDays.findIndex((obj => obj.id == item.id));
        let items = [...this.state.selectedDays];
        items[objIndex] = { ...items[objIndex], startTime: this.state.startTime, endTime: this.state.endTime };
        this.setState({ showTimePicker: false, selectedDays: items, indexValue: null, showEditService: false });
        this.is_filled_check(items, objIndex)
    }
    
    is_filled_check(dayArray, index) {
        if (dayArray[index].startTime != '' && dayArray[index].endTime != '') {
            let newDayCounter = dayArray[dayArray.length - 1].dayCounter + 1;
            dayArray[dayArray.length - 1] = { ...dayArray[dayArray.length - 1], dayCounter: newDayCounter };
            dayArray[index] = { ...dayArray[index], isFilled: '1' };
            this.setState({ selectedDays: dayArray, startTime: '', endTime: '', });
        }
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }
    on_Press_Delete = (itemData, index) => {
        Alert.alert('Attension', 'Are you sure you want to delete service',
            [
                {
                    text: "Cancel",
                    // onPress: () => this.handleCancel(),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.handleDeleteService(itemData) }
            ],

        );
    }

    handleDeleteService = (itemData) => {
        this.setState({ loading: true })
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            schedule_id: itemData.id
        }
        Barbers.deleteBarberWorkingDay(userData)
            .then((res) => {
                if (res.data.status) {
                    let selectedDays = [...this.state.selectedDays];
                    let newDayCounter = selectedDays[selectedDays.length - 1].dayCounter - 1;
                    selectedDays[selectedDays.length - 1] = { ...selectedDays[selectedDays.length - 1], dayCounter: newDayCounter };
                    this.setState({ selectedDays: selectedDays.filter((obj => obj.id != itemData.id)), loading: false })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    on_Press_Edit = (item, index) => {
        let selectedDays = [...this.state.selectedDays];
        this.setState({ item, index, })
        let newDayCounter = selectedDays[selectedDays.length - 1].dayCounter - 1;
        selectedDays[selectedDays.length - 1] = { ...selectedDays[selectedDays.length - 1], dayCounter: newDayCounter };
        this.setState({ selectedDays });
        this.setState({ showEditService: true, startTime: selectedDays[index].startTime, endTime: selectedDays[index].endTime })
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
                                    <TouchableOpacity onPress={() => this.on_Press_Edit(item, index)} >
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
                    <View style={styles.viewDatePlaceHolder}></View>
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
        this.setState({ submit: true, buttonLoading: true })
        const { onNext } = this.props;
        let days = [];
        const { selectedDays } = this.state;
        let counter = (selectedDays[(selectedDays.length - 1)].dayCounter);
        let length = selectedDays.length - 1;

        if (counter === length) {
            // onNext();
            selectedDays.forEach((item, index) => {
                days.push({
                    schedule_id: item.id,
                    start_time: item.startTime,
                    end_time: item.endTime
                })
            })
            let userData = {
                id: this.props.user.userData.id,
                token: this.props.user.userData.token,
                steps_count: 4,
                working_days: days
            }
            Barbers.updateWorkingDaysTime(userData)
                .then((res) => {
                    console.log(res.data)
                    if (res.data.status) {
                        RegisterUser.userStepCount(userData)
                            .then((res) => {
                                if (res.data.status) {
                                    this.props.authActions.getUserProfile(userData, this.props.navigate);
                                    this.setState({ buttonLoading: false })
                                }
                            })
                            .catch(err => console.log(err))
                    }
                })
                .catch((err) => console.log(err))
            this.setState({ submit: false })
        }
        else {
            Alert.alert('Attention', 'All required field should be filled ')
        }
    }


    render() {
        const { onNext } = this.props;
        const { selectedDays, showTimePicker, loading, buttonLoading, startTime, index, endTime, submit, showEditService, item, indexValue } = this.state;
        return (
            <>
                <View style={styles.container}>
                    {
                        loading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator />
                            </View>
                            :
                            <View style={styles.upperContainer}>
                                <KeyboardAwareScrollView>
                                    {selectedDays.length == 0 || selectedDays[0].startTime != '' || selectedDays[0].endTime != '' ?
                                        <View style={styles.headingContainer}>
                                            <View style={styles.dayContainer}>
                                                <Text style={styles.headingTextStyle}>Days</Text>
                                            </View>
                                            <View style={styles.startTimeContainer} >
                                                <Text style={styles.headingTextStyle1}>Start Time</Text>
                                            </View>
                                            <View style={styles.endTimeContainer}>
                                                <Text style={styles.headingTextStyle1}>End Time</Text>
                                            </View>
                                            <View style={[styles.iconContainer]}></View>
                                        </View> : null}
                                    <FlatList
                                        data={selectedDays}
                                        showsVerticalScrollIndicator={false}
                                        ItemSeparatorComponent={this._renderSeparator}
                                        renderItem={({ item, index }) => this._renderItems({ item, index })}
                                        keyExtractor={item => item} />
                                    {/* <Calendar
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
                            /> */}



                                </KeyboardAwareScrollView>
                            </View>}
                    <FooterButton loading={buttonLoading} title='Update & Continue' onPress={this.on_Press_Next} />
                </View>
                <DateTimeModal showTimePicker={showTimePicker}
                    dayNight={true}
                    onCancel={() => this.setState({ showTimePicker: false })}
                    onSet={(time) => { this.state.startTime != "" && this.state.endTime != "" ? this.state.val == '1' ? this.setState({ startTime: time, showTimePicker: false }) : this.setState({ endTime: time, showTimePicker: false }) : this.setTimeChange(time) }} />
                <Modal visible={showEditService}
                    animationType="slide">
                    {
                        item == null || index == null ?
                            null
                            :
                            <View style={styles.modalContainer}  >
                                <View style={styles.modalInputContainer}>
                                    <View style={styles.headingContainer}>
                                        <Text style={styles.headingTextStyle}>Update a Time</Text>
                                    </View>

                                    <View>
                                        <TouchableOpacity onPress={() => this.setStartTime(index, item)} style={[styles.inputModalContainerStyle,
                                        startTime == '' ? THEME.inputBorder : {}]}>
                                            <View style={{ marginLeft: '3.5%' }}>
                                                <Text style={styles.titleStyle}>Start Time</Text>
                                                <Text style={{ fontFamily: 'Poppins-Medium' }}>{startTime}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        {
                                            submit && !startTime == '' ? <Text style={COMMON_STYLE.errorText1}>Please select time</Text> : null
                                        }
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={() => this.setEndTime(index, item)} style={[styles.inputModalContainerStyle,
                                        endTime == '' ? THEME.inputBorder : {}]}>
                                            <View style={{ marginLeft: '3.5%' }}>
                                                <Text style={styles.titleStyle}>End Time</Text>
                                                <Text style={{ fontFamily: 'Poppins-Medium' }}>{endTime}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        {
                                            submit && !endTime == '' ? <Text style={COMMON_STYLE.errorText1}>Please select time</Text> : null
                                        }
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={styles.rowButtonContainer}>
                                            <Button title="Cancel" onPress={() => this.setState({ showEditService: false })} />
                                        </View>
                                        <View style={styles.rowButtonContainer}>
                                            <Button title="Update" onPress={() => this.setEditTimeChange(item, index)} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                    }
                </Modal>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {},
        category: state.categoryReducer || {}
    };
};
const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTime)