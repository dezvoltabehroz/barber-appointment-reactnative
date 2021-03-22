import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { WalletServices } from '../../services';

export default class BarberEditWalletScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })
    handleConfirmPayment = (data) => {
        const { goBack } = this.props.navigation;
        WalletServices.barberWithDrawRequest(data)
            .then((res) => {
                console.log(res.data)
                if (res.data.status) {
                    goBack()
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const { navigate, goBack, setParams } = this.props.navigation;
        // console.log(this.props.navigation)
        return (
            <MainScreenPaths.Barber.BarberEditWallet
                onWithdrawalRequest={(data) => this.props.navigation.setParams({ title: data })}
                onBank={() => navigate("AddBankDetails")}
                onPayment={() => navigate("AddPaymentDetails")}
                onConfirm={(data) => this.handleConfirmPayment(data)} />
        )
    }
}
