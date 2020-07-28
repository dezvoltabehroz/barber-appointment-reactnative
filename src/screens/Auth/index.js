import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, LayoutAnimation } from 'react-native'
import { Icon, Button, FloatingInput, RadioButton } from "../../components";
import styles from './style';
import THEME from '../../assets/styles/theme.style';

class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            isEmailFocus: false,
            isPasswordFocus: null,
            emailValid: true,
        }
    }
    handleLogin = () => {
        this.props.onLogin(this.state.email, this.state.password)
        this.setState({ email: '', password: '', isEmailFocus: null, isPasswordFocus: null })
    }

    validateEmail() {
        const { email } = this.state
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const emailValid = re.test(email)
        LayoutAnimation.easeInEaseOut()
        this.setState({ emailValid }, () => {
            if (!this.state.emailValid) {
                alert("Email is Incorrect")
            }
        })
    }

    render() {
        const { onPhone, onLogin, onPressCustomer, onPressBarber, customer, barber } = this.props
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
                                <View style={[styles.inputContainerStyle,
                                isEmailFocus || email != '' ? THEME.inputBorder : {}]}>
                                    <FloatingInput
                                        label={"Email / Phonenumber"}
                                        val={email}
                                        onSubmit={() => { this.validateEmail() }}
                                        onActive={() => this.setState({ isEmailFocus: true })}
                                        onInActive={() => this.setState({ isEmailFocus: false })}
                                        updateText={(email) => this.setState({ email })} />
                                </View>
                                <View style={[styles.inputContainerStyle,
                                isPasswordFocus || password != '' ? THEME.inputBorder : {}]}>
                                    <FloatingInput
                                        label={"Password"}
                                        val={password}
                                        onActive={() => this.setState({ isPasswordFocus: true })}
                                        onInActive={() => this.setState({ isPasswordFocus: false })}
                                        secureEntry={true}
                                        updateText={(password) => this.setState({ password })} />
                                </View>
                                <Button title="Login" loading={this.props.loading} onPress={this.handleLogin} />
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

                            <TouchableOpacity onPress={onPhone} style={styles.phoneNumberButton} >
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

                            <View style={styles.continueContainer}>
                                <TouchableOpacity onPress={onLogin} style={styles.continueContainerStyle} >
                                    <Text style={styles.continueWithoutTextStyle}>Continue without Sign in </Text>
                                    <Icon.AntDesign
                                        name="arrowright"
                                        color={THEME.COLOR_GREY}
                                        size={25} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </>
        )
    }
}
export default AuthScreen;