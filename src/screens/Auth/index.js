import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, LayoutAnimation, Alert, Linking } from 'react-native'
import { Icon, Button, FloatingInput, RadioButton } from "../../components";
import styles from './style';
import THEME from '../../assets/styles/theme.style';
import COMMON_STYLE from '../../assets/styles/common.style';
import AsyncStorage from '@react-native-community/async-storage';

class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isEmailFocus: false,
            isPasswordFocus: null,
            emailValid: true,
            submiting: true,
            staySignIn: true
        }
    }

    componentDidMount = async () => {
        let userToken = await AsyncStorage.getItem('Email')
        if (userToken) {
            let data = JSON.parse(userToken);
            this.setState({ email: data.email, password: data.password })
        }
    }

    handleLogin = () => {
        const { onLogin } = this.props
        let { email, password } = this.state;
        let userData = { email: email, password: password };
        if (email && password) {
            if (this.isEmailValid(email)) {
                onLogin(userData);
            }
        }
    };

    isEmailValid(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    }

    render() {
        const { onPhone, onForgetPassword, onPressBarber, customer, barber, signUpAsBarber, onContinueWithOutLogin, onFacebook, submit, isSubmit, onGoogle } = this.props
        const { email, password, isEmailFocus, isPasswordFocus, staySignIn } = this.state;
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
                                <Text style={styles.headingTextStyle}>We bring style to you</Text>
                                {/* <Text style={styles.babeoTextStyle}>FLEEK!</Text> */}
                            </View>
                            {/* <View style={styles.loginASContainer}>
                                <Text style={styles.signUpAndLoginTextStyle}>Login as:</Text>
                            </View> */}
                            <View style={styles.buttonContainer}>
                                <View style={[styles.inputContainerStyle, submit ? { marginBottom: "8%" } : styles.inputContainerStyle,
                                isEmailFocus || email != '' ? THEME.inputBorder : {}]}>
                                    <FloatingInput
                                        label={"Email / Phonenumber"}
                                        val={email}
                                        keyboardtype="email-address"
                                        onActive={() => this.setState({ isEmailFocus: true })}
                                        onInActive={() => this.setState({ isEmailFocus: false }, () => isSubmit())}
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
                                <View style={{ flexDirection: 'row', marginBottom: '2.5%',alignItems:'center' }}>
                                    {
                                        staySignIn ?
                                            <Icon.MaterialIcons onPress={() => this.setState({ staySignIn: !staySignIn })} name="check-box" size={30} color={THEME.PRIMARY_COLOR} />
                                            :
                                            <Icon.MaterialIcons onPress={() => this.setState({ staySignIn: !staySignIn })}   name="check-box-outline-blank" size={30} color={THEME.PRIMARY_COLOR} />
                                    }
                                    <Text style={styles.forgetPasswordTextStyle}>Stay signed in</Text>
                                </View>
                                <Button loading={this.props.loading} title="Login" onPress={() => { this.props.isSubmit(); this.handleLogin() }} />
                            </View>
                        </View>
                        <Text onPress={() => onForgetPassword()} style={styles.forgetPasswordTextStyle}>Forget Password?</Text>
                        <View style={styles.lowerContainer}>
                            <Text style={styles.signUpAndLoginTextStyle}>Sign up with:</Text>

                            <TouchableOpacity onPress={onFacebook()} style={styles.faceBookButton} >
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
                            <TouchableOpacity onPress={onGoogle()} style={styles.googleButton} >
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
                                    <>
                                        <View style={[styles.continueContainer, { marginTop: '5%' }]}>
                                            <TouchableOpacity onPress={() => Linking.openURL('http://www.signup.fleekservices.com/basic-info')} style={styles.continueContainerStyle} >
                                                <Text style={styles.signUpAsBarberTextStyle}>Sign Up as a Provider</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.continueContainer}>
                                            <TouchableOpacity onPress={onContinueWithOutLogin} style={styles.continueContainerStyle} >
                                                <Text style={styles.continueWithoutTextStyle}>Continue without Sign in </Text>
                                                <Icon.AntDesign
                                                    name="arrowright"
                                                    color={THEME.COLOR_GREY}
                                                    size={25} />
                                            </TouchableOpacity>
                                        </View>
                                    </>
                            }
                        </View>
                    </ScrollView>
                </View>
            </>
        )
    }
}
export default AuthScreen;