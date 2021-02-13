import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../assets/styles/theme.style';

const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    btnPrimary: {
        height: 54,
        width: '100%',
        elevation: 2,
        borderRadius: 0.0000000000001,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.BUTTON_COLOR
    },
    btnPrimaryText: {
        fontFamily: 'Poppins-Medium',
        fontSize: THEME.FONT_SIZE_MEDIUM,
        color: THEME.COLOR_BLACK,
    },
});