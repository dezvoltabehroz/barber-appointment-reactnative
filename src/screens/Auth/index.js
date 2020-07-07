import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Icon, Button, FloatingInput } from "../../components";
import styles from './style';
import THEME from '../../assets/styles/theme.style';

class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: true,
            barber: false, email: '', password: '', isEmailFocus: null, isPasswordFocus: null
        }
    }
    render() {
        const { onPhone, onLogin, onPressCustomer, onPressBarber, customer, barber } = this.props
        const { email, password, isEmailFocus, isPasswordFocus } = this.state;
        const borderStyle = {
            borderWidth: 2,
            borderColor: THEME.PRIMARY_COLOR,
        }
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
                                <Text style={styles.babeoTextStyle}>LUXE!</Text>
                            </View>
                            <View style={styles.customerAndBarberContainer}>
                                <TouchableOpacity onPress={onPressCustomer}
                                    style={[styles.CustomerContainer, barber == false && customer ? { backgroundColor: THEME.PRIMARY_COLOR } : null]}>
                                    <View style={styles.optionContainer}>
                                        <Icon.Entypo
                                            name="user"
                                            color={barber == false && customer ? THEME.COLOR_WHITE : THEME.COLOR_BLACK}
                                            size={25} />
                                        <Text style={[styles.optionTextStyle, barber == false && customer ? { color: THEME.COLOR_WHITE } : null]}>
                                            Customer
                                </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.gap}></View>
                                <TouchableOpacity onPress={onPressBarber}
                                    style={[styles.barberContainer, customer == false && barber ? { backgroundColor: THEME.PRIMARY_COLOR } : null]} >
                                    <View style={styles.optionContainer}>
                                        <Icon.FontAwesome
                                            name="scissors"
                                            color={customer == false && barber ? THEME.COLOR_WHITE : THEME.COLOR_BLACK}
                                            size={25} />
                                        <Text style={[styles.optionTextStyle, customer == false && barber ? { color: THEME.COLOR_WHITE } : null]}>
                                            Barber
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.loginASContainer}>
                                <Text style={styles.signUpAndLoginTextStyle}>Login as:</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <View style={[styles.inputContainerStyle, isEmailFocus || email != '' ? {
                                    borderWidth: 2,
                                    borderColor: THEME.PRIMARY_COLOR,
                                } : {}]}>
                                    <FloatingInput
                                        label={"Email / Phonenumber"}
                                        val={email}
                                        onActive={() => this.setState({ isEmailFocus: true })}
                                        onInActive={() => this.setState({ isEmailFocus: false })}
                                        updateText={(email) => this.setState({ email })} />
                                </View>
                                <View style={[styles.inputContainerStyle, isPasswordFocus || password != '' ? {
                                    borderWidth: 2,
                                    borderColor: THEME.PRIMARY_COLOR,
                                } : {}]}>
                                    <FloatingInput
                                        label={"Password"}
                                        val={password}
                                        onActive={() => this.setState({ isPasswordFocus: true })}
                                        onInActive={() => this.setState({ isPasswordFocus: false })}
                                        secureEntry={true}
                                        updateText={(password) => this.setState({ password }, () => { console.log(password) })} />
                                </View>
                                <Button title="Login" onPress={onLogin} />
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
                                <TouchableOpacity style={styles.continueContainerStyle} >
                                    <Text style={styles.continueWithoutTextStyle}>Continue without Sign in </Text>
                                    <Icon.AntDesign
                                        name="arrowright"
                                        color={THEME.COLOR_GREY}
                                        // style={{}}
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