import { StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style'
export default StyleSheet.create({
    lineStyle: {
        borderColor: '#44495C',
        borderWidth: 2,
        marginHorizontal: '10%',
        borderRadius: 5
    },
    gapHeight: {
        height: 15
    },
    gapHeight1: {
        height: 5
    },
    buttonContainer: {
        marginHorizontal: '10%',
    },
    footerStyle: {
        flex: 0.2,
        justifyContent: 'flex-end',
        paddingBottom: '8%',
        backgroundColor: "#171717"
    },
    footerConatinerStyle:{
        flex: 0.3,
        justifyContent: 'flex-end',
        paddingBottom: '8%',
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR
    }

})