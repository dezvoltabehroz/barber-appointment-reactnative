import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, LayoutAnimation, Alert } from 'react-native'
import { Icon, Button, FloatingInput, RadioButton } from "../../components";
import styles from './style';
import THEME from '../../assets/styles/theme.style';
import COMMON_STYLE from '../../assets/styles/common.style';

class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isEmailFocus: false,
            isPasswordFocus: null,
            emailValid: true,
            submiting: true
        }
    }
    handleLogin = () => {
        const { onLogin, isSubmit, submit } = this.props
        let { email, password, submiting } = this.state;
        isSubmit(submiting);
        if (email && password && submit) {
            if (this.isEmailValid(email)) {
                onLogin();
                this.setState({ email: '', password: '' })
            }
        }
    };

    isEmailValid(email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }

    render() {
        const { onPhone, onPressCustomer, onPressBarber, customer, barber, onContinueWithOutLogin, submit } = this.props
        const { email, password, isEmailFocus, isPasswordFocus } = this.state;
        return (
            <>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.upperContainer}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.imageStyle}
                                    source={require('../../assets/images/logo.png')}
                                    resizeMode='contain' />
                            </View>
                            <View style={styles.TextContainer}>
                                <Text style={styles.headingTextStyle}>Enhance your experience with</Text>
                                <Text style={styles.babeoTextStyle}>FLEEK!</Text>
                            </View>
                            <RadioButton auth
                                option1={customer}
                                option2={barber}
                                option1Text="Customer"
                                option2Text="Barber"
                                onPressOption1={onPressCustomer}
                                onPressOption2={onPressBarber} />
                            <View style={styles.loginASContainer}>
                                <Text style={styles.signUpAndLoginTextStyle}>Login as:</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <View style={[styles.inputContainerStyle, submit ? { marginBottom: "8%" } : styles.inputContainerStyle,
                                isEmailFocus || email != '' ? THEME.inputBorder : {}]}>
                                    <FloatingInput
                                        label={"Email / Phonenumber"}
                                        val={email}
                                        keyboardtype="email-address"
                                        onActive={() => this.setState({ isEmailFocus: true })}
                                        onInActive={() => this.setState({ isEmailFocus: false })}
                                        updateText={(email) => this.setState({ email })} />
                                    {
                                        submit && !email ? <Text style={[COMMON_STYLE.errorText, submit ? styles.onSubmitTrue : {}]}>Please fill this field</Text> : null
                                    }
                                    {
                                        submit && email.length && !this.isEmailValid(email) ? <Text style={[COMMON_STYLE.errorText, submit ? styles.onSubmitTrue : {}]}>Email is invalid</Text> : null
                                    }
                                </View>

                                <View style={[styles.inputContainerStyle, submit ? { marginBottom: "8%" } : styles.inputContainerStyle,
                                isPasswordFocus || password != '' ? THEME.inputBorder : {}]}>
                                    <FloatingInput
                                        label={"Password"}
                                        val={password}
                                        onActive={() => this.setState({ isPasswordFocus: true })}
                                        onInActive={() => this.setState({ isPasswordFocus: false })}
                                        secureEntry={true}
                                        updateText={(password) => this.setState({ password })} />
                                    {
                                        submit && !password ? <Text style={[COMMON_STYLE.errorText, submit ? styles.onSubmitTrue : {}]}>Please fill this field</Text> : null
                                    }
                                </View>

                                <Button title="Login" onPress={this.handleLogin} />
                            </View>
                        </View>
                        <View style={styles.lowerContainer}>
                            <Text style={styles.signUpAndLoginTextStyle}>Sign up with:</Text>

                            <TouchableOpacity style={styles.faceBookButton} >
                                <View style={styles.row}>
                                    <View style={styles.iconContainer}>
                                        <Icon.FontAwesome
                                            name="facebook"
                                            color={THEME.COLOR_WHITE}
                                            style={styles.iconStyle}
                                            size={25} />
                                    </View>
                                    <View style={styles.facebookTextContainer}>
                                        <Text style={styles.buttonTextStyle}>Facebook</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.googleButton} >
                                <View style={styles.row}>
                                    <View style={styles.iconContainer}>
                                        <Icon.FontAwesome
                                            name="google"
                                            color={THEME.COLOR_WHITE}
                                            style={styles.iconStyle}
                                            size={25} />
                                    </View>
                                    <View style={styles.facebookTextContainer}>
                                        <Text style={styles.buttonTextStyle}>Google</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onPhone} style={[styles.phoneNumberButton, barber ? { marginBottom: '5%' } : {}]} >
                                <View style={styles.row}>
                                    <View style={styles.iconContainer}>
                                        <Icon.FontAwesome
                                            name="phone"
                                            color={THEME.COLOR_WHITE}
                                            style={styles.iconStyle}
                                            size={25} />
                                    </View>
                                    <View style={styles.phoneTextContainer}>
                                        <Text style={styles.buttonTextStyle}>Phone Number</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {
                                barber ?
                                    null
                                    :
                                    <View style={styles.continueContainer}>
                                        <TouchableOpacity onPress={onContinueWithOutLogin} style={styles.continueContainerStyle} >
                                            <Text style={styles.continueWithoutTextStyle}>Continue without Sign in </Text>
                                            <Icon.AntDesign
                                                name="arrowright"
                                                color={THEME.COLOR_GREY}
                                                size={25} />
                                        </TouchableOpacity>
                                    </View>
                            }
                        </View>
                    </ScrollView>
                </View>
            </>
        )
    }
}
export default AuthScreen;