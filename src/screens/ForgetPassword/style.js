import { StyleSheet, Dimensions, Platform } from 'react-native'
import THEME from '../../assets/styles/theme.style'
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: '15%'
    },
    imageContainer: {
        flex: 0.5,
        justifyContent: "center",
         alignItems: "center"
    },
    imageStyle: {
        height: 250, width: 250
    },
    phoneTextContainer: {
        flex: 0.25,
        justifyContent: 'center',
        marginHorizontal: '10%'
    },
    phoneTextStyle: {
        color: THEME.COLOR_WHITE,
        fontSize: THEME.FONT_SIZE_XLARGE,
        fontFamily: 'Poppins-Regular'
    },
    verifiedTextStyle: {
        color: THEME.PRIMARY_COLOR,
        fontSize: THEME.FONT_SIZE_XLARGE,
        fontFamily: 'Poppins-Bold'
    },
    buttonContainer: {
        flex: 0.2,
        marginHorizontal: "10%"
    },
    textContainer: {
        justifyContent: "center",
        marginHorizontal: "10%"
    },
    textStyle: {
        color: '#9FACBD',
        textAlign: 'center',
        fontSize: THEME.FONT_SIZE_SMALL,
        fontFamily: 'Poppins-Regular'
    },
    inputContainerStyle: {
        height: 54,
        marginBottom: '4%',
        width: screenWidth * 0.8,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
})