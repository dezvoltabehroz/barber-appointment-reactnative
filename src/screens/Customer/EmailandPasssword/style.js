import { StyleSheet, Dimensions, Platform } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' && screenHeight == 896 ? '30%' : '20%'
    },

    // Upper Container Style
    upperContainer: {
        flex: 0.8,
        marginTop: Platform.OS == 'ios' ? '10%' : null,

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
        height: 54,
        width: screenWidth * 0.8,
        borderRadius: 5,
        marginHorizontal: '10%',
        marginBottom: '5%',
        backgroundColor: THEME.COLOR_WHITE
    },
    iconStyle: {
        marginHorizontal: 15
    },
    customerAndBarberContainer: {
        borderRadius: 5,
        marginBottom: 15,
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
    optionContainer: {
        flexDirection: "row",
        marginHorizontal: 10
    },
    optionTextStyle: {
        color: '#1E2023',
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        marginHorizontal: 10,
        marginTop: 5
    },
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
    }
})