import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Icon, Button, Input } from "../../components";
import styles from './style';

class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: true,
            barber: false
        }
    }
    render() {
        const { onPhone } = this.props
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.imageStyle}
                            source={require('../../assets/images/logo.png')}
                            resizeMode='contain' />
                    </View>
                    <Text style={styles.signUpAndLoginTextStyle}>Login as:</Text>
                    <View style={styles.customerAndBarberContainer}>
                        <TouchableOpacity onPress={() => this.setState({ customer: !this.state.customer, barber: false })}
                            style={[styles.CustomerContainer, this.state.barber == false && this.state.customer ? { backgroundColor: "#00A9A5" } : null]}>
                            <View style={styles.optionContainer}>
                                <Icon.Entypo
                                    name="user"
                                    color={this.state.barber == false && this.state.customer ? "#fff" : '#000'}
                                    size={25} />
                                <Text style={[styles.optionTextStyle, this.state.barber == false && this.state.customer ? { color: "#fff" } : null]}>
                                    Customer
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.gap}></View>
                        <TouchableOpacity onPress={() => this.setState({ barber: !this.state.barber, customer: false })}
                            style={[styles.barberContainer, this.state.customer == false && this.state.barber ? { backgroundColor: "#00A9A5" } : null]} >
                            <View style={styles.optionContainer}>
                                <Icon.FontAwesome
                                    name="scissors"
                                    color={this.state.customer == false && this.state.barber ? "#fff" : '#000'}
                                    size={25} />
                                <Text style={[styles.optionTextStyle, this.state.customer == false && this.state.barber ? { color: "#fff" } : null]}>
                                    Barber
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={styles.TextContainer}>
                        <Text style={styles.headingTextStyle}>Enhance your experience with</Text>
                        <Text style={styles.babeoTextStyle}>LUXE!</Text>
                    </View> */}

                    <View style={styles.buttonContainer}>
                        <Input placeholder='Enter email' />
                        <Input placeholder='Enter password' />
                        <Button title="Login" />
                    </View>
                    <View style={{ flex: 1, justifyContent: "flex-end" }}>
                        <Text style={styles.signUpAndLoginTextStyle}>Sign up with:</Text>

                        {/* <TouchableOpacity style={styles.faceBookButton} >
    <View style={{ flexDirection: "row" }}>
        <View style={styles.iconContainer}>
            <Icon.FontAwesome
                name="facebook"
                color="#fff"
                style={{ marginRight: '5%' }}
                size={25} />
        </View>
        <View style={styles.facebookTextContainer}>
            <Text style={styles.buttonTextStyle}>Facebook</Text>
        </View>
    </View>
</TouchableOpacity> */}

                        <TouchableOpacity onPress={onPhone} style={styles.phoneNumberButton} >
                            <View style={{ flexDirection: "row" }}>
                                <View style={styles.iconContainer}>
                                    <Icon.FontAwesome
                                        name="phone"
                                        color="#fff"
                                        style={{ marginRight: '5%', }}
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
                                    color='#9FACBD'
                                    style={{}}
                                    size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            </>
        )
    }
}
export default AuthScreen;