import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: '2.5%'
    },
    upperContainer: {
        flex: 0.8,
        marginHorizontal: '10%'
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
        fontSize: THEME.FONT_SIZE_MEDIUM,
        fontFamily: 'Poppins-Regular'
    },
    seperatorStyle: {
        height: 15,
    },
    headingTextStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Bold',
        fontSize: THEME.FONT_SIZE_MEDIUM,
    },
})