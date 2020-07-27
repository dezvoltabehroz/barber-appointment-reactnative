import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' && screenHeight == 896 ? '30%' : '20%'
    },
    upperContainer: {
        flex: 0.8,
        marginHorizontal: '10%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    nameContainer: {
        flex: 0.5,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    priceContainer: {
        flex: 0.3,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    timeContainer: {
        flex: 0.3,
        width: screenWidth * 0.2,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    headingContainer: {
        flexDirection: 'row',
    },
    idTextLabel: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Bold'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Regular',
        fontSize: THEME.FONT_SIZE_LARGE,
    },
    timeTextStyle: {
        color: THEME.COLOR_WHITE,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: THEME.FONT_SIZE_MEDIUM,
    },
    headingTextStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Medium',
        fontSize: THEME.FONT_SIZE_LARGE,
    },
    inputContainerStyle: {
        height: 54,
        width: screenWidth * 0.45,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
    inputDateContainerStyle: {
        justifyContent: "center",
        alignItems: "center",
        height: 54,
        width: screenWidth * 0.3,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
    dateContainer: {
        backgroundColor: THEME.COLOR_WHITE,
        borderRadius: 5,
        marginHorizontal: '10%',
        justifyContent: 'center',
        alignItems: "center",
        height: 54,
        width: screenWidth * 0.3,
    },
    dateTextStyle: {
        width: screenWidth * 0.3,
        color: THEME.COLOR_GREY,
        marginLeft: 11,
        fontFamily: 'Poppins-Regular'
    },
    textPriceStyle: {
        fontSize: THEME.FONT_SIZE_SMALL,
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Regular'
    },
    seperatorStyle: {
        height: 15,
    },

})