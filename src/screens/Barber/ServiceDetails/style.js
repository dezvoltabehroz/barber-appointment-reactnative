import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' && screenHeight == 896 ? '30%' : '15%'
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
    flatlistContainer: {
        flex:1,
        // height: screenHeight < 600 ? screenHeight * 0.35 : screenHeight * 0.45
    },
    rowStyle: {
        flexDirection: "row",
        paddingTop: '5%',
    },
    borderStyle: {
        // borderColor: THEME.COLOR_WHITE,
        // borderWidth: 1
    },
    headingContainer: {
        flexDirection: 'row',
    },
    textStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Medium',
        fontSize: 11,
    },
    timeTextStyle: {
        color: THEME.COLOR_WHITE,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: THEME.FONT_SIZE_SMALL,
    },
    headingTextStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Bold',
        fontSize: THEME.FONT_SIZE_MEDIUM,
    },
    headingTextStyle1: {
        color: THEME.COLOR_WHITE,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: THEME.FONT_SIZE_SMALL,
    },
    textPriceStyle: {
        fontSize: THEME.FONT_SIZE_SMALL,
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Regular'
    },
    seperatorStyle: {
        height: 15,
    },
    headingText: {
        color: THEME.COLOR_WHITE,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        fontSize: THEME.FONT_SIZE_MEDIUM,
    },

})