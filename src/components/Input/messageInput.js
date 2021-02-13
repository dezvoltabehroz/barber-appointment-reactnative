import React from 'react';
import { Input as ElementInput } from 'react-native-elements';
import themeStyle from '../../assets/styles/theme.style';
import inputStyles from './style';


const MessageTextInput = (props) => {
    return (
        <ElementInput
            {...props}
            style={{ textAlignVertical: 'top' }}
            placeholderTextColor={themeStyle.PRIMARY_COLOR}
            inputContainerStyle={inputStyles.messageInputContainerStyle}
            inputStyle={inputStyles.messageinputStyle}
        />
    );
}
export default MessageTextInput;