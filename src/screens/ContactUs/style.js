import { StyleSheet, Dimensions, Platform } from 'react-native'
import THEME from '../../assets/styles/theme.style'
const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' ? "15%" : "5%"
    },
    upperContainer: {
        // flex: 1,
        // justifyContent: "flex-start",
        marginTop: "15%"
        // alignItems: "center"
    },

    gap: {
        width: THEME.GAP_BETWEEN_ELEMENT
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
    onSubmitTrue: { marginTop: "2%", marginBottom: "1%" }
})