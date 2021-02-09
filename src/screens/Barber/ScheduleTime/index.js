import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import { FooterButton, Button, Icon, DateTimeModal } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import COMMON_STYLE from '../../../assets/styles/common.style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Calendar } from 'react-native-calendars';
import { Barbers, RegisterUser, SchedulerServices } from '../../../services';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../../redux/actions/auth';
import moment from 'moment';
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
        this.setState({ loading: true })
        let selectedDay = [...this.props.data];
        let length = 0;
        selectedDay.forEach(element => {
            if (element.isFilled == '1') {
                length = length + 1;
            }

        });
        selectedDay.push({ dayCounter: length })
        this.setState({ selectedDays: selectedDay, loading: false })

    }

    setStartTime = (index, item) => {
        this.setState({ showEditService: false, showTimePicker: true, indexValue: index, index: index, item: item, val: '1' })
    }

    setEndTime = (index, item) => {
        this.setState({ showEditService: false, showTimePicker: true, indexValue: index, index: index, item: item, val: '0' })
    }

    setTimeChange = async (data) => {
        console.log('data:', data)
        const { val, selectedDays, indexValue, item } = this.state;
        // if (val == '1') {
        //     selectedDays[indexValue].startTime = data;
        // }
        // else {
        //     selectedDays[indexValue].endTime = data;
        // }
        const objIndex = this.state.selectedDays.findIndex((obj => obj.id == item.id));
        let items = [...this.state.selectedDays];
        if (val == '1') {
            items[objIndex] = { ...items[objIndex], startTime: selectedDays[indexValue].startTime = `${data}` };
            await this.setState({ showTimePicker: false, selectedDays: items, indexValue: null, });
            console.log(items);

            this.is_filled_check(items, objIndex)
        }
        else {
            if (moment.duration(data).asMinutes() > moment.duration(selectedDays[indexValue].startTime).asMinutes()) {
                items[objIndex] = { ...items[objIndex], endTime: selectedDays[indexValue].endTime = data };
                await this.setState({ showTimePicker: false, selectedDays: items, indexValue: null, });
                this.is_filled_check(items, objIndex);
                console.log(items);
            }
            else {
                Alert.alert("Attention", "End Time should be greater then Start Time")
            }
        }

    }
    setEditTimeChange = (item, index) => {
        if (moment.duration(this.state.endTime).asMinutes() > moment.duration(this.state.startTime).asMinutes()) {
            const objIndex = this.state.selectedDays.findIndex((obj => obj.id == item.id));
            let items = [...this.state.selectedDays];
            items[objIndex] = { ...items[objIndex], startTime: this.state.startTime, endTime: this.state.endTime };
            this.setState({ showTimePicker: false, selectedDays: items, indexValue: null, showEditService: false });
            this.is_filled_check(items, objIndex)
        }
        else {
            Alert.alert("Attention", "End Time should be greater then Start Time")
        }

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
        Alert.alert('Attension', 'Are you sure you want to delete this day',
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
        let selectedDays = [...this.state.selectedDays];
        let newDayCounter = selectedDays[selectedDays.length - 1].dayCounter - 1;
        selectedDays[selectedDays.length - 1] = { ...selectedDays[selectedDays.length - 1], dayCounter: newDayCounter };
        this.setState({ selectedDays: selectedDays.filter((obj => obj.id != itemData.id)), loading: false })
    }

    on_Press_Edit = (item, index) => {
        let selectedDays = [...this.state.selectedDays];
        this.setState({ item, index, })
        let newDayCounter = selectedDays[selectedDays.length - 1].dayCounter - 1;
        selectedDays[selectedDays.length - 1] = { ...selectedDays[selectedDays.length - 1], dayCounter: newDayCounter };
        this.setState({ selectedDays });
        this.setState({ showEditService: true, startTime: selectedDays[index].startTime, endTime: selectedDays[index].endTime })
    }

    truncateString = (str, num) => {
        if (str.length <= num) {
            return str
        }
        return str.slice(0, num)
    }

    _renderItems = ({ item, index }) => {
        const { selectedDays, submit } = this.state;
        let date = moment().format('YYYY-MM-DD');
        let startTime = item.startTime != undefined ? item.startTime != '' ? moment(`${date} ${item.startTime}`).format('hh:mm A') : "" : ""

        return (
            <View style={styles.contentContainer}>
                <View style={styles.headingContainer}>
                    {
                        item.date != undefined && item.day != undefined ?
                            <View style={styles.dayContainer}>
                                <Text style={styles.textStyle}>{item.date} {this.truncateString(`${item.day}`, 3)}</Text>
                            </View>
                            :
                            null
                    }
                    <View style={styles.startTimeContainer} >
                        {
                            item.startTime != '' ?
                                <View style={styles.startTimeContainer}>
                                    <Text style={styles.textStyle}>{item.startTime != undefined ? item.startTime != '' ? startTime : '' : ''}</Text>
                                </View>
                                :
                                null
                        }
                    </View>
                    <View style={styles.endTimeContainer}>
                        {
                            item.endTime != '' ?
                                <View style={styles.priceAndTimeContainer}>
                                    <Text style={styles.textStyle}>{item.startTime != undefined ? moment(`${date} ${item.endTime}`).format('hh:mm A') : ''}</Text>
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

    // on_Press_Delete = (itemData, index) => {
    //     Alert.alert('Attension', 'Are you sure you want to delete your scheduler',
    //         [
    //             {
    //                 text: "Cancel",
    //                 // onPress: () => this.handleCancel(),
    //                 style: "cancel"
    //             },
    //             { text: "OK", onPress: () => this.handledelete(itemData) }
    //         ],

    //     );
    // }

    // handledelete = (item) => {
    //     let userData = {
    //         id: this.props.user.userData.id,
    //         token: this.props.user.userData.token,
    //         scheduler_id: item.id
    //     }
    //     SchedulerServices.deleteScheduler(userData)
    //         .then((res) => {
    //             if (res.data.status) {
    //                 let selectedArray = [...this.state.schedulerArray];
    //                 this.setState({ schedulerArray: selectedArray.filter((obj => obj.id != item.id)) })
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    handleSaveFunction = () => {
        let days = [];

        const { selectedDays } = this.state;
        selectedDays.forEach((item, index) => {
            if (item.day != undefined)
                days.push({
                    day: item.day,
                    date: item.date,
                    start_time: item.startTime,
                    end_time: item.endTime
                })
        })
        let userData = {
            id: `${this.props.user.userData.id}`,
            token: this.props.user.userData.token,
            working_days: days,
            steps_count: 4,
            scheduler_name: `${moment(`${days[0].date}`).format('MM/DD/YYYY') + ' - ' + moment(`${days[(days.length) - 1].date}`).format('MM/DD/YYYY')}`
        }
        // console.log(userData)
        // Barbers.updateBarberWorkingDays(userData)

        SchedulerServices.createScheduler(userData)
            .then((res) => {
                if (!res.data.status) {
                    RegisterUser.userStepCount(userData)
                        .then((res) => {
                            if (res.data.status) {
                                this.props.authActions.getUserProfile(userData, this.props.navigate);
                                this.setState({ buttonLoading: false })
                            }
                        })
                        .catch(err => console.log(err))
                    this.setState({ submit: false })
                }
            })
            .catch((err) => console.log(err))

    }

    on_Press_Next = () => {
        this.setState({ submit: true, buttonLoading: true })
        const { onNext } = this.props;
        let days = [];
        const { selectedDays } = this.state;
        let counter = (selectedDays[(selectedDays.length - 1)].dayCounter);
        let length = selectedDays.length - 1;

        if (counter === length) {
            if (selectedDays[0].day != undefined) {
                Alert.alert('Attention', 'Your schedule will be updated and your current bookings will remain saved', [
                    {
                        text: "Cancel",
                        onPress: () => this.setState({ buttonLoading: false }),
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: () => {
                            this.handleSaveFunction()
                        }
                    }
                ]);
            }
            else {
                Alert.alert("Please go back and again add days to your scheduler")
                this.setState({ submit: false, buttonLoading: false })
            }
        }
        else {
            Alert.alert('Attention', 'All required field should be filled ');
            this.setState({ buttonLoading: false })
        }
    }


    render() {
        const { onNext } = this.props;
        let date = moment().format('YYYY-MM-DD');
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
                            <>
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
                                    </KeyboardAwareScrollView>
                                </View>
                                <View style={styles.footerStyle}>
                                    <View style={styles.lineStyle}></View>
                                    <View style={styles.gapHeight}></View>
                                    <View style={[styles.buttonContainer, { flexDirection: "row", justifyContent: 'space-between' }]}>
                                        <View style={{ flex: 0.45 }}>
                                            <Button title="Back  " onPress={() => this.props.goBack()} />
                                        </View>
                                        <View style={{ flex: 0.45 }}>
                                            <Button title="Save  " loading={buttonLoading} disabled={this.state.selectedDays.length == 0 ? true : false} onPress={() => this.on_Press_Next()} />
                                        </View>
                                    </View>
                                    <View style={styles.gapHeight1}></View>
                                </View>
                            </>}
                </View>
                <DateTimeModal showTimePicker={showTimePicker}
                    dayNight={true}
                    onCancel={() => { this.setState({ showTimePicker: false }); }}
                    onSet={(time) => { this.state.startTime != "" && this.state.val == '1' ? this.setState({ startTime: time, showTimePicker: false, showEditService: true }) : this.state.endTime != "" && this.state.val == '0' ? this.setState({ endTime: time, showTimePicker: false, showEditService: true }) : this.setTimeChange(time) }} />
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
                                                <Text style={{ fontFamily: 'Poppins-Medium' }}>{moment(`${date} ${startTime}`).format('hh:mm A')}</Text>
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
                                                <Text style={{ fontFamily: 'Poppins-Medium' }}>{moment(`${date} ${endTime}`).format('hh:mm A')}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        {
                                            submit && !endTime == '' ? <Text style={COMMON_STYLE.errorText1}>Please select time</Text> : null
                                        }
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={styles.rowButtonContainer}>
                                            <Button title="Cancel" onPress={() => {
                                                let dayArray = [...this.state.selectedDays];
                                                let newDayCounter = dayArray[dayArray.length - 1].dayCounter + 1;
                                                dayArray[dayArray.length - 1] = { ...dayArray[dayArray.length - 1], dayCounter: newDayCounter };
                                                this.setState({ selectedDays: dayArray });
                                                this.setState({ showEditService: false })
                                            }} />
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