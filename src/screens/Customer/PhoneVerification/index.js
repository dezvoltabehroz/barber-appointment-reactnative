import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from "./style";
import CodeInput from 'react-native-confirmation-code-input';
import { Button } from '../../../components';
import THEME from "../../../assets/styles/theme.style";


export default class PhoneVerfication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    _onFulfill(isValid){
        this.setState({value:isValid})
    }

    render() {
        const { number, onVerify, onResend } = this.props
        const { value } = this.state;
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
                        cellBorderWidth={2}
                        compareWithCode={this.props.verificationCode}
                        activeColor={THEME.PRIMARY_COLOR}
                        inactiveColor={THEME.COLOR_WHITE}
                        keyboardType='numeric'
                        className="border-box"
                        inputPosition='center'
                        value={value}
                        size={40}
                        placeholder={"*"}
                        onFulfill={(isValid) => this._onFulfill(isValid)}
                        // onCodeChange={(code) => this.setState({ value: code })}
                        codeInputStyle={[styles.codeInput, value != '' ? THEME.inputBorder : {}]} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title='Verify Number ' loading={this.props.loading} onPress={()=>onVerify(value)} />
                </View>
                <View style={styles.resendContainer}>
                    <TouchableOpacity onPress={onResend}><Text style={styles.resendTextStyle}>Resend Code</Text></TouchableOpacity>
                </View>
                <View style={styles.termANdConditionContainer}>
                    <Text style={styles.termTextStyle}>By tapping Verify number above, you agree</Text>
                    <Text style={styles.termTextStyle}>to the <Text style={styles.termANdConditionTextStyle} >Term of Service</Text>,<Text style={styles.termANdConditionTextStyle} > Privacy Policy</Text>, and</Text>
                    <Text style={styles.termANdConditionTextStyle}>  Cookies Policy</Text>
                </View>
            </View>
        )
    }
}