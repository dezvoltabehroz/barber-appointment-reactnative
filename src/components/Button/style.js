import { StyleSheet,Dimensions } from 'react-native';
import theme from '../../styles/theme.style';

const screenWidth=Dimensions.get('window').width;
export default StyleSheet.create({
    btnPrimary: {
        height: 54,
        width:screenWidth*0.8 ,
        elevation: 2,
        borderRadius: 5,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.BUTTON_COLOR
    },
    btnPrimaryText: {
        fontSize: theme.FONT_SIZE_MEDIUM,
        color: theme.PRIMARY_TEXT_COLOR,
    },
});
