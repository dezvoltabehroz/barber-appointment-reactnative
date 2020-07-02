import { StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style';

export default StyleSheet.create({
    containerStyle: {
        height: 70,
        // width:'10%'
    },
    inputContainerStyle: {
        height: 54,
        width:'100%',
        borderBottomWidth: 0,
        // marginVertical: 3,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        // elevation: 2,
        // marginHorizontal: 15
    },
    inputStyle: {
        flex: 1,
        marginLeft: 10,
        fontSize: 12,
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
