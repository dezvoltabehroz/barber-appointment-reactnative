import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Icon } from '../../../components';
import styles from './style'
import Add from '../../../assets/svg/add-button.svg'
import THEME from '../../../assets/styles/theme.style';
import { TouchableOpacity } from 'react-native';
import { WalletServices } from '../../../services';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class EditWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthly: "",
            yearly: "",
            balance: "",
            bankDetail: true,
            paymentDetails: false,
            bankName: "",
            paymentAddress: ""
        }
    }

    componentDidMount = () => {
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
        const { bankDetail, paymentDetails, bankName, loading, paymentAddress, monthly, yearly, balance } = this.state;
        const { onBank, onPayment } = this.props;
        return (
            <View style={styles.container}>
                {
                    loading ?
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator />
                        </View>
                        :
                        <>
                            <View style={styles.rowStyle}>
                                <View style={styles.rowContainer}>
                                    <Text style={[styles.textStyle, { width: screenWidth * 0.65 }]}>{bankName != "" ? bankName : "Add your bank account"}</Text>
                                    <TouchableOpacity disabled={!bankDetail} onPress={() => onBank()}>
                                        <Add height={20} width={20} />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => this.setState({ bankDetail: true, paymentDetails: false })} style={{ justifyContent: "center" }}>
                                    <Icon.MaterialIcons size={25} name={bankDetail ? "radio-button-checked" : "radio-button-unchecked"} color={THEME.PRIMARY_COLOR} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.rowStyle}>
                                <View style={styles.rowContainer}>
                                    <Text style={[styles.textStyle, { width: screenWidth * 0.65 }]}>{paymentAddress != "" ? paymentAddress : "Add payment address (physical check)"}</Text>
                                    <TouchableOpacity disabled={!paymentDetails} onPress={() => onPayment()}>
                                        <Add height={20} width={20} />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => this.setState({ bankDetail: false, paymentDetails: true })} style={{ justifyContent: "center" }}>
                                    <Icon.MaterialIcons size={25} name={paymentDetails ? "radio-button-checked" : "radio-button-unchecked"} color={THEME.PRIMARY_COLOR} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: "5%", marginHorizontal: "10%" }}>
                                <Text style={styles.whiteText}>Earnings this month: {monthly}.00 USD</Text>
                                <Text style={styles.whiteText}>Balance: {balance}.00 USD</Text>
                                <Text style={styles.whiteText}>Earning this year: {yearly}.00 USD</Text>
                                <Text style={styles.colorText}>{`Important Note:\nAdd your bank account details if you want payment to be sent in bank account or fill the payment address that will be used to mail the check.\nThe balance always will be transferred every monday.`}</Text>
                            </View>
                        </>
                }
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