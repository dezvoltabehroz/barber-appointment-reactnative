import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const plusWidth = screenWidth * .3;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' && screenHeight == 896 ? '30%' : '20%'
    },
    barberProfileContainer: {
        marginHorizontal: '5%',
        // flex: 0.5,
        borderRadius: 10,
        backgroundColor: THEME.COLOR_WHITE
    },
    cardStyle: {
        flexDirection: 'row',
        paddingTop: '5%',
        borderRadius: 10,
        // paddingLeft:'10%',
        backgroundColor: THEME.COLOR_WHITE,
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    nameContainer: {
        // flex: 1,
        marginHorizontal: '7%',
        justifyContent: 'center',

    },
    nameTextStyle: {
        fontSize: THEME.FONT_SIZE_LARGE,
        color: THEME.COLOR_BLACK,
        fontFamily: 'Poppins-Medium'
    },
    dateTextStyle: {
        color: THEME.COLOR_BLACK,
        fontFamily: 'Poppins-Medium'
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '3%'
    },
    buttonContainer: {
        flex: 0.2,
        marginHorizontal: '10%',
        marginTop: '2%',
        justifyContent: "flex-end"
    },
})