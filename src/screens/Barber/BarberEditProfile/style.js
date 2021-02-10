import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' ? screenHeight >= 812 ? '25%' : '18%' : '15%'
    },
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
        textAlign: 'center',
        fontFamily: 'Poppins-Bold'
    },
    rowStyle: {
        flexDirection: "row",
        // height:54,
        alignItems: "center"
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginHorizontal: '5%',
        width: screenWidth * 0.9,
        paddingVertical: "5%",
        // paddingLeft: "5%"
    },
    gapHeight: {
        height: 10,
        width: 20
    },
    column: {
        flex: 0.2,
        flexDirection: "column"
    },
    columnChange: {
        flex: 0.6,
        flexDirection: "column",
        // alignItems: 'center'
    },
    row: {
        flex: 0.3,
        flexDirection: "row",
        justifyContent: "center"
    },
    lineStyle: {
        borderColor: '#44495C',
        borderWidth: 0.5,
        borderRadius: 5,
    },
    avatarStyle: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 100
    },
    headingContainer: {
        height: 54,
        flexDirection: 'row',
    },
    textStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: "Poppins-Bold",
        fontSize: THEME.FONT_SIZE_MEDIUM
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        height: 54,
        alignItems: 'center',
        // marginHorizontal: "5%"
    },
    nameContainer: {
        flex: 0.6,
        flexDirection: 'column',
        justifyContent: 'center'
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
        justifyContent: 'center',
    },
    headingTextStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Bold',
        fontSize: THEME.FONT_SIZE_SMALL,
    },
    headingTextStyle1: {
        color: THEME.COLOR_WHITE,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: THEME.FONT_SIZE_SMALL,
    },
})