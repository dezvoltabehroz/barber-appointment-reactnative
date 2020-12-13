import React, { Component } from 'react';
import { View, Text, Modal, ActivityIndicator, TouchableOpacity, Alert, Platform } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
import { Barbers } from '../../../services';
import { DateTimeModal, Button, FooterButton, } from '../../../components';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../../redux/actions/auth';
import styles from './style';
import DropDownPicker from 'react-native-dropdown-picker';
class AddBreakTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDay: 'Select a day',
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
            itemValue: ''

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
    componentDidMount = () => {
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
        let date = moment().format('YYYY-MM-DD');
        if (moment(`${date} ${this.state.endTime}`).format("hh:mm A") > moment(`${date} ${this.state.startTime}`).format("hh:mm A")) {
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
                        this.setState({ buttonLoading: false, indexValue: null, showEditService: false });
                    }
                })
                .catch((err) => console.log(err))
        }
        else {
            Alert.alert("Attention", "End Time should be greater then Start Time")
        }
    }

    setStartTime = (index, item) => {
        this.setState({ showTimePicker: true, indexValue: index, index: index, item: item, val: '1' })
    }

    setEndTime = (index, item) => {
        this.setState({ showTimePicker: true, indexValue: index, index: index, item: item, val: '0' })
    }

    onSelectedItemsChange = (itemValue, itemIndex) => {
        this.setState({ item: itemValue, index: itemIndex, showEditService: true })
    }

    render() {
        const { onNext } = this.props;
        let date = moment().format('YYYY-MM-DD');
        const { selectedDays, data, selectedDay, showTimePicker, loading, buttonLoading, startTime, index, endTime, submit, showEditService, item, indexValue } = this.state;

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
                                <View style={styles.formContainer}>
                                    <DropDownPicker
                                        items={data}
                                        defaultValue={this.state.country}
                                        containerStyle={{ height: 40 }}
                                        style={{ backgroundColor: '#fafafa' }}
                                        itemStyle={{
                                            justifyContent: 'flex-start'
                                        }}
                                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                                        onChangeItem={(item) => this.setState({
                                            selectedDay: item.value, item: item.value, index: item.value, showEditService: true
                                        })}
                                    />

                                </View>
                    }
                    <DateTimeModal showTimePicker={showTimePicker}
                        dayNight={true}
                        onCancel={() => this.setState({ showTimePicker: false })}
                        onSet={(time) => { this.state.startTime != "" && this.state.endTime != "" ? this.state.val == '1' ? this.setState({ startTime: time, showTimePicker: false }) : this.setState({ endTime: time, showTimePicker: false }) : this.setTimeChange(time) }} />
                </View>
                <FooterButton title='Back' onPress={() => this.props.onNext()} />

                <Modal visible={showEditService}
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
                </Modal>
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