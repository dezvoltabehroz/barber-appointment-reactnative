import React, { Component } from 'react';
import { View, Text } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
import { FloatingInput, FooterButton } from '../../../components'
import styles from './style';
import COMMON_STYLE from '../../../assets/styles/common.style';
export default class EmailandPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            male: true, female: false,
            email: '',
            password: '',
            confirmPassword: '',
            isPasswordFocus: false,
            isEmailFocus: false,
            isConfirmPasswordFocus: false,
            submit: false
        };
    }
    handleNext = () => {
        let { email, password, confirmPassword } = this.state
        const { onUpdate } = this.props;
        this.setState({ submit: true });
        if (email && password && confirmPassword) {
            if (this.isEmailValid(email)) {
                onUpdate();
            }
        }
    };

    isEmailValid(email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }

    render() {
        const { isConfirmPasswordFocus, isEmailFocus, isPasswordFocus, email, password, confirmPassword, submit } = this.state;

        return (


            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <View style={[styles.inputContainerStyle, isEmailFocus || email != '' ? THEME.inputBorder : {}]}>
                        <FloatingInput
                            val={email}
                            keyboardtype="email-address"
                            onActive={() => this.setState({ isEmailFocus: true })}
                            onInActive={() => this.setState({ isEmailFocus: false })}
                            label='Email' updateText={(email) => this.setState({ email })} />
                        {
                            submit && !email ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                        }
                        {
                            submit && email.length && !this.isEmailValid(email) ? <Text style={COMMON_STYLE.errorText}>Email is invalid</Text> : null
                        }
                    </View>
                    <View style={[styles.inputContainerStyle, isPasswordFocus || password != '' ? THEME.inputBorder : {}]}>
                        <FloatingInput
                            val={password}
                            secureEntry
                            onActive={() => this.setState({ isPasswordFocus: true })}
                            onInActive={() => this.setState({ isPasswordFocus: false })}
                            label='Password' updateText={(password) => this.setState({ password })} />
                        {
                            submit && !password ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
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
                            submit && !confirmPassword ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                        }
                    </View>
                </View>
                <FooterButton title='Next' onPress={this.handleNext} />
            </View>
        );
    }
}