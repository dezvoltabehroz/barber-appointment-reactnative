import { StyleSheet, Dimensions, Platform } from 'react-native'
import THEME from '../../assets/styles/theme.style'
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' ? screenHeight >= 812 ? '25%' : '18%' : '15%'
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    imageStyle: {
        height: 225, width: 225
    },
    phoneTextContainer: {
        // justifyContent: 'center',
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
        marginTop: '5%',
        justifyContent: 'flex-end',
        marginHorizontal: "10%"
    },
    textContainer: {
        marginVertical: '5%',
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
        width: screenWidth * 0.8,
        borderRadius: 5,
        marginHorizontal: '10%',
        marginBottom: '5%',
        backgroundColor: THEME.COLOR_WHITE
    },
})