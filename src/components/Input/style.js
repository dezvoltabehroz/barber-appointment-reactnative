import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../assets/styles/theme.style';
const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    containerStyle: {
        height: 60,
    },
    inputContainerStyle: {
        height: 54,
        width: '100%',
        borderBottomWidth: 0,
        backgroundColor: '#171717',
        // borderRadius: 5,
    },
    inputStyle: {
        flex: 1,
        // textAlign: 'center',
        marginLeft: "5%",
        fontSize: THEME.FONT_SIZE_MEDIUM,
        fontFamily: 'Poppins-Regular',
        color: THEME.PRIMARY_COLOR,
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
    },
    messageinputStyle: {
        textAlignVertical: 'top',
        marginLeft: "5%",
        alignSelf: "flex-start",
        fontSize: THEME.FONT_SIZE_MEDIUM,
        fontFamily: 'Poppins-Regular',
        color: THEME.PRIMARY_COLOR,
    },
    messageInputContainerStyle: {
        height: 140,
        width: '100%',
        paddingTop: 2,
        borderBottomWidth: 0,
        backgroundColor: '#171717',
        borderRadius: 0,
    },
}
);
