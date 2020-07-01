import { StyleSheet } from 'react-native';
import THEME from '../../styles/theme.style';

export default StyleSheet.create({
    inputContainerStyle: {
        height: 54,
        borderBottomWidth: 0,
        marginVertical: 3,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        // elevation: 2,
        marginHorizontal: 15
    },
    inputStyle: {
        flex: 1,
        marginLeft: 10,
        color: THEME.INPUT_PRIMARY_TEXT_COLOR,
        fontSize: 16,
    }
}
);
