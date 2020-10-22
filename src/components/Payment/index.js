

import React, { Component } from 'react';
import {
    View,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    Modal,
    FlatList
} from 'react-native';
import styles from './style'
import { Icon, FloatingInput } from '..';
import THEME from '../../assets/styles/theme.style';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
class Payment extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            name: '',
            isNameFocus: false,
            number: '',
            isNumberFocus: false,
            expDate: '',
            isexpDateFocus: false,
            cvv: '',
            isCvvFocus: false,
            showDatePicker: false,
            date: ''
        }
    }
    handleConfirmPayment = () => {
        const { name, expDate, number, cvv, date } = this.state;
        if (name && number && date && cvv) {
            let data = {
                card_number: number,
                card_holder: name,
                exp_date: moment(date).format('YYYY-MM-DD'),
                ccv_code: cvv
            }
            this.props.isConfirm("false", data)
        }
    }

    onChangeDate = (event, newDate) => {
        var expDate = moment(newDate).format('MM/YY')
        this.setState({
            expDate,
            date: newDate,
            showDatePicker: false,
        })
    };

    render() {
        const { name, isNameFocus, number, isNumberFocus, expDate, isexpDateFocus, cvv, isCvvFocus, showDatePicker } = this.state;
        return (
            <>
                <ScrollView>
                    <View style={styles.marginVertical}>
                        <View style={styles.generalMargin}>
                            <Text style={styles.colorTextStyle}>Payment Method</Text>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.payByCardContainer}>
                                <Text style={styles.colorTextStyle}>Pay by card: </Text>
                                <View style={styles.rowStyle}>
                                    <Icon.FontAwesome
                                        name='credit-card'
                                        style={styles.iconStyle}
                                        size={THEME.ICON_SIZE}
                                        color={THEME.COLOR_GREY} />
                                    <Icon.FontAwesome
                                        name='cc-mastercard'
                                        style={styles.iconStyle}
                                        size={THEME.ICON_SIZE}
                                        color={THEME.COLOR_GREY} />
                                    <Icon.FontAwesome
                                        name='cc-visa'
                                        style={styles.iconStyle}
                                        size={THEME.ICON_SIZE}
                                        color={THEME.COLOR_GREY} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.marginVertical}>
                        <View style={styles.contentContainer}>
                            <View style={{ alignItems: "center" }}>
                                <View style={[styles.inputContainerStyle,
                                isNumberFocus || number != '' ? THEME.inputBorder : {}]}>
                                    <FloatingInput
                                        val={number}
                                        keyboardtype={"number-pad"}
                                        onActive={() => this.setState({ isNumberFocus: true })}
                                        onInActive={() => this.setState({ isNumberFocus: false }, () => {
                                            this.handleConfirmPayment()
                                        })}
                                        label='Card Number'
                                        iconInput
                                        updateText={(number) => this.setState({ number })} />
                                    <Icon.Feather
                                        name='credit-card'
                                        style={styles.iconStyle}
                                        size={THEME.ICON_SIZE}
                                        color={THEME.COLOR_GREY} />
                                </View>
                                <View style={[styles.inputContainerStyle,
                                isNameFocus || name != '' ? THEME.inputBorder : {}]}>
                                    <FloatingInput
                                        val={name}
                                        onActive={() => this.setState({ isNameFocus: true })}
                                        onInActive={() => this.setState({ isNameFocus: false }, () => {
                                            this.handleConfirmPayment()
                                        })}
                                        label='Card Holder'
                                        iconInput
                                        updateText={(name) => this.setState({ name }, () => {
                                            this.handleConfirmPayment()
                                        })} />
                                    <Icon.Feather
                                        name='user'
                                        style={styles.iconStyle}
                                        size={THEME.ICON_SIZE}
                                        color={THEME.COLOR_GREY} />
                                </View>
                            </View>
                            <View style={styles.row}>
                                <TouchableOpacity onPress={() => this.setState({ isexpDateFocus: true, showDatePicker: true })} style={[styles.inputRowContainerStyle,
                                isexpDateFocus || expDate != '' ? THEME.inputBorder : {}]}>
                                    {
                                        expDate ?
                                            <Text style={styles.colorTextStyle}>{expDate}</Text>
                                            :
                                            <Text style={styles.colorTextStyle}>Exp Date</Text>
                                    }
                                    <Icon.Feather name='calendar' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                                </TouchableOpacity>
                                <View style={[styles.inputRowContainerStyle,
                                isCvvFocus || cvv != '' ? THEME.inputBorder : {}]}>
                                    <FloatingInput
                                        val={cvv}
                                        maxLength={3}
                                        keyboardtype={'number-pad'}
                                        onActive={() => this.setState({ isCvvFocus: true })}
                                        onInActive={() => this.setState({ isCvvFocus: false }, () => {
                                            this.handleConfirmPayment()
                                        })}
                                        label='CCV Code' iconSmallInput updateText={(cvv) => this.setState({ cvv })} />
                                    <Icon.Feather name='lock' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                                </View>
                            </View>

                            <View style={[styles.rowStyle, styles.generalMargin]}>
                                <Icon.Feather name='lock' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                                <Text style={[styles.colorTextStyle, { width: "90%" }]}>
                                    Your payment information is safe with us. We use secure transmission and encrypted storage.
                                    </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {showDatePicker ?
                    <MonthPicker
                        onChange={this.onChangeDate}
                        value={new Date()}
                        minimumDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1)}
                        maximumDate={new Date(2029, 12)}
                        enableAutoDarkMode={false}
                    />
                    : null}
            </>
        );
    }
};



export default Payment;
