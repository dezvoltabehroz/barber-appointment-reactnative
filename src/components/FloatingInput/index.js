import React from 'react';
import FloatingInput from 'react-native-floating-labels';
import styles from './style'
const FloatInput = ({ label }, props) => {
    const {
        autoCapitalize = 'none',
        autoCorrect = false,
        autoFocus = false,
        clearButtonMode = '',
        clearTextOnFocus = false,
        // editable = false,
        enablesReturnKeyAutomatically = false,
        keyboardType = '',
        multiline = false,
        password = false,
        returnKeyType = '',
        selectTextOnFocus = false,
        value = '',
        // onBlur = () => { },
        onChange = () => { },
        onChangeText = () => { },
        onEndEditing = () => { },
        // onFocus = () => { },
        onSubmitEditing = () => { },
    } = props;
    return (
        <FloatingInput
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            autoFocus={autoFocus}
            clearButtonMode={clearButtonMode}
            clearTextOnFocus={clearTextOnFocus}
            // editable={editable}
            enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
            keyboardType={keyboardType && { ...props }}
            multiline={multiline}
            password={password}
            returnKeyType={returnKeyType}
            selectTextOnFocus={selectTextOnFocus}
            value={value}
            // onBlur={onBlur}
            onChange={onChange}
            onChangeText={onChangeText}
            onEndEditing={onEndEditing}
            // onFocus={onFocus}
            onSubmitEditing={onSubmitEditing}
            labelStyle={styles.labelTextStyle}
            inputStyle={styles.inputStyle}
            style={styles.container}
        // {...props}

        >
            {label}
        </FloatingInput >
    )
};

export default FloatInput;
