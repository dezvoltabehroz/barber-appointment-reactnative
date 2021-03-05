import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from "./style";
import CodeInput from 'react-native-confirmation-code-input';
import { Button, Icon } from '../../../components';
import THEME from "../../../assets/styles/theme.style";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { authActions } from '../../../redux/actions/auth';
import Modal from 'react-native-modal';

class PhoneVerfication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            disabled: true,
        }
    }

    _onFulfill(isValid) {
        this.setState({ value: isValid })
    }

    render() {
        const { number, onVerify, onResend } = this.props
        const { value } = this.state;
        console.log(this.props.user)
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle} >A verification code is sent to your number</Text>
                    <Text style={styles.textStyle} >provided<Text style={styles.numberTextStyle}>{number}</Text> </Text>
                </View>
                <View style={styles.codeContainer}>
                    <CodeInput
                        codeLength={6}
                        autoFocus={false}
                        ref="codeInputRef1"
                        cellBorderWidth={0}
                        activeColor={THEME.PRIMARY_COLOR}
                        inactiveColor={THEME.COLOR_WHITE}
                        keyboardType='numeric'
                        className="border-box"
                        inputPosition='center'
                        value={value}
                        size={40}
                        placeholder={""}
                        onFulfill={(isValid) => this._onFulfill(isValid)}
                        onCodeChange={(code) => this.setState({ value: code })}
                        codeInputStyle={[styles.codeInput, value != '' ? THEME.inputBorder : {}]} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title='Verify Number ' disabled={this.state.value == '' ? true : false} loading={this.props.loading} onPress={async () => { await onVerify(value); this.setState({ value: '' }) }} />
                </View>
                <View style={styles.resendContainer}>
                    <TouchableOpacity onPress={onResend}><Text style={styles.resendTextStyle}>Resend Code</Text></TouchableOpacity>
                </View>
                <View style={styles.termANdConditionContainer}>
                    <Text style={styles.termTextStyle}>By tapping Verify number above, you agree</Text>
                    <Text style={styles.termTextStyle}>to the <Text style={styles.termANdConditionTextStyle} >Term of Service</Text>,<Text style={styles.termANdConditionTextStyle} > Privacy Policy</Text>, and</Text>
                    <Text style={styles.termANdConditionTextStyle}>  Cookies Policy</Text>
                </View>
                <Modal isVisible={this.props.user.wrongCode}>
                <View style={{ backgroundColor: '#171717', paddingVertical: "5%" }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: "5%", marginHorizontal: '6%' }}>
                            <View style={{ height: 50, width: 50, borderRadius: 25, justifyContent: "center", alignItems: "center", backgroundColor: "#FF0000" }} >
                                <Icon.Ionicons name={"close"} size={40} color={'#000'} />
                            </View>
                            <Text style={{ fontFamily: "Poppins-Medium", textAlign: "center", paddingTop: "5%", color: "white" }}>You have put the wrong verificationcode. Please retry or press Resend Code to get a new one</Text>
                        </View>
                        <View style={{ paddingTop: '5%', marginHorizontal: "25%", paddingBottom: '5%', }}>
                            <TouchableOpacity onPress={() => { this.props.authActions.wrongCode(false) }} style={{ backgroundColor: THEME.PRIMARY_COLOR, height: 50, justifyContent: 'center' }}>
                                <Text style={{ color: '#171717', textAlign: 'center', fontFamily: 'Poppins-Bold' }} >Continue</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.props.user.codeExpire}>
                    <View style={{ backgroundColor: '#171717', paddingVertical: "5%" }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: "5%", marginHorizontal: '6%' }}>
                            <View style={{ height: 50, width: 50, borderRadius: 25, justifyContent: "center", alignItems: "center", backgroundColor: "#FF0000" }} >
                                <Icon.FontAwesome5 name={"exclamation"} size={40} color={'#000'} />
                            </View>
                            <Text style={{ fontSize: 12, fontFamily: "Poppins-Medium", textAlign: "center", paddingTop: "5%", color: "white" }}>The sms code has expired. Please re-send the verification code to try again!</Text>
                        </View>
                        <View style={{ paddingTop: '5%', marginHorizontal: "25%", paddingBottom: '5%', }}>
                            <TouchableOpacity onPress={() => { this.props.authActions.codeExpire(false) }} style={{ backgroundColor: THEME.PRIMARY_COLOR, height: 50, justifyContent: 'center' }}>
                                <Text style={{ color: '#171717', textAlign: 'center', fontFamily: 'Poppins-Bold' }} >Continue</Text>
                            </TouchableOpacity>
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

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerfication);