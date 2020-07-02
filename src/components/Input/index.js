import React from 'react';
import { Input as ElementInput } from 'react-native-elements';
import inputStyles from './style';
import THEME from '../../assets/styles/theme.style';

const Input = (props) => {
    return (
        <ElementInput
            {...props}
            containerStyle={inputStyles.containerStyle}
            placeholderTextColor={THEME.INPUT_PRIMARY_TEXT_COLOR}
            inputContainerStyle={inputStyles.inputContainerStyle}
            inputStyle={inputStyles.inputStyle}
        />
    );
}
export default Input;