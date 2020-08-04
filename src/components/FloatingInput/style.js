import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../assets/styles/theme.style';

const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    labelTextStyle: {
        marginTop: 17,
        paddingLeft: 9,
        color: THEME.COLOR_GREY,
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
    },
    inputStyle: {
        fontSize: 14,
        paddingLeft: 10,
        marginTop: 10,
        borderWidth: 0,
        fontFamily: 'Poppins-Medium'
    },
    phonelabelTextStyle: {
        marginTop: 15,
        paddingLeft: 9,
        color: THEME.COLOR_GREY,
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
    },
    messageinputStyle: {
        fontSize: 14,
        paddingLeft: 10,
        marginTop: 10,
        borderWidth: 0,
        fontFamily: 'Poppins-Medium', height: 100
    },
    phoneinputStyle: {
        fontSize: 14,
        paddingLeft: 10,
        marginTop: 14,
        borderWidth: 0,
        fontFamily: 'Poppins-Medium'
    },
    container: { width: '100%' },
    messageContainer: { width: '100%' },
    iconContainerStyle: { width: "80%" },
    iconSmallContainerStyle: { width: "70%" },
    phoneContainer: { width: '79.5%' }


});