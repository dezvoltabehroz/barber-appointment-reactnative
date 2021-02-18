import React from 'react';
import { Button as BT } from 'react-native-elements';
import styles from './style';
const Button = (props) => {

    const {
        disabled = false,
        loading = false,
        disabledStyle = {backgroundColor:"#A8A8A8"},
        buttonStyle = {},
        disabledTitleStyle = {color:'white'},
        titleStyle = {},
        loadingStyle = {},
        icon = {},
        iconRight = false,
        onPress = () => { },
        type = "solid",
        title = "",
        raised = false,
        containerStyle = {},
    } = props;
    return (
        <BT
            buttonStyle={{ ...buttonStyle && styles.btnPrimary }}
            containerStyle={containerStyle}
            disabled={disabled}
            disabledStyle={disabledStyle}
            disabledTitleStyle={disabledTitleStyle}
            loading={loading}
            onPress={onPress}
            loadingStyle={loadingStyle}
            raised={raised}
            title={title}
            type={type}
            icon={icon}
            iconRight={iconRight}
            titleStyle={{ ...titleStyle && styles.btnPrimaryText }}
        />
    )
};

export default Button;
