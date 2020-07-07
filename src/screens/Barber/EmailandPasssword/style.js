import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: '15%'
    },

    // Upper Container Style
    upperContainer: {
        flex: 1
    },
    imageContainer: {
        marginTop: '10%',
        justifyContent: "center",
        alignItems: 'center'
    },
    imageStyle: {
        width: 300,
        height: 300
    },
    avatarContainer: {
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
        flex: 0.5,
    },
    inputContainerStyle: {
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
        marginBottom: 15,
        // marginVertical: "2%",
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
})