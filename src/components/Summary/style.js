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
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    colorTextStyle: {
        color: THEME.COLOR_GREY,
        fontFamily: "Poppins-Regular",
        fontSize: THEME.FONT_SIZE_SMALL
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
        marginVertical: "2%"
    },
    generalMargin: {
        marginVertical: "3%",
        marginHorizontal: "5%"
    },
    textFlex: {
        marginHorizontal: "5%",
        flex: 1
    }
})