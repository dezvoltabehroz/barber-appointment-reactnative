import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import styles from "./style";
import CodeInput from 'react-native-confirmation-code-input';
import { Button, FloatingInput } from '../../components';
import THEME from "../../assets/styles/theme.style";
import COMMON_STYLE from '../../assets/styles/common.style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '', email: '',
            isEmailFocus: false,
            submit: false
        }
    }

    _onFulfill(isValid) {
        this.setState({ value: isValid })
    }


    isEmailValid(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    }

    render() {
        const { number, onVerify, onComplete } = this.props
        const { value, email, isEmailFocus, submit } = this.state;
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={styles.imageContainer}>
                        <Image style={styles.imageStyle} source={require('../../assets/images/password.png')} resizeMode="contain" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>Enter Your Email to reset your password</Text>
                    </View>
                    <View style={styles.phoneTextContainer}>
                        <View style={[styles.inputContainerStyle, submit ? { marginBottom: "8%" } : styles.inputContainerStyle,
                        isEmailFocus || email != '' ? THEME.inputBorder : {}]}>
                            <FloatingInput
                                label={"Email"}
                                val={email}
                                keyboardtype="email-address"
                                onActive={() => this.setState({ isEmailFocus: true, })}
                                onInActive={() => this.setState({ isEmailFocus: false, submit: true })}
                                updateText={(email) => this.setState({ email })} />
                            {
                                submit && !email ? <Text style={[COMMON_STYLE.errorText, submit ? styles.onSubmitTrue : {}]}>Please fill this field</Text> : null
                            }
                            {
                                submit && email.length && !this.isEmailValid(email) ? <Text style={[COMMON_STYLE.errorText, submit ? styles.onSubmitTrue : {}]}>Email is invalid</Text> : null
                            }
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button loading={this.props.loading} disabled={email ? false : true} title='Confirm' onPress={() => onComplete(email)} />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}