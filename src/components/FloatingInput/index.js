import React from 'react';
import FloatingInput from 'react-native-floating-labels';
import styles from './style'
const FloatInput = ({ label, updateText,secureEntry }) => {

    return (
        <FloatingInput
            onChangeText={updateText}
            password={secureEntry}
            labelStyle={styles.labelTextStyle}
            inputStyle={styles.inputStyle}
            style={styles.container}
        >
            {label}
        </FloatingInput >
    )
};

export default FloatInput;
