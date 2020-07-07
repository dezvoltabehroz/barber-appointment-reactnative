import { StyleSheet, Dimensions, Platform } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' ? '15%' : null
    },

    // Upper Container Style
    upperContainer: {
        flex: 0.8,
    },
    imageContainer: {
        marginTop: '10%',
        justifyContent: "center",
        alignItems: 'center'
    },
    imageStyle: {
        width: screenWidth * 0.8,
        height: screenHeight * 0.3,
    },
    avatarContainer: {
        marginTop: '8%',
        justifyContent: "center",
        alignItems: 'center'
    },
    profileTextStyle: {
        marginVertical: "3%",
        fontSize: THEME.FONT_SIZE_SMALL,
        fontFamily: 'Poppins-Regular',
        color: THEME.PRIMARY_COLOR
    },
    //Lower Container Style
    lowerContainer: {
        // flex: 0.4,
        // marginTop: '15%',
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainerStyle: {
        // borderWidth: 2,
        // borderColor: THEME.PRIMARY_COLOR,
        marginHorizontal: '10%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 54,
        width: screenWidth * 0.8,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
    inputLocationContainerStyle: {
        // borderWidth: 2,
        // borderColor: THEME.PRIMARY_COLOR,
        marginHorizontal: '10%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 54,
        marginBottom: '4%',
        width: screenWidth * 0.8,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
    iconStyle: {
        marginHorizontal: 15
    },
    customerAndBarberContainer: {
        borderRadius: 5,
        marginTop: 15,
        width: screenWidth * 0.8,
        marginHorizontal: '10%',
        flexDirection: 'row',
        justifyContent: "center",
        backgroundColor: THEME.COLOR_WHITE,
        height: 54,
    },
    CustomerContainer: {
        margin: 3,
        borderRadius: 5,
        width: "46%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center'

    },
    optionContainer: { flexDirection: "row", marginHorizontal: 10 },
    optionTextStyle: { color: '#1E2023', fontFamily: 'Poppins-Regular', fontSize: 15, marginHorizontal: 10, marginTop: 5 },
    gap: {
        width: THEME.GAP_BETWEEN_ELEMENT
    },
    barberContainer: {
        margin: 3,
        borderRadius: 5,
        width: "46%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center'
    },
    lineStyle: {
        // marginTop: '10%',
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
    dateContainer: {
        backgroundColor: THEME.COLOR_WHITE,
        borderRadius: 5,
        marginVertical: '4%',
        marginHorizontal: '10%',
        justifyContent: 'center',
        alignItems: "center",
        height: 54,
        width: screenWidth * 0.8,
    },
    dateTextStyle: {
        width: screenWidth * 0.765,
        color: THEME.COLOR_GREY,
        marginLeft: 11,
        fontFamily: 'Poppins-Regular'
    },
    footerStyle: {
        flex: 0.2,
        justifyContent: 'flex-end',
        paddingBottom: '8%'
    }
})