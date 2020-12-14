import React, { Component } from 'react';
import { View, Text, Modal, ActivityIndicator, TouchableOpacity, Alert, Dimensions, ScrollView } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
import { Barbers } from '../../../services';
import { DateTimeModal, Button, FooterButton, Icon } from '../../../components';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../../redux/actions/auth';
import styles from './style';
import DropDownPicker from 'react-native-dropdown-picker';
import ScrollPicker from 'react-native-picker-scrollview';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
class AddBreakTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDay: '',
            data: [],
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
            itemValue: '',
            timeHourSlot: [],
            timeMinutesSlot: [],
            startHours: '',
            startMinutes: '00',
            endHours: '',
            endMinutes: '00'

        }
    }

    setTimeChange = (data) => {
        const { val, selectedDays, indexValue, item } = this.state;
        if (val == '1') {
            this.setState({ startTime: data, showTimePicker: false });
        }
        else {
            this.setState({ endTime: data, showTimePicker: false });
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
        Barbers.viewBarberNoBreakDays(userData)
            .then((res) => {
                let array = [];

                res.data.resNoBreakTimes.map((item) => {
                    array.push({
                        id: item.id,
                        label: item.day,
                        value: `${item.id}`
                    })
                })
                this.setState({
                    data: array,
                    loading: false,
                })
            })
            .catch((err) => console.log(err))
    }
    setEditTimeChange = (item, index) => {
        if (moment.duration(`${this.state.endTime}`).asMinutes() > moment.duration(`${this.state.startTime}`).asMinutes()) {
            this.setState({ buttonLoading: true })
            let userData = {
                id: this.props.user.userData.id,
                token: this.props.user.userData.token,
                day_id: item,
                break_start_time: this.state.startTime,
                break_end_time: this.state.endTime
            }
            Barbers.addBreakTime(userData)
                .then((res) => {
                    if (res.data.status) {
                        this.props.replace('BreakTime')
                        this.setState({ buttonLoading: false, indexValue: null, item: null, selectedDay: '', showEditService: false });
                    }
                })
                .catch((err) => console.log(err))
        }
        else {
            Alert.alert("Attention", "End Time should be greater then Start Time")
        }
    }

    setStartTime = (index, item) => {
        this.setState({ showEditService: false, showTimePicker: true, indexValue: index, index: index, item: item, val: '1' })
    }

    setEndTime = (index, item) => {
        this.setState({ showTimePicker: true, indexValue: index, index: index, item: item, val: '0' })
    }

    onSelectedItemsChange = (itemValue, itemIndex) => {
        this.setState({ item: itemValue, index: itemIndex, showEditService: true })
    }

    handleEndHours = (data) => {
        this.setState({ endTime: `${data}:${this.state.endMinutes}`, endHours: data, })
    }

    handleEndMinutes = (data) => {
        this.setState({ endTime: `${this.state.endHours}:${data}`, endMinutes: data, })
    }

    handleStartHours = (data) => {
        this.setState({ startTime: `${data}:${this.state.startMinutes}`, startHours: data })
    }

    handleStartMinutes = (data) => {
        this.setState({ startMinutes: data, startTime: `${this.state.startHours}:${data}` })
    }

    render() {
        const { onNext } = this.props;
        let date = moment().format('YYYY-MM-DD');
        const { selectedDays, data, timeHourSlot, timeMinutesSlot, selectedDay, showTimePicker, loading, buttonLoading, startTime, index, endTime, submit, showEditService, item, indexValue } = this.state;

        return (
            <>
                <View style={{ flex: 1, paddingTop: '5%', backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR }}>

                    {
                        loading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator />
                            </View>
                            :
                            this.state.data.length == 0 ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.headingTextStyle}>No days found for break</Text>
                                </View>
                                :
                                // <ScrollView>


                                <View style={styles.formContainer}>
                                    <DropDownPicker
                                        items={data}
                                        placeholder="Select a day"
                                        defaultValue={this.state.selectedDay ? this.state.selectedDay : null}
                                        containerStyle={{ height: 40 }}
                                        style={{ backgroundColor: '#fafafa' }}
                                        itemStyle={{
                                            justifyContent: 'flex-start'
                                        }}
                                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                                        onChangeItem={(item) => this.setState({
                                            selectedDay: item.value, item: item.value, index: item.value,
                                        })}
                                    />
                                    {
                                        selectedDay != '' ?
                                            <>
                                                <View style={styles.modalInputContainerTwo}>
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <Text style={styles.headingTextStyle}>Start Time:</Text>
                                                    </View>
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
                                                <View style={styles.modalInputContainerTwo}>
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

                                                </View>
                                                <View style={{ marginTop: '5%', justifyContent: 'flex-end' }}>
                                                    <Button title="Cancel" onPress={() => this.setState({ selectedDay: '' })} />
                                                </View>
                                            </>
                                            :
                                            null
                                    }
                                </View>


                        // </ScrollView>
                    }


                    {/* <DateTimeModal showTimePicker={showTimePicker}
                        dayNight={true}
                        onCancel={() => this.setState({ showTimePicker: false })}
                        onSet={(time) => {
                            this.state.startTime == "" || this.state.endTime == "" ? this.state.val == '1' ?
                                this.setState({ startTime: time, showTimePicker: false, showEditService: true })
                                :
                                this.setState({ endTime: time, showTimePicker: false, showEditService: true }) : this.setTimeChange(time)
                        }} /> */}
                </View>
                {/* <FooterButton title='Back' onPress={() => this.props.onNext()} /> */}
                <View style={styles.footerStyle}>
                    <View style={styles.lineStyle}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={[styles.buttonContainer, { flexDirection: "row", justifyContent: 'space-between' }]}>
                        <View style={{ flex: 0.45 }}>
                            <Button title="Back  " onPress={() => this.props.onNext()} />
                        </View>
                        <View style={{ flex: 0.45 }}>
                            <Button disabled={this.state.endHours && this.state.startHours ? false : true} loading={buttonLoading} title="Add  " onPress={() => this.setEditTimeChange(item, index)} />
                        </View>
                    </View>
                    <View style={styles.gapHeight1}></View>
                </View>
                {/* <Modal visible={showEditService}
                    animationType="slide">
                    {
                        item == null || index == null ?
                            null
                            :
                            <View style={styles.modalContainer}>
                                <View style={styles.modalInputContainer}>
                                    <View style={styles.headingContainer}>
                                        <Text style={styles.headingTextStyle}>Add Break Time</Text>
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
                                            <Button title="Add" loading={buttonLoading} onPress={() => this.setEditTimeChange(item, index)} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                    }
                </Modal> */}
            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(AddBreakTime)