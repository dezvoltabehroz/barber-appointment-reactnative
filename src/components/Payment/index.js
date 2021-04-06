

import React, { Component } from 'react';
import {
    View,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    Modal, Image,
    FlatList
} from 'react-native';
import styles from './style'
import { Icon, FloatingInput } from '..';
import THEME from '../../assets/styles/theme.style';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import COMMON_STYLE from '../../assets/styles/common.style';
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
            date: '',
            payWithCard: false,
            payWithPayPal: false,
            payWithStripe: false,
            submit: false
        }
    }
    handleConfirmPayment = async () => {
        const { name, number, cvv, date, submit } = this.state;
        if (name && number && this.isCardValid(number) && date && cvv && cvv.length == 3 && submit) {
            console.log(" exp_year : ===> ", moment(date).format('YY'));
            console.log(" exp_month : ===> ", moment(date).format('MM'));
            let data = {
                card_number: number,
                card_holder: name,
                exp_date: moment(date).format('YYYY-MM-DD'),
                exp_year: moment(date).format('YYYY'),
                exp_month: moment(date).format('MM'),
                ccv_code: cvv
            }
            console.log("data:=====> ", data)
            await this.props.isConfirm("false", data);
            // this.setState({ name: "", number: "", date: "", cvv: "", submit: false, })
        }
    }

    onChangeDate = (event, newDate) => {
        var expDate = moment(newDate).format('MM/YY');
        console.log(moment(newDate).format('YY'))
        this.setState({
            expDate,
            date: newDate,
            showDatePicker: false,
            submit: true
        });
        this.handleConfirmPayment()
    };

    isCardValid = (number) => {
        return /^\d{16}$/.test(number)
    }

    isNameValid = (name) => {
        return /^[A-Za-z\.\s]{3,25}$/.test(name)
    }

    render() {
        const { name, isNameFocus, number, isNumberFocus, expDate, submit, date, payWithStripe, isexpDateFocus, cvv, isCvvFocus, showDatePicker, payWithPayPal, payWithCard } = this.state;
        return (
            <>
                <ScrollView>
                    <View style={styles.marginVertical}>
                        <View style={styles.generalMargin}>
                            <Text style={styles.colorTextStyle}>Payment Method</Text>
                        </View>
                        {/* <View style={styles.container}>
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
                        </View> */}
                        <View style={styles.container}>
                            <View style={[styles.payByCardContainer, { justifyContent: "center" }]}>
                                <Text style={[styles.colorTextStyle, { textAlign: "center" }]}>Pay With: </Text>
                            </View>
                            <View style={[styles.rowStyle, { marginHorizontal: '10%', marginBottom: "5%", justifyContent: "center" }]}>
                                <Icon.FontAwesome
                                    onPress={() => {
                                        this.setState({ payWithPayPal: false, payWithCard: true }, () => {
                                            this.props.paymentMethod("Credit"); this.props.isConfirm("true", {
                                                card_number: "",
                                                card_holder: "",
                                                exp_date: "",
                                                ccv_code: ""
                                            })
                                        })
                                    }}
                                    name='credit-card'
                                    style={styles.iconStyle}
                                    size={50}
                                    color={payWithCard ? THEME.PRIMARY_COLOR : THEME.COLOR_GREY} />
                                <View style={{ width: 30 }} />
                                <Icon.FontAwesome
                                    onPress={() => {
                                        this.setState({ payWithPayPal: true, payWithCard: false, payWithStripe: false }, () => {
                                            this.props.paymentMethod("Paypal"); this.props.isConfirm("false", {
                                                card_number: "",
                                                card_holder: "",
                                                exp_date: "",
                                                exp_year: "",
                                                exp_month: "",
                                                ccv_code: ""
                                            })
                                        })
                                    }}
                                    name='cc-paypal'
                                    style={styles.iconStyle}
                                    size={50}
                                    color={payWithPayPal ? THEME.PRIMARY_COLOR : THEME.COLOR_GREY} />
                                <View style={{ width: 30 }} />
                                <Icon.FontAwesome
                                    onPress={() => {
                                        this.setState({ payWithStripe: true, payWithPayPal: false, payWithCard: false, }, () => {
                                            this.props.paymentMethod("Stripe"); this.props.isConfirm("false", {
                                                card_number: "",
                                                card_holder: "",
                                                exp_year: "",
                                                exp_month: "",
                                                ccv_code: ""
                                            })
                                        })
                                    }}
                                    name='cc-stripe'
                                    style={styles.iconStyle}
                                    size={50}
                                    color={payWithStripe ? THEME.PRIMARY_COLOR : THEME.COLOR_GREY} />
                            </View>
                        </View>

                    </View>
                    {payWithPayPal ?
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ height: 250, width: 250 }} source={require('../../assets/images/paypal.png')} />
                        </View>
                        : payWithStripe ?
                            <>
                                <View style={styles.marginVertical}>
                                    <View style={styles.contentContainer}>
                                        <View style={{ marginHorizontal: '5%' }}>
                                            <View style={[styles.inputContainerStyle,
                                            isNumberFocus || number != '' ? THEME.inputBorder : {}]}>
                                                <FloatingInput
                                                    val={number}
                                                    keyboardtype={"number-pad"}
                                                    onActive={() => this.setState({ isNumberFocus: true })}
                                                    onInActive={() => this.setState({ isNumberFocus: false, submit: true }, () => {
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
                                            {
                                                submit && !number ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Please fill this field</Text> : null
                                            }
                                            {
                                                submit && number.length && !this.isCardValid(number) ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Card number is invalid</Text> : null
                                            }
                                            <View style={[styles.inputContainerStyle,
                                            isNameFocus || name != '' ? THEME.inputBorder : {}]}>
                                                <FloatingInput
                                                    val={name}
                                                    onActive={() => this.setState({ isNameFocus: true })}
                                                    onInActive={() => this.setState({ isNameFocus: false, submit: true }, () => {
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
                                            {
                                                submit && !name ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Please fill this field</Text> :
                                                    submit && !name.length ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Name is invalid</Text> : null
                                            }
                                        </View>
                                        <View style={[styles.row, { marginTop: 8, marginBottom: 15 }]}>
                                            <View>
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
                                                {
                                                    submit && !date ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Please fill this field</Text> : null
                                                }
                                            </View>
                                            <View  >
                                                <View style={[styles.inputRowContainerStyle,
                                                isCvvFocus || cvv != '' ? THEME.inputBorder : {}]}>
                                                    <FloatingInput
                                                        val={cvv}
                                                        maxLength={3}
                                                        keyboardtype={'number-pad'}
                                                        onActive={() => this.setState({ isCvvFocus: true })}
                                                        onInActive={() => this.setState({ isCvvFocus: false, submit: true }, () => {
                                                            this.handleConfirmPayment()
                                                        })}
                                                        label='CCV Code' iconSmallInput updateText={(cvv) => this.setState({ cvv })} />
                                                    <Icon.Feather name='lock' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                                                </View>
                                                {
                                                    submit && !cvv ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Please fill this field</Text> :
                                                        submit && cvv.length != 3 ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Cvv is invalid</Text> : null
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </>
                            :
                            payWithCard ?
                                <View style={styles.marginVertical}>
                                    <View style={styles.contentContainer}>
                                        <View style={{ marginHorizontal: '5%' }}>
                                            <View style={[styles.inputContainerStyle,
                                            isNumberFocus || number != '' ? THEME.inputBorder : {}]}>
                                                <FloatingInput
                                                    val={number}
                                                    keyboardtype={"number-pad"}
                                                    onActive={() => this.setState({ isNumberFocus: true })}
                                                    onInActive={() => this.setState({ isNumberFocus: false, submit: true }, () => {
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
                                            {
                                                submit && !number ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Please fill this field</Text> : null
                                            }
                                            {
                                                submit && number.length && !this.isCardValid(number) ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Card number is invalid</Text> : null
                                            }
                                            <View style={[styles.inputContainerStyle,
                                            isNameFocus || name != '' ? THEME.inputBorder : {}]}>
                                                <FloatingInput
                                                    val={name}
                                                    onActive={() => this.setState({ isNameFocus: true })}
                                                    onInActive={() => this.setState({ isNameFocus: false, submit: true }, () => {
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
                                            {
                                                submit && !name ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Please fill this field</Text>
                                                    :
                                                    submit && !name.length ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Name is invalid</Text> : null
                                            }
                                        </View>
                                        <View style={[styles.row, { marginTop: 8, marginBottom: 15 }]}>
                                            <View>
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
                                                {
                                                    submit && !date ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Please fill this field</Text> : null
                                                }
                                            </View>
                                            <View  >
                                                <View style={[styles.inputRowContainerStyle,
                                                isCvvFocus || cvv != '' ? THEME.inputBorder : {}]}>
                                                    <FloatingInput
                                                        val={cvv}
                                                        maxLength={3}
                                                        keyboardtype={'number-pad'}
                                                        onActive={() => this.setState({ isCvvFocus: true })}
                                                        onInActive={() => this.setState({ isCvvFocus: false, submit: true }, () => {
                                                            this.handleConfirmPayment()
                                                        })}
                                                        label='CCV Code' iconSmallInput updateText={(cvv) => this.setState({ cvv })} />
                                                    <Icon.Feather name='lock' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                                                </View>
                                                {
                                                    submit && !cvv ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Please fill this field</Text> :
                                                        submit && cvv.length != 3 ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Cvv is invalid</Text> : null
                                                }
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
                                :
                                null}
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
