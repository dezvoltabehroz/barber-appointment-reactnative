import { StyleSheet, Platform } from 'react-native'
import THEME from '../../../assets/styles/theme.style'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        justifyContent: "center",
    },
    innerContainer: {
        flex: 2,
        marginTop: Platform.OS == 'ios' ? '30%' : '25%'
    },
    flagContainer: {
        flexDirection: "row",
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10
    },
    flagInnerContainer: {
        color: "gray",
        marginHorizontal: "3%",
        height: 20,
        justifyContent: "center"
    },
    column: {
        flex: 1,
        flexDirection: 'column',
    },
    column1: {
        flex: 0.1,
        flexDirection: 'column',
    },
    labelHeadingStyle: {
        marginHorizontal: '10%',
        backgroundColor: "#FAFAFA",
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#00A9A5"
    },
    countryLabelHeading: {
        color: '#9FACBD',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        marginLeft: 7,
        marginTop: 5
    },
    callingCodeAndPhoneNumberConatiner: {
        marginBottom: 5,
        flexDirection: "row",
        marginHorizontal: '10%',
        borderRadius: 5,
        overflow: "hidden",
        height: 54,
        backgroundColor: '#fff'
    },
    gapHeight: {
        height: 15
    },
    countryCodeContainer: {
        borderRightWidth: 1,
        paddingTop: 10,
        borderColor: "#9FACBD",
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 54
    },
    coutryCodeTextStyle: {
        color: '#9FACBD',
        fontFamily: "Poppins-Regular",
    },
    lineStyle: {
        borderColor: '#44495C',
        borderWidth: 2,
        marginHorizontal: '10%',
        borderRadius: 5
    },
    buttonContainer: {
        marginHorizontal: '10%'
    },
    textContainer: {
        marginHorizontal: '10%'
    },
    textStyle: {
        color: "#9FACBD",
        fontFamily: "Poppins-Regular",
        textAlign: 'center'
    },
    designContainer: {
        flex: 0.8,
        backgroundColor: '#1E2023'
    },
    themeText: {
        fontSize: 12,
        fontFamily: 'Poppins-Bold'
    }

})