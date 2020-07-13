import { StyleSheet, Dimensions } from "react-native";
import THEME from '../../../assets/styles/theme.style';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' && screenHeight == 896 ? '30%' : '20%'
    }, lowerListContainer: { flex: 1, paddingTop: '5%', marginBottom: '1%', justifyContent: "center" },
    lowerListItemContainer: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    cardStyle: {
        flexDirection: 'row',
        backgroundColor: THEME.COLOR_WHITE,
        borderRadius: 10,
        height: screenHeight * 0.15,
        width: screenWidth * 0.9
    },
    nameContainer: {
        flex: 1,
        paddingHorizontal: '6%',
        justifyContent: 'center',
    },
    nameTextStyle: {
        fontSize: THEME.FONT_SIZE_LARGE,
        color: THEME.COLOR_BLACK,
        fontFamily: 'Poppins-Medium'
    },
    dateTextStyle: {
        // fontSize: THEME.FONT_SIZE_MEDIUM,
        color: THEME.COLOR_BLACK,
        fontFamily: 'Poppins-Medium'
    },
    seperatorHeightStyle: {
        height: 15
    },
    avatarContainer: { justifyContent: 'center', alignItems: 'center', marginLeft: '6%' },
})