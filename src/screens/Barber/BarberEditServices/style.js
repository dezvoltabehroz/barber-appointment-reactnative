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
        flex: 0.9,
        marginHorizontal: '5%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    nameContainer: {
        flex: 0.6,
        flexDirection: 'column',
        // justifyContent: 'center'
    },
    priceContainer: {
        flex: 0.2,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    timeContainer: {
        flex: 0.25,
        width: screenWidth * 0.2,
        flexDirection: 'column',
        // justifyContent: 'center',
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
        color: THEME.PRIMARY_COLOR,
        fontFamily: 'Poppins-Medium',
        fontSize: 11,
    },
    titleStyle: {
        color: THEME.PRIMARY_COLOR,
        // textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: THEME.FONT_SIZE_SMALL,
    },
    timeTextStyle: {
        color: THEME.PRIMARY_COLOR,
        // textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: THEME.FONT_SIZE_SMALL,
    },
    headingTextStyle1: {
        color: THEME.COLOR_WHITE,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 10,
    },
    inputContainerStyle: {
        height: 54,
        width: screenWidth * 0.45,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
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
        height: 15,
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
        paddingTop: "10%",
        alignSelf: "center",
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
    },
    modalServiceContainer: {
        flex: 1,
        height: screenHeight * 1,
        width: screenWidth * 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
    },
    headingTextStyle: {
        fontSize: 16,
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Bold'
    },
    inputModalContainerStyle: {
        // marginTop: '10%',
        justifyContent: "center",
        height: 54,
        // width: screenWidth * 0.8,
        // borderRadius: 5,
        marginHorizontal: '3%',
        marginBottom: '5%',
        backgroundColor: '#171717'
    },
    modalInputContainer: {
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingVertical: '3%',
        borderRadius: 10,
        alignItems: "center",
    },
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'Poppins-Bold'
    },
    contentContainer: {
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        backgroundColor: '#171717',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },

})