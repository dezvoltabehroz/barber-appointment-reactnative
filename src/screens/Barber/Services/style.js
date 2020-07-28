import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' && screenHeight == 896 ? '30%' : '20%'
    },
    upperContainer: {
        flex: 0.8,
        marginHorizontal: '10%',
        marginBottom: '2%'
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
    nameContainer: {
        flexDirection: 'row',
        flex: 0.8
    },
    iconContainer: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: 'flex-end'
    },
    idTextLabel: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Bold'
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
        paddingTop: "40%",
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
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingVertical: '3%',
        borderRadius: 10,
        alignItems: "center",
    },
})