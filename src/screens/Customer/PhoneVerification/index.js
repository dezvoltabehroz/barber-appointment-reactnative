import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "./style";
import CodeInput from 'react-native-confirmation-code-input';
import { Button } from '../../../components'


export default class PhoneVerfication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false,
            value: ''
        }
    }
    fulFil=(isvalid)=>{
        
        console.log("Code is valid =", isvalid)
        this.setState({isvalid});
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
                        // ref="codeInputRefs"
                        onFocus={() => this.setState({ isFocus: true })}
                        // onBlur={() => this.setState({ isFocus: false })}
                        codeLength={6}
                        compareWithCode={"123456"}
                        autoFocus={false}
                        cellBorderWidth={2}
                        activeColor='#00A9A5'
                        // inactiveColor='#fff'
                        keyboardType='numeric'
                        className="border-box"
                        inputPosition='center'
                        value={value}
                        size={40}
                        placeholder={"*"}
                        onFulfill={(isvalid) => this.fulFil(isvalid) }
                        // onCodeChange={(code) => console(code)}
                        codeInputStyle={[styles.codeInput, isFocus || value != '' ? {
                            borderWidth: 2,
                            borderColor: '#00A9A5',
                        } : {}]} />
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