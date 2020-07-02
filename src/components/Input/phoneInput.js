import React from 'react';
import { Input as ElementInput } from 'react-native-elements';
import inputStyles from './style';


const PhoneInput = (props) => {
    return (
        <ElementInput
            {...props}
            keyboardType='number-pad'
            placeholderTextColor='#1E2023'
            inputContainerStyle={inputStyles.phoneInputContainerStyle}
            inputStyle={inputStyles.phoneIputStyle}
        />
    );
}
export default PhoneInput;