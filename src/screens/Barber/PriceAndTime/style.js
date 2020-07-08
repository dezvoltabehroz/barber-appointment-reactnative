import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: '15%'
    },
    upperContainer: {
        flex: 0.8,
        marginHorizontal: '10%'
    },

    contentContainer: {},
    nameContainer: { flex: 0.6 },
    priceAndTimeContainer: { marginHorizontal: 5 },
    priceTimeContainer: { flex: 0.4, flexDirection: 'row', justifyContent: "space-between" },
    headingnameContainer: { flex: 0.6 },
    headingpriceAndTimeContainer: { marginHorizontal: 5 },
    headingpriceTimeContainer: { flex: 0.4, flexDirection: 'row', justifyContent: "space-between",marginHorizontal:'12%' },
    idTextLabel: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Bold'
    },

    textStyle: {
        color: THEME.COLOR_WHITE,
        // textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: THEME.FONT_SIZE_LARGE,
    },
    headingTextStyle: {
        color: THEME.COLOR_WHITE,
        // textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        fontSize: THEME.FONT_SIZE_LARGE,
    },
    inputContainerStyle: {
        height: 54,
        // marginBottom: '4%',
        width: screenWidth * 0.45,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
    inputDateContainerStyle: {
        justifyContent: "center",
        alignItems: "center",
        height: 54,
        // marginBottom: '4%',
        width: screenWidth * 0.3,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
    textPriceStyle: {
        fontSize: THEME.FONT_SIZE_SMALL,
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Regular'
    },
    seperatorStyle: {
        height: 15,
    },

    // FOoter StylEs
    lineStyle: {
        borderColor: '#44495C',
        borderWidth: 2,
        marginHorizontal: '10%',
        borderRadius: 5
    },
    gapHeight: {
        height: 15
    },
    buttonContainer: {
        marginHorizontal: '10%'
    },
    footerStyle: { flex: 0.2, justifyContent: 'flex-end', paddingBottom: '8%' }

})