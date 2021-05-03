

import React, { Component } from 'react';
import {
    View,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import styles from './style'
import { Icon, FloatingInput } from '..';
import THEME from '../../assets/styles/theme.style';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import COMMON_STYLE from '../../assets/styles/common.style';
import { connect } from 'react-redux';
import { BookingServices } from '../../services';
import Modal from 'react-native-modal';
import { Input } from 'react-native-elements';

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
            payWithPayPal: true,
            payWithStripe: false,
            submit: false,
            previousBillingModal: false,
            billingLoading: false,
            cardData: {}
        }
    }

    componentDidMount = () => {

        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token
        }
        BookingServices.getCardDetails(userData)
            .then((response) => {
                if (response.data.status) {
                    this.setState({
                        name: response.data.data.card_holder,
                        number: response.data.data.card_number,
                        expDate: response.data.data.exp_date,
                        cvv: response.data.data.ccv_code,
                        cardData: response.data.data
                    }, () => {
                        this.props.paymentMethod("Paypal");
                        this.props.isConfirm("false", {
                            card_number: "",
                            card_holder: "",
                            exp_date: "",
                            exp_year: "",
                            exp_month: "",
                            ccv_code: ""
                        })
                    })
                } else {
                    this.setState({
                        name: "",
                        number: "",
                        expDate: "",
                        cvv: "",
                        cardData: ""
                    }, () => {
                        this.props.paymentMethod("Paypal");
                        this.props.isConfirm("false", {
                            card_number: "",
                            card_holder: "",
                            exp_date: "",
                            exp_year: "",
                            exp_month: "",
                            ccv_code: ""
                        })
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                alert(err);
                this.setState({ billingLoading: false })
            })
    }

    handleConfirmPayment = async () => {
        const { name, number, cvv, date, expDate, submit } = this.state;
        if (name && number && this.isCardValid(number) && expDate && cvv && cvv.length == 3 && submit) {
            console.log(" exp_year : ===> ", moment(expDate).format('YY'));
            console.log(" exp_month : ===> ", moment(expDate).format('MM'));
            let data = {
                card_number: number,
                card_holder: name,
                exp_date: moment(expDate).format('YYYY-MM'),
                exp_year: moment(expDate).format('YYYY'),
                exp_month: moment(expDate).format('MM'),
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
            expDate: newDate,
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

    handlePreviousBillingDetail = () => {
        this.setState({ billingLoading: true })

    }

    render() {
        const { cardData, name, isNameFocus, number, isNumberFocus, expDate, submit, date, payWithStripe, isexpDateFocus, cvv, isCvvFocus, showDatePicker, payWithPayPal, payWithCard } = this.state;
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
                                {/* <Icon.FontAwesome
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
                                <View style={{ width: 30 }} /> */}
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
                                        this.setState({ payWithStripe: true, previousBillingModal: cardData.card_holder != undefined ? true : false, payWithPayPal: false, payWithCard: false, }, () => {
                                            if (cardData.card_holder == undefined) {
                                                this.props.paymentMethod("Stripe");
                                                this.props.isConfirm("true", {
                                                    card_number: "",
                                                    card_holder: "",
                                                    exp_date: "",
                                                    exp_year: "",
                                                    exp_month: "",
                                                    ccv_code: ""
                                                })
                                            }

                                        })
                                    }}
                                    name='credit-card'
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
                                            {/* <View style={[styles.inputContainerStyle,
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
                                            </View> */}
                                            <View style={[styles.inputContainer,
                                            isNumberFocus || number != '' ? THEME.inputBorder : {}]}>
                                                <Input
                                                    value={number}
                                                    label={isNumberFocus && number.length ? "Card Number" : ""}
                                                    maxLength={16}
                                                    keyboardType={"number-pad"}
                                                    onFocus={() => this.setState({ isNumberFocus: true })}
                                                    onBlur={() => this.setState({ isNumberFocus: false, submit: true }, () => {
                                                        this.handleConfirmPayment()
                                                    })}
                                                    containerStyle={styles.containerStyle}
                                                    labelStyle={styles.labelStyle}
                                                    inputContainerStyle={styles.inputContainerStyle}
                                                    inputStyle={styles.inputStyle}
                                                    rightIcon={
                                                        <Icon.Feather
                                                            name='credit-card'
                                                            style={styles.iconStyle}
                                                            size={THEME.ICON_SIZE}
                                                            color={THEME.COLOR_GREY} />
                                                    }
                                                    placeholder="Card Number"
                                                    onChangeText={(number) => this.setState({ number }, () => {
                                                        this.handleConfirmPayment()
                                                    })} />
                                            </View>
                                            {
                                                submit && !number ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Please fill this field</Text> : null
                                            }
                                            {
                                                submit && number.length && !this.isCardValid(number) ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Card number is invalid</Text> : null
                                            }
                                            <View style={[styles.inputContainer,
                                            isNameFocus || name != '' ? THEME.inputBorder : {}]}>

                                                <Input
                                                    value={name}
                                                    label={isNameFocus && name.length ? "Card Holder" : ""}
                                                    maxLength={16}
                                                    onFocus={() => this.setState({ isNameFocus: true })}
                                                    onBlur={() => this.setState({ isNameFocus: false, submit: true }, () => {
                                                        this.handleConfirmPayment()
                                                    })}
                                                    containerStyle={styles.containerStyle}
                                                    labelStyle={styles.labelStyle}
                                                    inputContainerStyle={styles.inputContainerStyle}
                                                    inputStyle={styles.inputStyle}
                                                    rightIcon={
                                                        <Icon.Feather
                                                            name='user'
                                                            style={styles.iconStyle}
                                                            size={THEME.ICON_SIZE}
                                                            color={THEME.COLOR_GREY} />
                                                    }
                                                    placeholder="Card Holder"
                                                    onChangeText={(name) => this.setState({ name }, () => {
                                                        this.handleConfirmPayment()
                                                    })} />
                                            </View>
                                            {
                                                submit && !name ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Please fill this field</Text> :
                                                    submit && !name.length ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Name is invalid</Text> : null
                                            }
                                        </View>
                                        <View style={[styles.row, { marginTop: 8,}]}>
                                            <View>
                                                <TouchableOpacity onPress={() => this.setState({ isexpDateFocus: true, showDatePicker: true })} style={[styles.inputRowContainerStyle, { height: 60 },
                                                isexpDateFocus || expDate != '' ? THEME.inputBorder : {}]}>
                                                    {
                                                        expDate ?
                                                            <Text style={styles.colorTextStyle}>{moment(expDate).format('MM/YY')}</Text>
                                                            :
                                                            <Text style={styles.colorTextStyle}>Exp Date</Text>
                                                    }
                                                    <Icon.Feather name='calendar' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                                                </TouchableOpacity>

                                            </View>
                                            <View  >
                                                <View style={[styles.inputRowContainerStyle,
                                                isCvvFocus || cvv != '' ? THEME.inputBorder : {}]}>
                                                    <Input
                                                        value={cvv}
                                                        label={isCvvFocus && cvv.length ? "CCV Code" : ""}
                                                        maxLength={3}
                                                        onFocus={() => this.setState({ isCvvFocus: true })}
                                                        onBlur={() => this.setState({ isCvvFocus: false, submit: true }, () => {
                                                            this.handleConfirmPayment()
                                                        })}
                                                        containerStyle={styles.containerStyle}
                                                        labelStyle={styles.labelStyle}
                                                        inputContainerStyle={styles.inputContainerStyle}
                                                        inputStyle={styles.inputStyle}
                                                        rightIcon={
                                                            <Icon.Feather
                                                                name='lock'
                                                                style={styles.iconStyle}
                                                                size={THEME.ICON_SIZE}
                                                                color={THEME.COLOR_GREY} />
                                                        }
                                                        placeholder="CCV Code"
                                                        onChangeText={(cvv) => this.setState({ cvv }, () => {
                                                            this.handleConfirmPayment()
                                                        })} />
                                                </View>

                                            </View>
                                        </View>
                                        <View style={[styles.rowStyle, { flex: 1, justifyContent: "space-evenly", marginHorizontal: "5%" }]}>
                                            <View style={[styles.witdh, { flex: 0.5 }]}>
                                                {
                                                    submit && !expDate ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%', color: "white" }]}>Please fill this field</Text> : null
                                                }
                                            </View>
                                            <View style={[styles.witdh, { flex: 0.5 }]}>
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
                                                    maxLength={16}
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
                <Modal isVisible={this.state.previousBillingModal}>
                    <View style={{ backgroundColor: '#171717', paddingVertical: "5%" }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: "5%", marginHorizontal: '6%' }}>
                            <Text style={{ fontFamily: "Poppins-Medium", textAlign: "center", color: "white" }}>Do you want to use previous billing {`\n`}details?</Text>
                        </View>
                        <View style={{ paddingTop: '7.5%', marginHorizontal: "10%", flexDirection: "row", justifyContent: "space-between", paddingBottom: '5%', }}>
                            <TouchableOpacity onPress={() => {
                                this.setState({ previousBillingModal: false, number: "", name: "", expDate: "", cvv: "", submit: false }, () => {
                                    this.props.paymentMethod("Stripe"); this.props.isConfirm("true", {
                                        card_number: "",
                                        card_holder: "",
                                        exp_date: "",
                                        exp_year: "",
                                        exp_month: "",
                                        ccv_code: ""
                                    })
                                })
                            }} style={{ width: 120, backgroundColor: THEME.PRIMARY_COLOR, height: 50, justifyContent: 'center' }}>
                                <Text style={{ color: '#171717', textAlign: 'center', fontFamily: 'Poppins-Bold' }} >No, Add New</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({
                                previousBillingModal: false, payWithStripe: true,
                                name: cardData.card_holder,
                                number: cardData.card_number,
                                expDate: cardData.exp_date,
                                cvv: cardData.ccv_code,
                            }, () => {
                                this.props.paymentMethod("Stripe");
                                if (cardData.card_holder && cardData.card_number && this.isCardValid(cardData.card_number) && cardData.exp_date && cardData.ccv_code && cardData.ccv_code.length == 3) {
                                    console.log(" exp_year : ===> ", moment(cardData.exp_date).format('YY'));
                                    console.log(" exp_month : ===> ", moment(cardData.exp_date).format('MM'));
                                    let data = {
                                        card_number: cardData.card_number,
                                        card_holder: cardData.card_holder,
                                        exp_date: moment(cardData.exp_date).format('YYYY-MM'),
                                        exp_year: moment(cardData.exp_date).format('YYYY'),
                                        exp_month: moment(cardData.exp_date).format('MM'),
                                        ccv_code: cardData.ccv_code
                                    }
                                    console.log("data:=====> ", data)
                                    this.props.isConfirm("false", data);
                                    // this.setState({ name: "", number: "", date: "", cvv: "", submit: false, })
                                }
                            })} style={{ width: 120, backgroundColor: THEME.PRIMARY_COLOR, height: 50, justifyContent: 'center' }}>
                                <Text style={{ color: '#171717', textAlign: 'center', fontFamily: 'Poppins-Bold' }} >Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </>
        );
    }
};
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(Payment);
