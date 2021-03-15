import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button, Input } from '../../../components';
import styles from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import COMMON_STYLE from '../../../assets/styles/common.style';
import { WalletServices } from '../../../services';
import { connect } from 'react-redux';


class AddPaymentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name: "",
            state: "",
            city: "",
            postalCode: "",
            state: "",
            address_1: "",
            address_2: "",
            submit: false
        }
    }

    handleConfirm = () => {
        const { full_name, state, postalCode, city, address_1, address_2, submit } = this.state;
        if (submit && full_name && state && postalCode && city && address_1 && address_2) {
            let userData = {
                token: this.props.user.userData.token,
                id: this.props.user.userData.id,
                full_name: full_name,
                address_1: address_1,
                address_2: address_2,
                postal_code: postalCode,
                city: city,
                state: state,
            }
            WalletServices.addPaymentDetail(userData)
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
        const { full_name, state, postalCode, city, address_1, address_2, submit } = this.state;
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={styles.generalMarginHorizontal}>
                        <View style={styles.generalMarginTop}>
                            <Input placeholder={"Enter Full Name "}
                                value={full_name}
                                onChangeText={(full_name) => this.setState({ full_name })} />
                            {
                                submit && !full_name ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                            }
                        </View>
                        <View style={styles.generalMarginTop}>
                            <Input placeholder={"Address Line 1 "}
                                value={address_1}
                                onChangeText={(address_1) => this.setState({ address_1 })} />
                            {
                                submit && !address_1 ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                            }
                        </View>
                        <View style={styles.generalMarginTop}>
                            <Input placeholder={"Address Line 2 "}
                                value={address_2}
                                onChangeText={(address_2) => this.setState({ address_2 })} />
                            {
                                submit && !address_2 ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                            }
                        </View>
                        <View style={styles.generalMarginTop}>
                            <Input placeholder={"Postal Code "}
                                value={postalCode}
                                onChangeText={(postalCode) => this.setState({ postalCode })} />
                            {
                                submit && !postalCode ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                            }
                        </View>
                        <View style={styles.generalMarginTop}>
                            <Input placeholder={"City "}
                                value={city}
                                onChangeText={(city) => this.setState({ city })} />
                            {
                                submit && !city ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                            }
                        </View>
                        <View style={styles.generalMarginTop}>
                            <Input placeholder={"State "} value={state}
                                onChangeText={(state) => this.setState({ state })} />
                            {
                                submit && !state ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
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

export default connect(mapStateToProps)(AddPaymentDetails)