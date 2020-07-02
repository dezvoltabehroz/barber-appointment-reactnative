import { StyleSheet } from 'react-native'
import THEME from '../../assets/styles/theme.style'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        justifyContent: "center",

    },
    imageContainer: {
        marginVertical: "2%",
        alignItems: "center",
        paddingHorizontal: "15%"
    },
    imageStyle: {
        height: 150,
        width: 150
    },
    TextContainer: {
        paddingHorizontal: "10%",
        marginBottom: 10
    },
    headingTextStyle: {
        fontSize: THEME.FONT_SIZE_LARGE,
        fontFamily: 'Poppins-Regular',
        color: THEME.PRIMARY_TEXT_COLOR
    },
    babeoTextStyle: {
        fontFamily: 'Poppins-Bold',
        fontSize: THEME.FONT_SIZE_LARGE,
        color: THEME.PRIMARY_COLOR
    },
    customerAndBarberContainer: {
        borderRadius: 5,
        // marginBottom: 10,
        marginVertical: "5%",
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
    optionTextStyle: { fontFamily: 'Poppins-Regular', fontSize: 15, marginHorizontal: 10, marginTop: 5 },
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
    faceBookButton: {
        height: 54,
        borderRadius: 5,
        marginHorizontal: '10%',
        justifyContent: "center",
        marginBottom: 10,
        backgroundColor: "#1281E3"
    },
    iconContainer: { flexDirection: "column", marginLeft: '15%' },
    phoneNumberButton: {
        height: 54,
        borderRadius: 5,
        marginHorizontal: '10%',
        justifyContent: "center",
        marginBottom: 10,
        backgroundColor: THEME.PRIMARY_COLOR
    },
    signUpAndLoginTextStyle: {
        marginVertical: "5%",
        fontFamily: "Poppins-Regular",
        textAlign: "center",
        color: THEME.COLOR_WHITE
    },
    continueWithoutTextStyle: {
        marginVertical: "5%",
        fontFamily: "Poppins-Regular",
        textAlign: "center",
        color: '#9FACBD'
    },
    buttonTextStyle: { color: "#fff", fontSize: 15, textAlign: "center", fontFamily: "Poppins-Medium" },
    phoneTextContainer: { flexDirection: "column", marginHorizontal: "10%", },
    facebookTextContainer: { flexDirection: "column", marginHorizontal: "18%", },
    continueContainer: { alignItems: "center", width: "100%" },
    continueContainerStyle: { flexDirection: 'row', alignItems: "center", }
})