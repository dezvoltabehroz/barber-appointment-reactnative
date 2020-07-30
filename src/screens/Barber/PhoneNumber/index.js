import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Icon, PhoneInput, Button } from '../../../components'
import styles from "./style";
import CountryPicker, { FlagButton } from 'react-native-country-picker-modal';
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
            submit: false
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
                        withEmoji={false}
                        withFlagButton={false}
                        countryCode={this.state.countryCode}
                        withCountryNameButton={this.state.country.name}
                        containerButtonStyle={styles.flagInnerContainer}
                    />
                </View>
                <View style={styles.column1}>
                    <Icon.AntDesign name="down" color={THEME.PRIMARY_COLOR} size={15} />
                </View>
            </TouchableOpacity>
        )
    }

    handleSendCode = () => {
        let { onSendCode } = this.props;
        const { number } = this.state;
        this.setState({ submit: true })
        if (number) {
            onSendCode();
            this.setState({ submit: false, number: '' });

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
        const { number, isNumberFocus, submit } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.labelHeadingStyle}>
                        <Text style={styles.countryLabelHeading}>Choose Country</Text>
                        <CountryPicker
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
                            <Text style={styles.coutryCodeTextStyle} >{this.state.callingCode != '' ? '+' + this.state.callingCode : null}</Text>
                        </View>
                        <PhoneInput
                            val={number}
                            label={"Phone Number"}
                            onActive={() => this.setState({ isNumberFocus: true })}
                            onInActive={() => this.setState({ isNumberFocus: false })}
                            updateText={(number) => this.setState({ number })} />
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
                        <Button title="Send Verification" onPress={this.handleSendCode} />
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