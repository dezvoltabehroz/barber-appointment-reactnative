import React, { Component } from 'react';
import { View, } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
import { FloatingInput, Button } from '../../../components'
import styles from './style';;
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
        };
    }

    render() {
        const { onUpdate } = this.props;
        const { isConfirmPasswordFocus, isEmailFocus, isPasswordFocus, email, password, confirmPassword } = this.state;

        return (


            <View style={styles.container}>
                <View style={styles.upperContainer}>

                    <View style={[styles.inputContainerStyle, isEmailFocus || email != '' ? {
                        borderWidth: 2,
                        borderColor: THEME.PRIMARY_COLOR,
                    } : {}]}>
                        <FloatingInput
                            val={email}
                            onActive={() => this.setState({ isEmailFocus: true })}
                            onInActive={() => this.setState({ isEmailFocus: false })}
                            label='Email' updateText={(email) => this.setState({ email })} />
                    </View>
                    <View style={[styles.inputContainerStyle, isPasswordFocus || password != '' ? {
                        borderWidth: 2,
                        borderColor: THEME.PRIMARY_COLOR,
                    } : {}]}>
                        <FloatingInput
                            val={password}
                            secureEntry
                            onActive={() => this.setState({ isPasswordFocus: true })}
                            onInActive={() => this.setState({ isPasswordFocus: false })}
                            label='Password' updateText={(password) => this.setState({ password })} />
                    </View>
                    <View style={[styles.inputContainerStyle, isConfirmPasswordFocus || confirmPassword != '' ? {
                        borderWidth: 2,
                        borderColor: THEME.PRIMARY_COLOR,
                    } : {}]}>
                        <FloatingInput
                            val={confirmPassword}
                            secureEntry
                            onActive={() => this.setState({ isConfirmPasswordFocus: true })}
                            onInActive={() => this.setState({ isConfirmPasswordFocus: false })}
                            label='Confirm Password' updateText={(confirmPassword) => this.setState({ confirmPassword })} />
                    </View>
                </View>
                <View style={{ flex: 0.2, justifyContent: 'center' }}>
                    <View style={styles.lineStyle}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.buttonContainer}>
                        <Button title='Update & Finish' onPress={onUpdate} />
                    </View>
                </View>
            </View>
        );
    }
}