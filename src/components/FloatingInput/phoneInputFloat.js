import React from 'react';
import FloatingInput from 'react-native-floating-labels';
import styles from './style'
const PhoneInput = ({ label,updateText,val,onActive,onInActive }) => {

    return (
        <FloatingInput
            keyboardType={'phone-pad'} 
            value={val}
            onFocus={onActive}
            onBlur={onInActive}
            labelStyle={styles.phonelabelTextStyle}
            inputStyle={styles.phoneinputStyle}
            style={styles.phoneContainer}
            onChangeText={updateText}
        >
            {label}
        </FloatingInput >
    )
};

export default PhoneInput;
