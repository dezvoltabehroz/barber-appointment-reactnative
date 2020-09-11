import { StyleSheet, Dimensions } from "react-native";
import THEME from '../../../assets/styles/theme.style';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' && screenHeight == 896 ? '20%' : '10%'
    },
    mapStyle: {
        marginTop: "2%",
        height: screenHeight < 600 ? screenHeight * 0.35 : screenHeight * 0.45,
        width: screenWidth * 0.9,
        marginHorizontal: "5%",
    },
    upperContainer: {
        flex: 0.8,
        marginTop: Platform.OS == 'ios' ? '10%' : null,

    },
    buttonContainer: {
        marginHorizontal: '5%'
    },
    inputContainerStyle: {
        height: 54,
        marginBottom: '4%',
        width: screenWidth * 0.9,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
    messageContainerStyle: {
        height: 110,
        marginBottom: '4%',
        width: screenWidth * 0.9,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
    addressContainer: {
        backgroundColor: THEME.COLOR_WHITE,
        borderRadius: 5,
        marginHorizontal: '5%',
        marginVertical: '5%'
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    imageContainer: {
        flexDirection: 'row',
        paddingVertical: "5%",
        paddingHorizontal: '5%',
        alignItems: "center"
    },
    addressTextContainer: {
        marginLeft: '5%',
        justifyContent: 'center',
        width: '70%'
    },
    editContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: '5%'
    },
    addressTextStyle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12
    },
    addressTextStyle1: {
        fontFamily: 'Poppins-Bold',
        fontSize: 10
    },
    labelHeading: {
        fontFamily: 'Poppins-Bold',
        color: THEME.COLOR_WHITE
    },
    labelButtonContainer: {
        backgroundColor: THEME.COLOR_WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        width: 100,
        borderRadius: 20
    }
})