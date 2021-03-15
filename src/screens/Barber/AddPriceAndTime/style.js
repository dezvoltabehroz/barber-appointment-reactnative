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
        // marginHorizontal: '10%'
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
        flex: 0.2,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    timeContainer: {
        flex: 0.35,
        width: screenWidth * 0.2,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    headingContainer: {
        flexDirection: 'row',
        height: 54,
        marginBottom: "5%",
        paddingHorizontal: '5%',
        backgroundColor: "#171717"
    },
    idTextLabel: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Bold'
    },
    inputContainer: {
        flexDirection: 'row',
        // alignSelf: 'flex-end',

        justifyContent: 'space-between'
    },
    containerStyle: {
        height: 50,
        marginBottom: 20
    },
    inputContainerStyle: {
        height: 50,
        backgroundColor: '#171717',
        width: 60,
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: THEME.PRIMARY_COLOR,
        // borderRadius: 5,
    },
    inputStyle: {
        flex: 1,
        textAlign: 'center',
        marginLeft: "5%",
        marginBottom: -20,
        fontSize: THEME.FONT_SIZE_LARGE,
        fontFamily: 'Poppins-Regular',
        color: THEME.PRIMARY_COLOR,
    },
    textStyle: {
        color: THEME.PRIMARY_COLOR,
        fontFamily: 'Poppins-Medium',
        fontSize: 11,
    },
    titleStyle: {
        color: THEME.COLOR_GREY,
        // textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: THEME.FONT_SIZE_SMALL,
    },
    timeTextStyle: {
        color: THEME.PRIMARY_COLOR,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: THEME.FONT_SIZE_MEDIUM,
    },
    headingTextStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Bold',
        fontSize: THEME.FONT_SIZE_SMALL,
    },
    headingTextStyle1: {
        fontSize: 16,
        color: THEME.PRIMARY_COLOR,
        // textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: THEME.FONT_SIZE_SMALL,
    },
    headingTextStyle2: {
        color: THEME.PRIMARY_COLOR,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
    },
    // inputContainerStyle: {
    //     height: 54,
    //     width: screenWidth * 0.45,
    //     borderRadius: 5,
    //     backgroundColor: THEME.COLOR_WHITE,
    // },
    viewPlaceHolder: {
        height: 54,
        width: screenWidth * 0.45,
    },
    viewDatePlaceHolder: {
        width: screenWidth * 0.05,
    },
    inputDateContainerStyle: {
        justifyContent: "center",
        paddingTop: '20%',
        paddingLeft: "7%",
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
        height: 5,
    },
    addServiceContainer: {
        justifyContent: 'flex-end',
        top: screenHeight < 600 ? 0 : 25
    },
    rowButtonContainer: {
        width: '46%',
        paddingHorizontal: '6%'
    },
    modalContainer: {
        flex: 1,
        height: screenHeight * 1,
        width: screenWidth * 1,
        paddingTop: "40%",
        // alignSelf: "center",
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
    },
    headingTextStyle: {
        fontSize: THEME.FONT_SIZE_LARGE,
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Medium'
    },
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
    contentContainer: {
        paddingHorizontal: "5%",
        height: 54,
        justifyContent: "center",
        backgroundColor: "#171717"
    }

})