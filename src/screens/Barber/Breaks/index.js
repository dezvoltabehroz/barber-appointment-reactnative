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
            showEditService: false
        }
    }

    componentDidMount = () => {
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
        let date = moment().format('YYYY-MM-DD');
        if (moment(`${date} ${this.state.endTime}`).format("hh:mm A") > moment(`${date} ${this.state.startTime}`).format("hh:mm A")) {
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
        else{
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
        this.setState({ showTimePicker: true, indexValue: index, index: index, item: item, val: '1' })
    }

    setEndTime = (index, item) => {
        this.setState({ showTimePicker: true, indexValue: index, index: index, item: item, val: '0' })
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
                    <FooterButton title='Add Break' onPress={() => this.props.onNext()} />
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