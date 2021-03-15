import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Input } from '../../../components';
import styles from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import COMMON_STYLE from '../../../assets/styles/common.style';
import { WalletServices } from '../../../services';
import { connect } from 'react-redux';
import { Alert } from 'react-native';

class AddBankDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountName: "",
            accountNumber: "",
            swiftCode: "",
            routingNumber: "",
            bankAddress: "",
            yourAddress: "",
            submit: false
        }
    }

    handleConfirm = () => {
        const { accountName, accountNumber, swiftCode, routingNumber, bankAddress, yourAddress, submit } = this.state;
        if (submit && accountName && accountNumber && swiftCode && routingNumber && bankAddress && yourAddress) {
            let userData = {
                token: this.props.user.userData.token,
                id: this.props.user.userData.id,
                acc_name: accountName,
                acc_num: accountNumber,
                routing_num: routingNumber,
                swift_code: swiftCode,
                bank_address: bankAddress,
                local_address: yourAddress,
            }
            WalletServices.addBankDetail(userData)
                .then((response) => {
                    if (response.data.status) {
                        Alert.alert("Success", response.data.message, [
                            {
                                text: "Cancel",
                                // onPress: () => this.handleCancel(),
                                style: "cancel"
                            },
                            { text: "OK", onPress: () => this.props.goBack() }
                        ])
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }


    render() {
        const { accountName, accountNumber, swiftCode, routingNumber, bankAddress, yourAddress, submit } = this.state;
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={styles.generalMarginHorizontal}>
                        <View style={styles.generalMarginTop}>
                            <Input
                                placeholder={"Enter Account Name "}
                                value={accountName}
                                onChangeText={(accountName) => this.setState({ accountName })} />
                            {
                                submit && !accountName ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                            }
                        </View>
                        <View style={styles.generalMarginTop}>
                            <Input
                                placeholder={"Enter Account Number "}
                                value={accountNumber}
                                onChangeText={(accountNumber) => this.setState({ accountNumber })} />
                            {
                                submit && !accountNumber ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                            }
                        </View>
                        <View style={styles.generalMarginTop}>
                            <Input
                                placeholder={"Enter Routing Number "}
                                value={routingNumber}
                                onChangeText={(routingNumber) => this.setState({ routingNumber })}
                            />
                            {
                                submit && !routingNumber ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                            }
                        </View>
                        <View style={styles.generalMarginTop}>
                            <Input
                                placeholder={"Enter Swift Code "}
                                value={swiftCode}
                                onChangeText={(swiftCode) => this.setState({ swiftCode })}
                            />
                            {
                                submit && !swiftCode ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                            }
                        </View>
                        <View style={styles.generalMarginTop}>
                            <Input
                                placeholder={"Enter Bank Address "}
                                value={bankAddress}
                                onChangeText={(bankAddress) => this.setState({ bankAddress })}
                            />
                            {
                                submit && !bankAddress ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                            }
                        </View>
                        <View style={styles.generalMarginTop}>
                            <Input
                                placeholder={"Enter Your Local Address "}
                                value={yourAddress}
                                onChangeText={(yourAddress) => this.setState({ yourAddress })}
                            />
                            {
                                submit && !yourAddress ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                            }
                        </View>
                        <View style={{ marginTop: "5%", marginHorizontal: "2.5%" }}>
                            <Button title="Confirm" onPress={() => this.setState({ submit: true }, () => this.handleConfirm())} />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(AddBankDetails)