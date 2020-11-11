import React from 'react';
import FloatingInput from 'react-native-floating-labels';
import styles from './style'
const FloatInput = ({ label, updateText, editable, secureEntry, iconInput, multilines, iconSmallInput, onSubmit, onChangeValue, maxLength, val, onActive, onInActive, keyboardtype }) => {

    return (
        <FloatingInput
            editable={editable}
            onChangeText={updateText}
            keyboardType={keyboardtype}
            password={secureEntry}
            value={val}
            onChange={onChangeValue}
            multiline={multilines}
            maxLength={maxLength}
            onFocus={onActive}
            onSubmitEditing={onSubmit}
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
