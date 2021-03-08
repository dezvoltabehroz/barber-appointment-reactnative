import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' ? screenHeight >= 812 ? '25%' : '18%' : '15%'
    },
    upperContainer: {
        flex: 0.8,
        // paddingHorizontal: '5%'
    },
    dayContainer: {
        flex: 0.4,
        flexDirection: 'column'

    },
    priceAndTimeContainer: {
        marginHorizontal: 5
    },
    iconContainer: {
        flex: 0.2,
        flexDirection: 'column',
        alignSelf: "flex-end"
    },
    startTimeContainer: {
        flex: 0.3,
        flexDirection: 'column',
        alignItems: 'center'
    },
    endTimeContainer: {
        flex: 0.3,
        flexDirection: 'column',
        alignItems: 'center'
    },
    headingContainer: {
        flexDirection: 'row',
        height: 54,
        marginBottom: "5%",
        alignItems: "center",
        paddingHorizontal: '5%',
        backgroundColor: "#171717"
    },

    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textStyle: {
        color: THEME.PRIMARY_COLOR,
        fontFamily: 'Poppins-Medium',
        fontSize: 10,
    },
    headingTextStyle: {
        color: THEME.PRIMARY_COLOR,
        fontFamily: 'Poppins-Bold',
        fontSize: THEME.FONT_SIZE_SMALL,
    },
    headingTextStyle1: {
        color: THEME.PRIMARY_COLOR,
        fontFamily: 'Poppins-Bold',
        fontSize: 10,
    },
    viewDatePlaceHolder: {
        width: screenWidth * 0.05,
    },
    inputContainerStyle: {
        height: 54,
        width: screenWidth * 0.45,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
    titleStyle: {
        color: THEME.COLOR_GREY,
        // textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: THEME.FONT_SIZE_SMALL,
    },
    inputDateContainerStyle: {
        justifyContent: "center",
        paddingTop: '10%',
        paddingLeft: "4%",
        height: 54,
        width: screenWidth * 0.3,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
    dateContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 54,
        width: screenWidth * 0.3,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
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
        height: 5,
    },
    modalContainer: {
        flex: 1,
        height: screenHeight * 1,
        width: screenWidth * 1,
        paddingTop: "40%",
        // alignSelf: "center",
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
    },
    // headingTextStyle: {
    //     fontSize: THEME.FONT_SIZE_LARGE,
    //     color: THEME.COLOR_WHITE,
    //     fontFamily: 'Poppins-Medium'
    // },
    inputModalContainerStyle: {
        height: 54,
        width: screenWidth * 0.8,
        borderRadius: 5,
        marginHorizontal: '3%',
        marginBottom: '5%',
        backgroundColor: THEME.COLOR_WHITE
    },
    modalInputContainer: {
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingVertical: '3%',
        borderRadius: 10,
        alignItems: "center",
    },

    rowButtonContainer: {
        width: '46%',
        paddingHorizontal: '6%'
    },
    lineStyle: {
        borderColor: '#44495C',
        borderWidth: 2,
        marginHorizontal: '10%',
        borderRadius: 5
    },
    gapHeight: {
        height: 15
    },
    gapHeight1: {
        height: 5
    },
    buttonContainer: {
        marginHorizontal: '10%',
    },
    footerStyle: {
        flex: 0.3,
        justifyContent: 'flex-end',
        paddingBottom: '8%',
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR
    },
    footerConatinerStyle: {
        flex: 0.3,
        justifyContent: 'flex-end',
        paddingBottom: '8%',
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR
    }
})