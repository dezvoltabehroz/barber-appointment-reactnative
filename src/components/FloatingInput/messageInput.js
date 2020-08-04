import React from 'react';
import FloatingInput from 'react-native-floating-labels';
import styles from './style'
const FloatInput = ({ label, updateText, secureEntry, multiline, onSubmit, onChangeValue, maxLength, val, onActive, onInActive, keyboardtype }) => {

    return (
        <FloatingInput
            onChangeText={updateText}
            keyboardType={keyboardtype}
            password={secureEntry}
            value={val}
            multiline={multiline}
            onChange={onChangeValue}
            onFocus={onActive}
            onSubmitEditing={onSubmit}
            onBlur={onInActive}
            labelStyle={styles.labelTextStyle}
            inputStyle={styles.messageinputStyle}
            style={styles.messageContainer}
        >
            {label}
        </FloatingInput >
    )
};

export default FloatInput;
