

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
import { Icon, FloatingInput, DateTime } from '..';
import THEME from '../../assets/styles/theme.style';


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
        }
    }

    onChangeDate = (event, selectedDate) => {

        var expDate = (selectedDate.getMonth());
        expDate += "/";
        expDate += (selectedDate.getYear() + 1900);
        this.setState({
            expDate,
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
                                        onInActive={() => this.setState({ isNumberFocus: false })}
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
                                        onInActive={() => this.setState({ isNameFocus: false })}
                                        label='Card Holder'
                                        iconInput
                                        updateText={(name) => this.setState({ name })} />
                                    <Icon.Feather
                                        name='user'
                                        style={styles.iconStyle}
                                        size={THEME.ICON_SIZE}
                                        color={THEME.COLOR_GREY} />
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.inputRowContainerStyle,
                                isexpDateFocus || expDate != '' ? THEME.inputBorder : {}]}>
                                    <FloatingInput
                                        val={expDate}
                                        onActive={() => this.setState({ isexpDateFocus: true, showDatePicker: true })}
                                        onInActive={() => this.setState({ isexpDateFocus: false })}
                                        label='Exp Date'
                                        iconSmallInput
                                        updateText={(expDate) => this.setState({ expDate })} />
                                    <Icon.Feather name='calendar' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                                </View>
                                <View style={[styles.inputRowContainerStyle,
                                isCvvFocus || cvv != '' ? THEME.inputBorder : {}]}>
                                    <FloatingInput
                                        val={cvv}
                                        maxLength={3}
                                        keyboardtype={'number-pad'}
                                        onActive={() => this.setState({ isCvvFocus: true })}
                                        onInActive={() => this.setState({ isCvvFocus: false })}
                                        label='CCV Code' iconSmallInput updateText={(cvv) => this.setState({ cvv })} />
                                    <Icon.Feather name='lock' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                                </View>
                            </View>
                            {showDatePicker ?
                                <DateTime
                                    date
                                    onChangeDate={this.onChangeDate}
                                />
                                : null}
                            <View style={[styles.rowStyle, styles.generalMargin]}>
                                <Icon.Feather name='lock' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                                <Text style={[styles.colorTextStyle, { width: "90%" }]}>
                                    Your payment information is safe with us. We use secure transmission and encrypted storage.
                                    </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </>
        );
    }
};



export default Payment;
