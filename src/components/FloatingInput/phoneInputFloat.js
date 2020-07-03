import React from 'react';
import FloatingInput from 'react-native-floating-labels';
import styles from './style'
const PhoneInput = ({ label,updateText }) => {

    return (
        <FloatingInput
            keyboardType={'phone-pad'} 
            labelStyle={styles.labelTextStyle}
            inputStyle={styles.inputStyle}
            style={styles.phoneContainer}
            onChangeText={updateText}
        >
            {label}
        </FloatingInput >
    )
};

export default PhoneInput;
