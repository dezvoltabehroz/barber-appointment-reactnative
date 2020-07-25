import React from 'react';
import FloatingInput from 'react-native-floating-labels';
import styles from './style'
const FloatInput = ({ label, updateText, secureEntry, iconInput, iconSmallInput, maxLength, val, onActive, onInActive, keyboardtype }) => {

    return (
        <FloatingInput
            onChangeText={updateText}
            keyboardType={keyboardtype}
            password={secureEntry}
            value={val}
            maxLength={maxLength}
            onFocus={onActive}
            onBlur={onInActive}
            labelStyle={styles.labelTextStyle}
            inputStyle={styles.inputStyle}
            style={iconInput ? styles.iconContainerStyle : iconSmallInput ? styles.iconSmallContainerStyle : styles.container}
        >
            {label}
        </FloatingInput >
    )
};

export default FloatInput;
