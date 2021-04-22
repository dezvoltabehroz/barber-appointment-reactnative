import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Button, Icon, Input } from '../../../components';
import styles from './style'
import Add from '../../../assets/svg/add-button.svg'
import Edit from '../../../assets/svg/edit 1.svg'
import Tick from '../../../assets/svg/tick.svg'
import THEME from '../../../assets/styles/theme.style';
import { TouchableOpacity } from 'react-native';
import { WalletServices } from '../../../services';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native';
import Modal from 'react-native-modal';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class EditWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthly: "",
            yearly: "",
            balance: "",
            bankDetail: false,
            paymentDetails: false,
            bankName: "",
            paymentAddress: "",
            withdrawalRequest: false,
            amount: null,
            fundModal: false,
            modalLoading: false
        }
    }

    componentDidMount = () => {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.getDetails();
        })
    }

    getDetails = () => {
        this.setState({ loading: true })
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token
        }
        WalletServices.viewWalletDetails(userData)
            .then((response) => {
                if (response.data.status) {
                    WalletServices.getBalance(userData)
                        .then((res) => {
                            if (res.data.status) {
                                console.log(response.data)
                                this.setState({
                                    monthly: res.data.data.monthly,
                                    yearly: res.data.data.yearly,
                                    balance: res.data.data.balance,
                                    bankName: response.data.bankData != undefined ? response.data.bankData.bank_address : "",
                                    paymentAddress: response.data.paymentData != undefined ? response.data.paymentData.address_1 : "",
                                    loading: false
                                })
                            }
                        })
                        .catch((err) => console.log(err))
                }
            })
            .catch((err) => console.log(err))
    }

    render() {
        const { bankDetail, paymentDetails, modalLoading, bankName, fundModal, loading, paymentAddress, amount, monthly, yearly, balance, withdrawalRequest } = this.state;
        const { onBank, onPayment } = this.props;
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        loading ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <ActivityIndicator />
                            </View>
                            :
                            <>
                                {
                                    withdrawalRequest ?
                                        <>
                                            <View style={{ marginTop: "5%", marginHorizontal: "5%", marginBottom: 10 }}>
                                                <Text style={styles.whiteText}>Payment Method: {bankDetail ? "Bank Transfer" : "Mail Check"}</Text>
                                            </View>
                                            <View style={styles.rowStyle}>
                                                <View style={[styles.rowContainer, { width: '100%' }]}>
                                                    <Text style={styles.textStyle}>{bankDetail ? bankName : paymentDetails ? paymentAddress : ""}</Text>
                                                </View>
                                            </View>
                                            <View style={{ marginTop: "5%", }}>
                                                <View style={{ marginHorizontal: "5%", marginBottom: 10 }}>
                                                    <Text style={styles.whiteText}>Balance: {balance - (amount <= balance ? amount : 0)}.00 USD</Text>
                                                </View>
                                                <View style={{ marginHorizontal: "2.5%" }}>
                                                    <Input placeholder="Enter Amount" value={amount} keyboardType={"number-pad"} onChangeText={(amount) => {
                                                        this.setState({ amount }); if (amount > balance) {
                                                            alert("Please enter amount should be equal to or less than the balance!")
                                                        }
                                                    }} />
                                                </View>
                                                <View style={{ marginHorizontal: "5%" }}><Text style={{ fontSize: 8, color: "#ffffff" }}>Amount should be equal to or less than the balance</Text></View>
                                            </View>
                                            <View style={{ marginTop: "10%", justifyContent: "center", marginHorizontal: "10%" }}>
                                                <Button disabled={amount != null && amount <= balance ? false : true} title="Confirm" onPress={() => this.setState({ fundModal: true })} />
                                            </View>
                                        </>
                                        :
                                        <>
                                            <View style={{ marginTop: "5%", marginHorizontal: "5%", marginBottom: 10 }}>
                                                <Text style={styles.whiteText}>Bank Account Details:</Text>
                                            </View>
                                            <View style={styles.rowStyle}>
                                                <View style={[styles.rowContainer, { backgroundColor: bankDetail == false && paymentDetails == true ? "#A8A8A8" : "#171717" }]}>
                                                    <Text style={[paymentDetails == true && bankDetail == false ? styles.whiteText : styles.textStyle, { width: screenWidth * 0.65 }]}>{bankName != "" ? bankName : "Add your bank account"}</Text>
                                                    {paymentDetails == true && bankDetail == false ?
                                                        <View style={{ width: 20 }}></View>
                                                        :
                                                        <TouchableOpacity onPress={() => onBank()}>
                                                            {

                                                                bankName != "" ?
                                                                    <Edit height={20} width={20} />
                                                                    :
                                                                    <Add height={20} width={20} />

                                                            }
                                                        </TouchableOpacity>}
                                                </View>
                                                <TouchableOpacity onPress={() => this.setState({ bankDetail: true, paymentDetails: false })} style={{ justifyContent: "center" }}>
                                                    <Icon.MaterialIcons size={25} name={bankDetail ? "radio-button-checked" : "radio-button-unchecked"} color={THEME.PRIMARY_COLOR} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ marginTop: "5%", marginHorizontal: "5%", marginBottom: 10 }}>
                                                <Text style={styles.whiteText}>Address for Check Delivery:</Text>
                                            </View>
                                            <View style={styles.rowStyle}>
                                                <View style={[styles.rowContainer, { backgroundColor: paymentDetails == false && bankDetail == true ? "#A8A8A8" : "#171717" }]}>
                                                    <Text style={[paymentDetails == false && bankDetail == true ? styles.whiteText : styles.textStyle, { width: screenWidth * 0.65 }]}>{paymentAddress != "" ? paymentAddress : "Add payment address (physical check)"}</Text>
                                                    {paymentDetails == false && bankDetail == true ?
                                                        <View style={{ width: 20 }}></View>
                                                        :
                                                        <TouchableOpacity onPress={() => onPayment()}>
                                                            {
                                                                paymentAddress != "" ?
                                                                    <Edit height={20} width={20} />
                                                                    :
                                                                    <Add height={20} width={20} />
                                                            }
                                                        </TouchableOpacity>}
                                                </View>
                                                <TouchableOpacity onPress={() => this.setState({ bankDetail: false, paymentDetails: true })} style={{ justifyContent: "center" }}>
                                                    <Icon.MaterialIcons size={25} name={paymentDetails ? "radio-button-checked" : "radio-button-unchecked"} color={THEME.PRIMARY_COLOR} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ marginTop: "5%", marginHorizontal: "7.5%" }}>
                                                <Text style={styles.whiteText}>Earnings this month: {monthly}.00 USD</Text>
                                                <Text style={styles.whiteText}>Balance: {balance}.00 USD</Text>
                                                <Text style={styles.whiteText}>Earning this year: {yearly}.00 USD</Text>
                                                <Text style={styles.colorText}>{`Important Note:\nAdd your bank account details if you want payment to be sent in bank account or fill the payment address that will be used to mail the check.\nThe balance always will be transferred every monday.`}</Text>
                                            </View>
                                            <View style={{ marginTop: "10%", justifyContent: "center", marginHorizontal: "10%" }}>
                                                <Button disabled={(paymentDetails == true && paymentAddress != "") ? false : (bankDetail == true && bankName != "") ? false : true} title="Withdrawal Request" onPress={() => { this.props.onWithdrawalRequest("Withdrawal Request"); this.setState({ withdrawalRequest: true }) }} />
                                            </View>
                                        </>}
                            </>
                    }
                </ScrollView>
                <Modal isVisible={fundModal}>
                    <View style={{ backgroundColor: '#171717', paddingVertical: "5%" }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: "5%", marginHorizontal: '10%' }}>
                            <Tick height={100} width={100} />
                            <Text style={{ fontFamily: "Poppins-Medium", textAlign: "center", paddingTop: "5%", color: "white" }}>Your request is submitted. Funds will be transfered with in 5 working days. You will get reciept and detailed calculations via email.{`\n`}Thanks</Text>
                        </View>
                        <View style={{ paddingTop: '5%', marginHorizontal: "10%", paddingBottom: '5%', }}>
                            {
                                modalLoading ?
                                    <ActivityIndicator size={'large'} color={THEME.PRIMARY_COLOR} />
                                    :
                                    <TouchableOpacity onPress={() => { this.setState({ modalLoading: true }); this.props.onConfirm({ id: this.props.user.userData.id, amount: amount, type: bankDetail ? "bank_address" : "payment_address", token: this.props.user.userData.token });}} style={{ backgroundColor: THEME.PRIMARY_COLOR, height: 50, justifyContent: 'center', width: "100%" }}>
                                        <Text style={{ color: '#171717', textAlign: 'center', fontFamily: 'Poppins-Bold' }} >Ok</Text>
                                    </TouchableOpacity>}
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(EditWallet)