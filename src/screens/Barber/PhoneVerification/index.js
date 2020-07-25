import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "./style";
import CodeInput from 'react-native-confirmation-code-input';
import { Button } from '../../../components'
import THEME from '../../../assets/styles/theme.style'

export default class PhoneVerfication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false,
            value: ''
        }
    }

    fullFillCode = (value) => {
        console.log(value)
    }

    render() {
        const { number, onVerify } = this.props
        const { value, isFocus } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle} >A verification code is sent to your number</Text>
                    <Text style={styles.textStyle} >provided<Text style={styles.numberTextStyle}>{number}</Text> </Text>
                </View>
                <View style={styles.codeContainer}>
                    <CodeInput
                        onFocus={() =>
                            this.setState({ isFocus: true })
                        }
                        codeLength={6}
                        autoFocus={false}
                        cellBorderWidth={2}
                        activeColor={THEME.PRIMARY_COLOR}
                        inactiveColor={THEME.COLOR_WHITE}
                        keyboardType='numeric'
                        className="border-box"
                        inputPosition='center'
                        value={value}
                        size={40}
                        placeholder={"*"}
                        onFulfill={(value) => this.fullFillCode(value)}
                        onCodeChange={(code) => console(code)}
                        codeInputStyle={[styles.codeInput,
                        isFocus ?
                            { borderWidth: 2, borderColor: THEME.PRIMARY_COLOR }
                            :
                            {}]} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title='Verify Number ' onPress={onVerify} />
                </View>
                <View style={styles.resendContainer}>
                    <TouchableOpacity><Text style={styles.resendTextStyle}>Resend Code</Text></TouchableOpacity>
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