import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
import { FloatingInput, FooterButton } from '../../../components'
import styles from './style';
import COMMON_STYLE from '../../../assets/styles/common.style';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';

class EmailandPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            isPasswordFocus: false,
            isEmailFocus: false,
            isConfirmPasswordFocus: false,
            submit: false,
            macAddress: ''

        };
    }

    componentDidMount = () => {
        if (this.props.user.email != 'undefined' && this.props.user.email != null) {
            let { email } = this.props.user;
            if (email != '' && email !== 'undefined' && email != null) {
                this.setState({ email: email })
            }
        }
        DeviceInfo.getMacAddress().then(mac => {
            this.setState({ macAddress: mac });
        });
    }

    handleNext = async () => {
        
        let { email, password, confirmPassword, submit, macAddress } = this.state
        const { onUpdate } = this.props;
        const number = await AsyncStorage.getItem('Phone');
        let phoneNumber = JSON.parse(number)
        if (this.isEmailValid(email)) {
            if (password.length < 8) {
                return Alert.alert('Password must be 8 character', '', [{ text: 'OK' },])
            }
            else if (password !== confirmPassword) {
                return Alert.alert('Confirm password not matched', '', [{ text: 'OK' },])
            }
            else if (email && password && confirmPassword && macAddress && submit) {
                let userData = {
                    email: email,
                    password: password,
                    macAddress: macAddress,
                    // phone: this.props.phone
                    phone:phoneNumber
                }
                onUpdate(userData);
            }
        }
    };

    isEmailValid(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    }

    isPasswordValid(password) {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
    }

    render() {
        const { isConfirmPasswordFocus, isEmailFocus, isPasswordFocus, email, password, confirmPassword, submit } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <View style={[styles.inputContainerStyle,
                    { marginBottom: submit ? '6%' : '5%' },
                    isEmailFocus || email != '' ? THEME.inputBorder
                        :
                        {}]}>
                        <FloatingInput
                            val={email}
                            keyboardtype="email-address"
                            onActive={() => this.setState({ isEmailFocus: true })}
                            onInActive={() => this.setState({ isEmailFocus: false, submit: true })}
                            label='Email' updateText={(email) => this.setState({ email })} />
                        {
                            submit && !email ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%' }]}>Please fill this field</Text> : null
                        }
                        {
                            submit && email.length && !this.isEmailValid(email) ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%' }]}>Email is invalid</Text> : null
                        }
                    </View>
                    <View style={[styles.inputContainerStyle, password.length && !this.isPasswordValid(password) ? { marginBottom: 0 } : { marginBottom: submit && !password ? 0 : submit ? '6%' : '5%' },
                    isPasswordFocus || password != '' ? THEME.inputBorder : {}]}>
                        <FloatingInput
                            val={password}
                            secureEntry
                            onActive={() => this.setState({ isPasswordFocus: true })}
                            onInActive={() => this.setState({ isPasswordFocus: false })}
                            label='Password' updateText={(password) => this.setState({ password })} />

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
                            label='Confirm Password' updateText={(confirmPassword) => this.setState({ confirmPassword })} />
                        {
                            submit && !confirmPassword ? <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%' }]}>Please fill this field</Text> :
                                submit && password != confirmPassword ?
                                    <Text style={[COMMON_STYLE.errorText, { marginVertical: '2%' }]}>Password Mismatch</Text> : null
                        }
                    </View>
                </View>
                <FooterButton disabled={email && password && confirmPassword ? false : true} loading={this.props.loading} title='Save & Continue' onPress={this.handleNext} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(EmailandPassword)