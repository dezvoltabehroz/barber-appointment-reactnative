import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Icon, PhoneInput, PhonTextInput, Button } from '../../../components'
import styles from "./style";
import CountryPicker, { FlagButton, } from 'react-native-country-picker-modal';
import THEME from '../../../assets/styles/theme.style'
import COMMON_STYLE from '../../../assets/styles/common.style';

export default class PhoneNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            countryCode: '',
            country: 0,
            callingCode: '',
            cca2: '',
            isVisible: false,
            isNumberFocus: false,
            submit: false,
            disabled: true
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
                        placeholderTextStyle={{ color: "white" }}
                        withEmoji={false}
                        withFlagButton={false}
                        countryCode={this.state.countryCode}
                        withCountryNameButton={this.state.country.name}
                        containerButtonStyle={styles.flagInnerContainer}
                    />
                </View>
                <View style={styles.column1}>
                    <Icon.AntDesign name="caretdown" color={THEME.COLOR_BLACK} size={18} />
                </View>
            </TouchableOpacity>
        )
    }

    handleSendCode = () => {
        let { onSendCode } = this.props;
        const { number, callingCode } = this.state;
        this.setState({ submit: true })
        if (number && callingCode != '') {
            this.setState({ disabled: false })
            let phoneNumber = `+${callingCode}${number}`
            onSendCode(phoneNumber);
            this.setState({ submit: false, disabled: true })
        }
        else {
            alert('Please select the country code first');
        }
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
        const { number, isNumberFocus, submit, callingCode } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.labelHeadingStyle}>
                        {/* <Text style={styles.countryLabelHeading}>Choose Country</Text> */}
                        <CountryPicker
                            countryCodes={['PK', 'US']}
                            theme={styles.themeText}
                            withFilter={true}
                            visible={this.state.isVisible}
                            onSelect={(country) => this.onSelect(country)}
                            withAlphaFilter={true}
                            withCountryNameButton={true}
                            renderFlagButton={this._flagButton}
                        />
                    </View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={[styles.callingCodeAndPhoneNumberConatiner,
                    isNumberFocus || number != '' ? THEME.inputBorder : {}]}>
                        <View style={styles.countryCodeContainer} >
                            <Text style={styles.coutryCodeTextStyle} >{this.state.callingCode != '' ? '+' + this.state.callingCode : "+1"}</Text>
                        </View>
                        <PhonTextInput
                            phone
                            value={number}
                            placeholder={"Phone Number"}
                            onFocus={() => this.setState({ isNumberFocus: true })}
                            onBlur={() => this.setState({ isNumberFocus: false })}
                            onChangeText={(number) => this.setState({ number })} />
                    </View>
                    {
                        submit && !number ? <Text style={[COMMON_STYLE.errorText, { marginLeft: "10%" }]}>Please fill this field</Text> : null
                    }
                    <View style={styles.gapHeight}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.lineStyle}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.buttonContainer}>
                        <Button disabled={callingCode && number ? false : true} title="Send Verification" loading={this.props.loading} onPress={this.handleSendCode} />
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