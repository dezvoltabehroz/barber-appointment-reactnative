import React from 'react';
import FloatingInput from 'react-native-floating-labels';
import styles from './style'
const PhoneInput = ({ label }, props) => {

    return (
        <FloatingInput
            {...props}
            keyboardType={'phone-pad'} 
            labelStyle={styles.labelTextStyle}
            inputStyle={styles.inputStyle}
            style={styles.container}

        >
            {label}
        </FloatingInput >
    )
};

export default PhoneInput;
