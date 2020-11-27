import { StyleSheet, Dimensions } from "react-native";
import THEME from '../../../assets/styles/theme.style';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' && screenHeight == 896 ? '25%' : '15%'
    },
    listItemContainer: {
        borderRadius: 10,
        backgroundColor: THEME.COLOR_WHITE,
        marginHorizontal: '5%',
        paddingVertical:'5%'
    },
    cardStyle: {
        paddingTop: '2%',
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: THEME.COLOR_WHITE,
        borderRadius: 10,
        paddingVertical: '2%'

    },
    nameContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    iconContainer: {
        // paddingTop:'4%',
        flexDirection:'column',
        flex: 0.3,
        justifyContent: 'space-between',
    },
    nameTextStyle: {
        fontSize: THEME.FONT_SIZE_LARGE,
        color: THEME.COLOR_BLACK,
        fontFamily: 'Poppins-Medium'
    },
    dateTextStyle: {
        color: THEME.COLOR_BLACK,
        fontFamily: 'Poppins-Regular'
    },
    seperatorHeightStyle: {
        height: 15
    },
    avatarContainer: {
        marginHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginHorizontal: '5%'
    },
    buttonTextStyle: {
        marginHorizontal: '10%',
        color: '#fff',
        fontFamily: 'Poppins-Medium'
    },
    buttonStyle: {
        backgroundColor: THEME.PRIMARY_COLOR,
        borderRadius: 7,
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    daycontainer: {
        flexDirection: 'row',
        width: screenWidth * 0.3
    },
    daysContainer: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 20,
        marginHorizontal: '0.5%'
    },
    textStyle: {
        fontSize: 10,
        padding: '3%',
        height: 18,
        width: 20,
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins-Regular'
    },
    tabContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom:'2%'
    }
})