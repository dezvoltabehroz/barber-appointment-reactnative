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
                {/* <View style={styles.upperContainer}>
                    <View style={styles.imageContainer}>
                        <ImageBackground style={styles.imageStyle} resizeMode="contain" source={require('../../../assets/images/decor.png')}>
                            <View style={styles.avatarContainer}>
                                <Avatar
                                    avatarStyle={styles.avatarStyle}
                                    source={this.state.avatar ? this.state.avatar : require('../../../assets/images/avatar.png')}
                                    rounded
                                    size={180} />
                                <TouchableOpacity onPress={this.chooseFile}>
                                    <Text style={styles.profileTextStyle}>Choose Profile Photo</Text>
                                </TouchableOpacity>
                            </View>

                        </ImageBackground>
                    </View>
                </View> */}
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
                    {/* <View style={styles.customerAndBarberContainer}>
                        <TouchableOpacity onPress={() => this.setState({ male: !this.state.male, female: false })}
                            style={[styles.CustomerContainer, this.state.female == false && this.state.male ? { backgroundColor: THEME.PRIMARY_COLOR } : null]}>
                            <View style={styles.optionContainer}>
                                <Icon.Ionicons
                                    name="md-male"
                                    color={this.state.female == false && this.state.male ? THEME.COLOR_WHITE : THEME.COLOR_GREY}
                                    size={25} />
                                <Text style={[styles.optionTextStyle, this.state.female == false && this.state.male ? { color: THEME.COLOR_WHITE } : null]}>
                                    Male
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.gap}></View>
                        <TouchableOpacity onPress={() => this.setState({ female: !this.state.female, male: false })}
                            style={[styles.barberContainer, this.state.male == false && this.state.female ? { backgroundColor: THEME.PRIMARY_COLOR } : null]} >
                            <View style={styles.optionContainer}>
                                <Icon.Ionicons
                                    name="md-female"
                                    color={this.state.male == false && this.state.female ? THEME.COLOR_WHITE : THEME.COLOR_GREY}
                                    size={25} />
                                <Text style={[styles.optionTextStyle, this.state.male == false && this.state.female ? { color: THEME.COLOR_WHITE } : null]}>
                                    Female
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View> */}
                    {/* <View style={[styles.inputContainerStyle, isLocationFocus || location != '' ? {
                        borderWidth: 2,
                        borderColor: THEME.PRIMARY_COLOR,
                    } : {}]}>
                        <FloatingInput val={location}
                            onInActive={() => this.setState({ isLocationFocus: false })}
                            onActive={() => this.setState({ isLocationFocus: true })}
                            label='Your Location' iconInput val={this.state.location} />
                        <Icon.SimpleLineIcons name='location-pin' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                    </View> */}


                </View>
                <View style={styles.lineStyle}></View>
                <View style={styles.gapHeight}></View>
                <View style={styles.buttonContainer}>
                    <Button title='Update & Finish' onPress={onUpdate} />
                </View>
            </View>
        );
    }
}