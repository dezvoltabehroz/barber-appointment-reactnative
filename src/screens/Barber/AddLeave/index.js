import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FooterButton, FloatingInput, Button } from '../../../components';
import styles from './style';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import THEME from '../../../assets/styles/theme.style';
import { Barbers } from '../../../services';
import { connect } from 'react-redux';
import moment from 'moment'
import { Alert } from 'react-native';
class AddLeave extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offDayNote: '',
            offDayDate: '',
            showDatePicker: false,
            date: '',
            isOffDayNoteFocus: false,
            selectedDate: '',
            buttonLoading: false
        }
    }

    hideDatePicker = () => {
        this.setState({ showDatePicker: !this.state.showDatePicker });
    };

    handleConfirm = (selectedDate) => {
        var date = selectedDate.getDate() < 10 ? "0" + selectedDate.getDate() : selectedDate.getDate();
        date += "/";
        date += (selectedDate.getMonth() + 1) < 10 ? "0" + (selectedDate.getMonth() + 1) : (selectedDate.getMonth() + 1);
        date += "/";
        date += (selectedDate.getYear() + 1900);

        this.setState({
            offDayDate: date,
            selectedDate: moment(selectedDate).format('YYYY-MM-DD'),
            showDatePicker: !this.state.showDatePicker
        })
    };
    handleSubmit = () => {
        if (this.state.offDayDate == moment().format('YYYY-MM-DD')) {
            Alert.alert("Attension", "Please select a future date for leave ")
        } else {
            this.setState({ buttonLoading: true })
            let userData = {
                id: this.props.user.userData.id,
                token: this.props.user.userData.token,
                off_date: this.state.selectedDate,
                off_reason: this.state.offDayNote
            }
            Barbers.addBarberOffDay(userData)
                .then((res) => {
                    this.props.replace('OffDays')
                    this.setState({ buttonLoading: false })
                })
                .catch((err) => console.log(err))
        }
    }

    render() {
        const { onNext } = this.props;
        const { WorkingDays, showDatePicker, buttonLoading, offDayDate, isOffDayNoteFocus, offDayNote } = this.state;
        var date = new Date();
        date.setDate(date.getDate() + 1);
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <Text style={styles.headingTextStyle}>Please select your Off Day</Text>
                        <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                            <View style={[styles.dateContainer, showDatePicker || offDayDate != '' ? THEME.inputBorder : {}]}>
                                <Text style={[styles.dateTextStyle, offDayDate ? { color: THEME.COLOR_BLACK } : {}]}>{offDayDate && offDayDate != "" ? offDayDate : "Select Date"}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[styles.inputContainerStyle, isOffDayNoteFocus || offDayNote != '' ? THEME.inputBorder : {}]}>
                            <FloatingInput
                                val={offDayNote}
                                onActive={() => this.setState({ isOffDayNoteFocus: true })}
                                onInActive={() => this.setState({ isOffDayNoteFocus: false })}
                                label='Off Day Note' updateText={(offDayNote) => this.setState({ offDayNote })} />
                        </View>
                    </View>
                    <View style={styles.footerStyle}>
                        <View style={styles.lineStyle}></View>
                        <View style={styles.gapHeight}></View>
                        <View style={[styles.buttonContainer, { flexDirection: "row", justifyContent: 'space-between' }]}>
                            <View style={{ flex: 0.45 }}>
                                <Button title="Back  " onPress={() => this.props.goBack()} />
                            </View>
                            <View style={{ flex: 0.45 }}>
                                <Button title="Submit Leave  " loading={buttonLoading} disabled={this.state.offDayNote && this.state.offDayDate ? false : true} onPress={() => this.handleSubmit()} />
                            </View>
                        </View>
                        <View style={styles.gapHeight1}></View>
                    </View>
                </View>
                <DateTimePickerModal
                    isVisible={showDatePicker}
                    mode="date"
                    minimumDate={date}
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(AddLeave)