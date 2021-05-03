
import { StyleSheet, Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import THEME from '../../assets/styles/theme.style';

export default StyleSheet.create({
    container: {
        backgroundColor: '#3B3F52',
        borderRadius: 5,
        marginHorizontal: "5%",
    },
    contentContainer: {
        backgroundColor: '#3B3F52',
        borderRadius: 5,
        marginHorizontal: "5%",

    },
    payByCardContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        height: 54,
        alignItems: 'center',
        marginHorizontal: "5%"
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        height: 35,
        alignItems: 'center',
        marginHorizontal: "5%"
    },
    lineStyle: {
        borderColor: '#44495C',
        borderWidth: 0.5,
        borderRadius: 5,
    },
    borderStyle: {
        borderColor: '#44495C',
        borderWidth: 0.5,
        borderRadius: 5,
        marginHorizontal: '5%'
    },
    textStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: "Poppins-Regular",
        fontSize: THEME.FONT_SIZE_SMALL
    },
    rowStyle: {
        flexDirection: "row",
        alignItems: "center"
    },
    column: {
        flex: 0.2,
        flexDirection: "column"
    },
    columnChange: {
        flex: 0.25,
        flexDirection: "column",
        alignItems: 'center'
    },
    columnArrow: {
        flex: 0.25,
        flexDirection: "column",
        alignItems: 'flex-end'
    },
    columnLocation: {
        flex: 0.45,
        flexDirection: "column"
    },
    columnTimeAndDate: {
        flex: 0.25,
        flexDirection: "column"
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginHorizontal: "5%"
    },
    colorTextStyle: {
        color: THEME.COLOR_GREY,
        fontFamily: "Poppins-Medium",
        // fontSize: THEME.FONT_SIZE_SMALL
    },
    pointTExtStyle: {
        color: THEME.PRIMARY_COLOR,
        fontSize: 10
    },
    mapStyle: {
        height: screenHeight < 600 ? screenHeight * 0.35 : screenHeight * 0.45,
        width: screenWidth * 0.9,
    },
    marginVertical: {
        marginVertical: "2%",
        // flex: 1
    },
    generalMargin: {
        marginVertical: "3%",
        marginHorizontal: "5%"
    },
    textFlex: {
        marginHorizontal: "5%",
        flex: 1
    },
    inputContainer: {
        marginTop: "3%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // height: 54,
        width: screenWidth * 0.8,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
    inputRowContainerStyle: {
        marginVertical: '3%',
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        // height: 60,
        width: screenWidth * 0.4,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
    iconStyle: {
        marginHorizontal: 5
    },
    containerStyle: { height: 60, },
    labelStyle: {
        paddingLeft: 9,
        color: THEME.COLOR_GREY,
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
    },
    inputContainerStyle: {
        height: 54,
        width: '100%',
        borderBottomWidth: 0,
    },
    inputStyle: {
        fontSize: 14,
        paddingLeft: 10,
        marginTop: 10,
        borderBottomWidth: 0,
        // color: THEME.PRIMARY_COLOR,
        fontFamily: 'Poppins-Medium'
    },
    width: {
        width: screenWidth * 0.4,
    }
})
















