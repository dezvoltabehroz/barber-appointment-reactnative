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
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Space from '../../../assets/svg/_.svg';
import Trash from '../../../assets/svg/deleteblack.svg'
import TrashColor from '../../../assets/svg/deletecolor.svg'
import Edit from '../../../assets/svg/editBlack.svg'
import ModalS from 'react-native-modal';
var swipeableRef = {}
class ScheduleTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDays: [
                { id: 1, day: 'Monday', selected: true, startTime: '', endTime: '', isFilled: '' },
                { id: 2, day: 'Tuesday', selected: true, startTime: '', endTime: '', isFilled: '' },
                { id: 3, day: 'Wednesday', selected: true, startTime: '', endTime: '', isFilled: '' },
                { id: 4, day: 'Thursday', selected: true, startTime: '', endTime: '', isFilled: '' },
                { id: 5, day: 'Friday', selected: true, startTime: '', endTime: '', isFilled: '' },
                { id: 6, day: 'Saturday', selected: true, startTime: '', endTime: '', isFilled: '' },
                { id: 7, day: 'Sunday', selected: true, startTime: '', endTime: '', isFilled: '' },
            ],
            showTimePicker: false,
            indexValue: '',
            item: null,
            val: '',
            submit: false,
            loading: false,
            buttonLoading: false,
            startTime: '',
            endTime: '',
            showEditService: false,
            lastIndex: -1,
            presentAlertModal: false
        }
    }

    componentDidMount = () => {
        this.setState({ loading: true, });
        let myArray = [...this.state.selectedDays]
        myArray.map((item, index) => {
            myArray[index] = { ...myArray[index], startTime: '', endTime: '', }
        });
        // myArray.push({ dayCounter: 0 })
        this.setState({ selectedDays: myArray, loading: false })

        // this.setState({ loading: true })
        // let selectedDay = [...this.props.data];
        // let length = 0;
        // selectedDay.forEach(element => {
        //     if (element.isFilled == '1') {
        //         length = length + 1;
        //     }

        // });
        // selectedDay.push({ dayCounter: length })
        // this.setState({ selectedDays: selectedDay, loading: false })

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
    renderLeftActions = (progress, dragX, item) => {
        // console.log("item:", item)
        return (
            <View style={{ flexDirection: 'row', height: 53, backgroundColor: THEME.PRIMARY_COLOR }}>
                <TouchableOpacity
                    onPress={() => this.on_Press_Edit(item, this.state.index)}
                    style={{
                        // backgroundColor: THEME.PRIMARY_COLOR,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // width: 90,
                        // height: 90,
                        paddingRight: 10
                    }}>

                    <Edit height={30} width={30} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.on_Press_Delete(item)
                    }}
                    style={{
                        // backgroundColor: THEME.PRIMARY_COLOR,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // width: 50,
                        // borderRadius: 13,
                        // height: 50,

                        paddingRight: 10
                    }}>
                    <Trash height={25} width={25} />
                </TouchableOpacity>
            </View>
        );
    };

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
            dayArray[index] = { ...dayArray[index], isFilled: '1' };
            this.setState({ selectedDays: dayArray, startTime: '', endTime: '', });
        }
        else {
            dayArray[index] = { ...dayArray[index], isFilled: '2' };
            this.setState({ selectedDays: dayArray, startTime: '', endTime: '', });
        }
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }
    on_Press_Delete = (itemData) => {
        this.setState({ presentAlertModal: true })
        // Alert.alert('Attension', 'Are you sure you want to delete this day',
        //     [
        //         {
        //             text: "Cancel",
        //             // onPress: () => this.handleCancel(),
        //             style: "cancel"
        //         },
        //         { text: "OK", onPress: () => this.handleDeleteService(itemData, index) }
        //     ],

        // );
    }

    handleDeleteService = (itemData, index) => {
        let objIndex = this.state.selectedDays.findIndex((item) => item.id == itemData.id)
        let selectedDays = [...this.state.selectedDays];
        selectedDays[objIndex] = { ...selectedDays[objIndex], selected: false };
        swipeableRef[this.state.lastIndex].close()
        this.setState({ selectedDays: selectedDays, presentAlertModal: false })
    }

    on_Press_Edit = (item, index) => {
        let selectedDays = [...this.state.selectedDays];
        this.setState({ item, index, })
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
        console.log(item)
        return (

            <>
                {
                    item.selected ?
                        <View style={styles.contentContainer}>
                            <View style={styles.headingContainer}>
                                <View style={styles.dayContainer}>
                                    <Text style={styles.textStyle}>{item.day}</Text>
                                </View>
                                {/* {
                        item.date != undefined && item.day != undefined ?
                            <View style={styles.dayContainer}>
                                <Text style={styles.textStyle}>{item.date} {this.truncateString(`${item.day}`, 3)}</Text>
                            </View>
                            :
                            null
                    } */}
                                <View style={styles.startTimeContainer} >
                                    {
                                        item.startTime != '' ?
                                            <View style={styles.startTimeContainer}>
                                                <Text style={styles.textStyle}>{item.startTime != undefined ? item.startTime != '' ? startTime : '' : ''}</Text>
                                            </View>
                                            :
                                            null
                                    }
                                    {
                                        item.startTime == "" ?
                                            <TouchableOpacity onPress={() => this.setStartTime(index, item)} >
                                                <Space width={60} height={30} />
                                            </TouchableOpacity>
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
                                    {
                                        item.endTime == "" ?
                                            <TouchableOpacity onPress={() => this.setEndTime(index, item)} >
                                                <Space width={60} height={30} />
                                            </TouchableOpacity>
                                            :
                                            null
                                    }
                                </View>
                                {/* <View style={[styles.iconContainer, { alignItems: "flex-end" }]}>
                                    {
                                        item.isFilled == '1' ?
                                            <View style={{ flexDirection: 'row', flex: 1 }}>

                                                <View style={{ width: 5 }}></View>
                                                <TouchableOpacity onPress={() => this.on_Press_Delete(item, index)}>
                                                    <Icon.MaterialIcons name='delete' size={25} color={THEME.COLOR_WHITE} />
                                                </TouchableOpacity>
                                            </View>
                                            : null
                                    }
                                </View> */}
                            </View>
                            {/* <View style={styles.inputContainer}>
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
                            </View> */}
                        </View>
                        :
                        null}
            </>
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

    on_Press_Next = async () => {
        this.setState({ submit: true, buttonLoading: true })
        const { onNext } = this.props;
        let days = [];
        const { selectedDays } = this.state;
        let counter = 0;
        await selectedDays.forEach((item, index) => {
            if (item.isFilled != '2') {
                counter = counter + 1;
            }
        })
        let length = selectedDays.length;
        console.log(counter)
        console.log(length)
        if (counter === length) {
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
        }
        else {
            Alert.alert('Attention', 'All required field should be filled ');
            this.setState({ buttonLoading: false })
        }
    }


    render() {
        const { onNext } = this.props;
        let date = moment().format('YYYY-MM-DD');
        const { selectedDays, showTimePicker, loading, buttonLoading, startTime, lastIndex, index, endTime, submit, showEditService, item, indexValue } = this.state;
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
                                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
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
                                        </View>
                                        <FlatList
                                            data={selectedDays}
                                            showsVerticalScrollIndicator={false}
                                            ItemSeparatorComponent={this._renderSeparator}
                                            renderItem={({ item, index }) => {
                                                return (<Swipeable
                                                    enabled={item.startTime != "" && item.endTime != "" ? true : false}
                                                    useNativeAnimations={true}
                                                    overshootRight={false}
                                                    ref={(Swipeable) => swipeableRef[index] = Swipeable}
                                                    onSwipeableWillOpen={() => {
                                                        this.setState({ item, index })
                                                        if (lastIndex == -1) {
                                                            this.setState({ lastIndex: index });
                                                        }
                                                        else {
                                                            if (index != lastIndex) {
                                                                if (index != lastIndex) {
                                                                    swipeableRef[lastIndex]?.close()
                                                                }
                                                            }
                                                            this.setState({ lastIndex: index });
                                                        }
                                                    }}
                                                    renderRightActions={(progress, dragX) => this.renderLeftActions(progress, dragX, item)}
                                                >
                                                    {this._renderItems({ item, index })}
                                                </Swipeable>)
                                            }}
                                            keyExtractor={item => item} />
                                    </KeyboardAwareScrollView>
                                </View>
                                <FooterButton loading={buttonLoading} title='Update & Continue' onPress={this.on_Press_Next} />
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
                <ModalS isVisible={this.state.presentAlertModal}>
                    <View style={{ backgroundColor: '#171717', paddingVertical: "5%" }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: "5%", marginHorizontal: '6%' }}>
                            <TrashColor />
                            <Text style={{ fontFamily: "Poppins-Medium", textAlign: "center", paddingTop: "5%", color: "white" }}>Are you sure you want to delete this day? This will delete the day permanently.</Text>
                        </View>
                        <View style={{ paddingTop: '5%', marginHorizontal: "10%", flexDirection: "row", justifyContent: "space-between", paddingBottom: '5%', }}>
                            <TouchableOpacity onPress={() => { swipeableRef[this.state.lastIndex]?.close(); this.setState({ presentAlertModal: false }) }} style={{ width: 120, backgroundColor: THEME.PRIMARY_COLOR, height: 50, justifyContent: 'center' }}>
                                <Text style={{ color: '#171717', textAlign: 'center', fontFamily: 'Poppins-Bold' }} >Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleDeleteService(item, index)} style={{ width: 120, backgroundColor: "#FF6635", height: 50, justifyContent: 'center' }}>
                                <Text style={{ color: '#171717', textAlign: 'center', fontFamily: 'Poppins-Bold' }} >Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ModalS>
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