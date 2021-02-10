import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' ? screenHeight >= 812 ? '25%' : '18%' : '15%'
    },
    barberProfileContainer: {
        marginHorizontal: '5%',
        borderRadius: 10,
        backgroundColor: THEME.COLOR_WHITE
    },
    cardStyle: {
        flexDirection: 'row',
        paddingTop: '5%',
        borderRadius: 10,
        backgroundColor: THEME.COLOR_WHITE,
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    nameContainer: {
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