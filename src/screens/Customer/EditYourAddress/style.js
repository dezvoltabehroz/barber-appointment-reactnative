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
})