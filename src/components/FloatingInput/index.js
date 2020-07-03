import React from 'react';
import FloatingInput from 'react-native-floating-labels';
import styles from './style'
const FloatInput = ({ label, updateText,secureEntry,iconInput }) => {

    return (
        <FloatingInput
            onChangeText={updateText}
            password={secureEntry}
            labelStyle={styles.labelTextStyle}
            inputStyle={styles.inputStyle}
            style={iconInput?styles.iconContainerStyle:styles.container}
        >
            {label}
        </FloatingInput >
    )
};

export default FloatInput;
