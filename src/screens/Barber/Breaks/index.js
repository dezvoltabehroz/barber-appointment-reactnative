import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, Alert, ActivityIndicator, Modal } from 'react-native';
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

import ScrollPicker from 'react-native-picker-scrollview';
import moment from 'moment';
class Breaks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDays: [],
            showTimePicker: false,
            indexValue: '',
            item: null,
            val: '',
            submit: false,
            loading: true,
            buttonLoading: false,
            startTime: '',
            endTime: '',
            showEditService: false,
            timeHourSlot: [],
            timeMinutesSlot: [],
            selectStartTime: false,
            selectEndTime: false,
            startHours: '',
            startMinutes: '00',
            endHours: '',
            endMinutes: '00'
        }
    }

    hoursArray = () => {
        var set = [];
        var range = 24;
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

    componentDidMount = () => {
        this.hoursArray();
        this.minutesArray();
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token
        }
        Barbers.viewBarberBreaks(userData)
            .then((res) => {
                if (res.data.status) {
                    this.setState({ selectedDays: res.data.resBreakTimes, loading: false })
                }
                else {
                    this.setState({ selectedDays: res.data.resBreakTimes, loading: false })
                }
            })
            .catch((err) => console.log(err))
    }


    setEditTimeChange = (item, index) => {
        if (moment.duration(`${this.state.endTime}`).asMinutes() > moment.duration(`${this.state.startTime}`).asMinutes()) {
            this.setState({ buttonLoading: true })
            let userData = {
                id: this.props.user.userData.id,
                token: this.props.user.userData.token,
                day_id: item.id,
                break_start_time: this.state.startTime,
                break_end_time: this.state.endTime
            }
            Barbers.addBreakTime(userData)
                .then((res) => {
                    if (res.data.status) {
                        const objIndex = this.state.selectedDays.findIndex((obj => obj.id == item.id));
                        let items = [...this.state.selectedDays];
                        items[objIndex] = { ...items[objIndex], break_start_time: this.state.startTime, break_end_time: this.state.endTime };
                        this.setState({ buttonLoading: false, selectedDays: items, indexValue: null, showEditService: false });
                    }
                })
                .catch((err) => console.log(err))
        }
        else {
            Alert.alert("Attention", "End Time should be greater then Start Time")
        }
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }
    on_Press_Delete = (itemData, index) => {
        Alert.alert('Attension', 'Are you sure you want to delete break time',
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
            day_id: itemData.id
        }
        Barbers.deleteBreakTime(userData)
            .then((res) => {
                if (res.data.status) {
                    let selectedDays = [...this.state.selectedDays];
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
        this.setState({ showEditService: true, startTime: selectedDays[index].break_start_time, endTime: selectedDays[index].break_end_time });
        // console.log(selectedDays[index].startTime)
    }

    _renderItems = ({ item, index }) => {
        const { selectedDays, submit } = this.state;
        let date = moment().format('YYYY-MM-DD');
        return (
            <View style={styles.contentContainer}>
                <View style={styles.headingContainer}>
                    <View style={styles.dayContainer}>
                        <Text style={styles.textStyle}>{item.day}</Text>
                    </View>
                    <View style={styles.startTimeContainer} >
                        {
                            item.break_start_time != '' ?
                                <View style={styles.startTimeContainer}>
                                    <Text style={styles.textStyle}>{item.break_start_time != undefined ? moment(`${date} ${item.break_start_time}`).format('hh:mm A') : ''}</Text>
                                </View>
                                :
                                null
                        }
                    </View>
                    <View style={styles.endTimeContainer}>
                        {
                            item.break_end_time != '' ?
                                <View style={styles.priceAndTimeContainer}>
                                    <Text style={styles.textStyle}>{item.break_end_time != undefined ? moment(`${date} ${item.break_end_time}`).format('hh:mm A') : ''}</Text>
                                </View>
                                :
                                null
                        }
                    </View>
                    <View style={[styles.iconContainer, { alignItems: "flex-end" }]}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <TouchableOpacity onPress={() => this.on_Press_Edit(item, index)} >
                                <Icon.MaterialIcons name='edit' size={25} color={THEME.COLOR_WHITE} />
                            </TouchableOpacity>
                            <View style={{ width: 5 }}></View>
                            <TouchableOpacity onPress={() => this.on_Press_Delete(item, index)}>
                                <Icon.MaterialIcons name='delete' size={25} color={THEME.COLOR_WHITE} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    setStartTime = (index, item) => {
        this.setState({ selectStartTime: true, selectEndTime: false, showTimePicker: true, indexValue: index, index: index, item: item, val: '1' })
    }

    setEndTime = (index, item) => {
        this.setState({ selectEndTime: true, selectStartTime: false, showTimePicker: true, indexValue: index, index: index, item: item, val: '0' })
    }

    handleEndHours = (data) => {
        this.setState({ endTime: `${data}:${this.state.endMinutes}`, endHours: data, })
    }

    handleEndMinutes = (data) => {
        this.setState({ endTime: `${this.state.endHours}:${data}`, endMinutes: data, })
    }

    handleStartHours = (data) => {
        if (this.state.selectStartTime) {
            this.setState({ startHours: data })

        }
        else {
            this.setState({ endHours: data, })
        }
    }

    handleStartMinutes = (data) => {
        if (this.state.selectStartTime) {
            this.setState({ startMinutes: data, })
        }
        else {
            this.setState({ endMinutes: data, })
        }
    }

    render() {
        const { onNext } = this.props;
        let date = moment().format('YYYY-MM-DD');
        const { selectedDays, selectStartTime, showTimePicker, timeHourSlot, timeMinutesSlot, loading, buttonLoading, startTime, index, endTime, submit, showEditService, item, indexValue } = this.state;
        return (
            <>
                <View style={styles.container}>
                    {
                        loading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator />
                            </View>
                            :
                            selectedDays.length == 0 ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.textStyle}> No Breaks Found</Text>
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
                                            refreshControl={<RefreshControl
                                                refreshing={this.state.loading}
                                                onRefresh={() => this.componentDidMount()}
                                                tintColor={THEME.COLOR_WHITE}
                                                colors={[THEME.PRIMARY_COLOR]}
                                            />}
                                            showsVerticalScrollIndicator={false}
                                            ItemSeparatorComponent={this._renderSeparator}
                                            renderItem={({ item, index }) => this._renderItems({ item, index })}
                                            keyExtractor={item => item} />
                                    </KeyboardAwareScrollView>
                                </View>}
                    <FooterButton title='Add Break' onPress={() => this.props.onNext()} />
                </View>
                <Modal visible={showTimePicker}
                    animationType="slide">
                    <View style={styles.modalContainer}  >
                        <View style={styles.modalInputContainer}>
                            <View style={styles.headingContainer}>
                                <Text style={styles.headingTextStyle}>Update Break {selectStartTime ? 'Start Time' : 'End Time'}</Text>
                            </View>
                            <View style={styles.modalInputContainerTwo}>
                                <ScrollPicker
                                    ref={(sp) => { this.sp = sp }}
                                    dataSource={timeHourSlot}
                                    selectedIndex={0}
                                    itemHeight={60}
                                    style={{ height: 40 }}
                                    wrapperHeight={70}
                                    wrapperColor={THEME.PRIMARY_BACKGROUND_COLOR}
                                    highlightColor={THEME.COLOR_WHITE}
                                    renderItem={(data, index, isSelected) => {
                                        return (<Text style={styles.textFlatlistStyle}>{data}</Text>)
                                    }}
                                    onValueChange={(data, selectedIndex) => {
                                        if (selectedIndex == 0 && data == '00') {
                                            this.handleStartHours(data)
                                        }
                                        else {
                                            this.handleStartHours(data)
                                        }
                                    }}
                                />

                                < View style={styles.iconContainer}>
                                    <Icon.Entypo name="dots-two-vertical" color={THEME.COLOR_WHITE} size={THEME.ICON_SIZE} />
                                </View>


                                <ScrollPicker
                                    ref={(sp) => { this.sp = sp }}
                                    dataSource={timeMinutesSlot}
                                    selectedIndex={0}
                                    itemHeight={60}
                                    style={{ height: 40 }}
                                    wrapperHeight={70}
                                    wrapperColor={THEME.PRIMARY_BACKGROUND_COLOR}
                                    highlightColor={THEME.COLOR_WHITE}
                                    renderItem={(data, index, isSelected) => {
                                        return (<Text style={styles.textFlatlistStyle}>{data}</Text>)
                                    }}
                                    onValueChange={(data, selectedIndex) => {
                                        if (selectedIndex == 0 && data == '00') {
                                            this.handleStartMinutes(data)
                                        }
                                        else {
                                            this.handleStartMinutes(data)
                                        }
                                    }}
                                />

                            </View>
                            {/* <View style={styles.modalInputContainerTwo}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.headingTextStyle}>End Time:    </Text>
                                </View>
                                <ScrollPicker
                                    ref={(sp) => { this.sp = sp }}
                                    dataSource={timeHourSlot}
                                    selectedIndex={0}
                                    itemHeight={60}
                                    style={{ height: 40 }}
                                    wrapperHeight={60}
                                    wrapperColor={THEME.PRIMARY_BACKGROUND_COLOR}
                                    highlightColor={THEME.COLOR_WHITE}
                                    renderItem={(data, index, isSelected) => {
                                        return (<Text style={styles.textFlatlistStyle}>{data}</Text>)
                                    }}
                                    onValueChange={(data, selectedIndex) => {
                                        if (selectedIndex == 0 && data == '00') {
                                            this.handleEndHours(data)
                                        }
                                        else {
                                            this.handleEndHours(data)
                                        }
                                    }}
                                />
                                < View style={styles.iconContainer}>
                                    <Icon.Entypo name="dots-two-vertical" color={THEME.COLOR_WHITE} size={THEME.ICON_SIZE} />
                                </View>
                                <ScrollPicker
                                    ref={(sp) => { this.sp = sp }}
                                    dataSource={timeMinutesSlot}
                                    selectedIndex={0}
                                    itemHeight={60}
                                    style={{ height: 40 }}
                                    wrapperHeight={60}
                                    wrapperColor={THEME.PRIMARY_BACKGROUND_COLOR}
                                    highlightColor={THEME.COLOR_WHITE}
                                    renderItem={(data, index, isSelected) => {
                                        return (<Text style={styles.textFlatlistStyle}>{data}</Text>)
                                    }}
                                    onValueChange={(data, selectedIndex) => {
                                        if (selectedIndex == 0 && data == '00') {
                                            this.handleEndMinutes(data)
                                        }
                                        else {
                                            this.handleEndMinutes(data)
                                        }
                                    }}
                                />

                            </View> */}
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: '10%' }}>
                                <View style={styles.rowButtonContainer}>
                                    <Button title="Cancel" onPress={() => this.setState({ showTimePicker: false, showEditService: true, startHours: '', startMinutes: '00', endHours: '', endMinutes: '00' })} />
                                </View>
                                <View style={styles.rowButtonContainer}>
                                    <Button title="Set" disabled={(this.state.startHours && this.state.startMinutes) || (this.state.endHours && this.state.endMinutes) ? false : true} onPress={() => this.setState({ showTimePicker: false, showEditService: true, }, () => {
                                        if (this.state.selectStartTime) {
                                            this.setState({ startTime: `${this.state.startHours}:${this.state.startMinutes}`, startHours: '', startMinutes: '00',endHours: '', endMinutes: '00'  })
                                        }
                                        else {
                                            this.setState({ endTime: `${this.state.endHours}:${this.state.endMinutes}`,startHours: '', startMinutes: '00', endHours: '', endMinutes: '00' })
                                        }
                                    })} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* <DateTimeModal showTimePicker={showTimePicker}
                    dayNight={true}
                    onCancel={() => this.setState({ showTimePicker: false })}
                    onSet={(time) => { this.state.startTime != "" && this.state.endTime != "" ? this.state.val == '1' ? this.setState({ startTime: time, showTimePicker: false, showEditService: true }) : this.setState({ endTime: time, showTimePicker: false, showEditService: true }) : this.setTimeChange(time) }} /> */}
                <Modal visible={showEditService}
                    animationType="slide">
                    {
                        item == null || index == null ?
                            null
                            :
                            <View style={styles.modalContainer}  >
                                <View style={styles.modalInputContainer}>
                                    <View style={styles.headingContainer}>
                                        <Text style={styles.headingTextStyle}>Update Break Time</Text>
                                    </View>

                                    <View>
                                        <TouchableOpacity onPress={() => this.setStartTime(index, item)} style={[styles.inputModalContainerStyle,
                                        startTime == '' ? THEME.inputBorder : {}]}>
                                            <View style={{ marginLeft: '3.5%' }}>
                                                <Text style={styles.titleStyle}>Start Time</Text>
                                                <Text style={{ fontFamily: 'Poppins-Medium' }}>{startTime != '' ? moment(`${date} ${startTime}`).format('hh:mm A') : ''}</Text>
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
                                                <Text style={{ fontFamily: 'Poppins-Medium' }}>{endTime != '' ? moment(`${date} ${endTime}`).format('hh:mm A') : ''}</Text>
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
                                            <Button title="Update" loading={buttonLoading} onPress={() => this.setEditTimeChange(item, index)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Breaks)