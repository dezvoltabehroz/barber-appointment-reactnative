import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../assets/styles/theme.style';
const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    containerStyle: {
        height: 70,
    },
    inputContainerStyle: {
        height: 54,
        width: '100%',
        borderBottomWidth: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
    },
    inputStyle: {
        flex: 1,
        textAlign: 'center',
        fontSize: THEME.FONT_SIZE_XLARGE,
        fontFamily: 'Poppins-Regular',
        color: THEME.INPUT_PRIMARY_TEXT_COLOR,
    },
    phoneInputContainerStyle: {
        height: 54,
        width: '80%',
        paddingTop: 2,
        borderBottomWidth: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        justifyContent: "center"
    },
    phoneIputStyle: {
        flex: 1,
        fontFamily: "Poppins-Regular",
        marginLeft: 10,
        color: '#1E2023',
        fontSize: 14
    }
}
);
