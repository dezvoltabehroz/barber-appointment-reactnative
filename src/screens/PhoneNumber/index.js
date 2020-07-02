import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Icon, PhoneInput, Button } from '../../components'
import styles from "./style";
import CountryPicker, { FlagButton } from 'react-native-country-picker-modal';

export default class PhoneNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryCode: '',
            country: 0,
            callingCode: '',
            cca2: '',
            isVisible: false,
        }
    }

    _flagButton = () => {
        return (
            <TouchableOpacity activeOpacity={0.9}
                onPress={() => this.setState({ isVisible: !this.state.isVisible })}
                style={styles.flagContainer}>
                <View style={styles.column}>
                    <FlagButton
                        onOpen={() => this.setState({ isVisible: !this.state.isVisible })}
                        onClose={() => this.setState({ isVisible: !this.state.isVisible })}
                        placeholder="Select Country"
                        withEmoji={true}

                        countryCode={this.state.countryCode}
                        withCountryNameButton={this.state.country.name}
                        containerButtonStyle={styles.flagInnerContainer} />
                </View>
                <View style={styles.column1}>
                    <Icon.AntDesign name="down" color="#00A9A5" size={15} />
                </View>
            </TouchableOpacity>
        )
    }

    onSelect = (country) => {
        this.setState({
            countryCode: country.cca2,
            callingCode: country.callingCode[0],
            country: country,
            isVisible: false
        })
    };

    render() {
        const { onSendCode } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.labelHeadingStyle}>
                        <Text style={styles.countryLabelHeading}>Choose Country</Text>
                        <CountryPicker
                            theme={{ fontSize: 12, fontFamily: 'Poppins-Bold' }}
                            withFilter={true}
                            visible={this.state.isVisible}
                            withFlag={true}
                            withFlagButton={true}
                            onSelect={(country) => this.onSelect(country)}
                            withAlphaFilter={true}
                            withCountryNameButton={true}
                            renderFlagButton={this._flagButton} />
                    </View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.callingCodeAndPhoneNumberConatiner}>
                        <View style={styles.countryCodeContainer} >
                            <Text style={styles.coutryCodeTextStyle} >{this.state.callingCode != '' ? '+' + this.state.callingCode : null}</Text>
                        </View>
                        <PhoneInput placeholder='Phone Number' />
                    </View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.lineStyle}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.buttonContainer}>
                        <Button title="Send Verification" onPress={onSendCode} />
                    </View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>We will send a code to your number. </Text>
                        <Text style={styles.textStyle}>Standard data charge may apply.</Text>
                    </View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.gapHeight}></View>
                </View>
            </View>
        )
    }
}