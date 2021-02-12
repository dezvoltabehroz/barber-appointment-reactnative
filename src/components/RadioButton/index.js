import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '..';
import THEME from '../../assets/styles/theme.style';
import styles from './style';

export default class RadioButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { option1, option2, option1Text, option2Text, onPressOption1, onPressOption2, auth, gender } = this.props;
        return (
            <View style={[styles.customerAndBarberContainer, gender ? { marginBottom: 0, marginTop: 15 } : null]}>
                <TouchableOpacity onPress={onPressOption1}
                    style={[styles.CustomerContainer, option2 == false && option1 == true ? { backgroundColor: THEME.PRIMARY_COLOR } : null]}>
                    <View style={styles.optionContainer}>
                        {
                            auth ?
                                <Icon.FontAwesome
                                    name={"user"}
                                    color={option2 == false && option1 ? THEME.COLOR_WHITE : THEME.COLOR_BLACK}
                                    size={THEME.ICON_SIZE} />
                                : gender ?
                                    <Icon.Ionicons
                                        name={"md-male"}
                                        color={option2 == false && option1 ? THEME.COLOR_WHITE : gender ? THEME.COLOR_GREY : THEME.COLOR_BLACK}
                                        size={THEME.ICON_SIZE} />
                                    : null
                        }
                        <Text style={[styles.optionTextStyle, option2 == false && option1 ? { color: THEME.COLOR_WHITE } : null]}>
                            {option1Text}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.gap}></View>
                <TouchableOpacity onPress={onPressOption2}
                    style={[styles.barberContainer, option1 == false && option2 == true ? { backgroundColor: THEME.PRIMARY_COLOR } : null]} >
                    <View style={styles.optionContainer}>
                        {
                            auth ?
                                <Icon.FontAwesome
                                    name={"scissors"}
                                    color={option1 == false && option2 ? THEME.COLOR_WHITE : THEME.COLOR_BLACK}
                                    size={THEME.ICON_SIZE} />
                                : gender ?
                                    <Icon.Ionicons
                                        name={"md-female"}
                                        color={option1 == false && option2 ? THEME.COLOR_WHITE : gender ? THEME.COLOR_GREY : THEME.COLOR_BLACK}
                                        size={THEME.ICON_SIZE} />
                                    : null
                        }
                        <Text style={[styles.optionTextStyle, option1 == false && option2 ? { color: THEME.COLOR_WHITE } : null]}>
                            {option2Text}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}