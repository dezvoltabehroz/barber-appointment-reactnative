import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../assets/styles/theme.style';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: '2%',
    },
    buttonContainer: {
        marginHorizontal: '10%'
    },
    rowButtonContainer: {
        width: '46%',
        paddingHorizontal: '6%'
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: screenWidth,
        paddingVertical: "5%",
        paddingLeft: "5%"
    },
    flatlistContainer: {
        backgroundColor: THEME.PRIMARY_COLOR,
        height: 44,
        width: screenWidth * 0.8,
        marginVertical: "2%",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    textFlatlistStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: "Poppins-Regular",
        margin: 7,
        textAlign: "center",
        width: screenWidth * 0.3,
    },
    textStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Regular'
    },
    headingContainer: {
        marginVertical: "2%",
        justifyContent: "center",
        alignItems: "center"
    },
    headingTextStyle: {
        fontSize: THEME.FONT_SIZE_LARGE,
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Medium'
    },
    addServiceContainer: {
        justifyContent: 'flex-end',
        top: screenHeight < 600 ? 0 : 25
    },
    seperatorStyle: {
        height: 15,
    },
    modalContainer: {
        flex: 1,
        height: screenHeight * 1,
        width: screenWidth * 1,
        paddingTop: '10%',
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
    },
    inputContainerStyle: {
        height: 54,
        width: screenWidth * 0.8,
        borderRadius: 5,
        marginHorizontal: '3%',
        marginBottom: '5%',
        backgroundColor: THEME.COLOR_WHITE
    },
    modalInputContainer: {
        flex: 0.4,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        marginBottom: '20%',
        borderRadius: 10,
        alignItems: "center",
    },

})