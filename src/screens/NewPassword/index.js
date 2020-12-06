import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import styles from "./style";
import CodeInput from 'react-native-confirmation-code-input';
import { Button, FloatingInput } from '../../components';
import THEME from "../../assets/styles/theme.style";
import COMMON_STYLE from '../../assets/styles/common.style';
export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            password: '',
            isPasswordFocus: false,
            confirmPassword: '',
            isConfirmPasswordFocus: false,
            submit: false
        }
    }

    _onFulfill(isValid) {
        this.setState({ value: isValid })
    }

    isPasswordValid(password) {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
    }

    render() {
        const { number, onVerify, onComplete } = this.props
        const { password, isPasswordFocus, isConfirmPasswordFocus, confirmPassword, submit } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.imageStyle} source={require('../../assets/images/password-window.png')} resizeMode="contain" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>Enter your new password</Text>
                </View>
                <View style={styles.upperContainer}>

                    <View style={[styles.inputContainerStyle, password.length && !this.isPasswordValid(password) ? { marginBottom: 0 } : { marginBottom: submit && !password ? 0 : submit ? '6%' : '5%' },
                    isPasswordFocus || password != '' ? THEME.inputBorder : {}]}>
                        <FloatingInput
                            val={password}
                            secureEntry
                            onActive={() => this.setState({ isPasswordFocus: true })}
                            onInActive={() => this.setState({ isPasswordFocus: false, submit: true })}
                            label='New Password' updateText={(password) => this.setState({ password })} />

                    </View>
                    <View style={{ marginHorizontal: '10%' }}>
                        {
                            submit && !password ? <Text style={[COMMON_STYLE.errorText]}>Please fill this field</Text> : null
                        }
                        {
                            password.length && !this.isPasswordValid(password) ?
                                <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%' }]}>Password should have at least 1 uppercase, 1 lowercase, 1 digit and 1 special character and length range 6-16 characters</Text> : null
                        }
                    </View>
                    <View style={[styles.inputContainerStyle, isConfirmPasswordFocus || confirmPassword != '' ? THEME.inputBorder : {}]}>
                        <FloatingInput
                            val={confirmPassword}
                            secureEntry
                            onActive={() => this.setState({ isConfirmPasswordFocus: true })}
                            onInActive={() => this.setState({ isConfirmPasswordFocus: false })}
                            label='New Confirm Password' updateText={(confirmPassword) => this.setState({ confirmPassword })} />

                        {
                            submit && !confirmPassword ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%' }]}>Please fill this field</Text> :
                                submit && password != confirmPassword ?
                                    <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%' }]}>Password Mismatch</Text> : null
                        }
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <Button loading={this.props.loading} disabled={password && confirmPassword ? false : true} title='Submit' onPress={() => onComplete(password)} />
                </View>
            </View>
        )
    }
}