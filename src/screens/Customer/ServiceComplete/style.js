import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' ? screenHeight >= 812 ? '25%' : '18%' : '15%'
    },
    upperContainer: {
        flex: 0.8,
        marginHorizontal: '10%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    iconContainer: {
        justifyContent: "center", alignItems: "center"
    },
    rowStyle: {
        flexDirection: "row",
    },
    borderStyle: {
        flex: 1,
        justifyContent: 'center',
    },
    textStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Medium',
        fontSize: 11,
    },
    headingTextStyle1: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Bold',
        fontSize: THEME.FONT_SIZE_MEDIUM,
    },
    headingText: {
        color: THEME.COLOR_WHITE,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: THEME.FONT_SIZE_LARGE,
    },
    messageContainerStyle: {
        height: 110,
        marginVertical: '4%',
        width: screenWidth * 0.8,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
    cardStyle: {
        paddingTop: '2%',
        flexDirection: 'row',
        borderRadius: 10,
        paddingVertical: '2%'

    },
    avatarContainer: {
        marginHorizontal: '2%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameContainer: {
        marginHorizontal: '5%',
        flex: 1,
        justifyContent: 'center',
    },
    nameTextStyle: {
        fontSize: THEME.FONT_SIZE_LARGE,
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Medium'
    },
    dateTextStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Regular'
    },
    content: {
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        padding: 22,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: 5,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
    inputContainerStyle: {
        height: 54,
        width: screenWidth * 0.75,
        borderRadius: 5,
        marginBottom: '5%',
        backgroundColor: THEME.COLOR_WHITE
    },
    tipContainer: {
        height: 54,
        backgroundColor: THEME.PRIMARY_COLOR,
        justifyContent: "center",
        alignItems: "center",
        width: screenWidth * 0.35,
        borderRadius: 7
    },
    buttonText: {
        color: THEME.COLOR_WHITE,
        textAlign: 'right',
        fontFamily: 'Poppins-Medium'
    }
})