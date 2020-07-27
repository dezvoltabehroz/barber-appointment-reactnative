import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' && screenHeight == 896 ? '30%' : '15%'
    },
    textStyles: {
        fontFamily: "Poppins-Regular",
        color: THEME.COLOR_GREY
    },
    coloredTextStyles: {
        fontFamily: "Poppins-Bold",
        color: THEME.PRIMARY_COLOR
    },
    lineStyle: {
        borderColor: '#44495C',
        borderWidth: 2,
        marginHorizontal: '5%',
        borderRadius: 5
    },
    gapHeight: {
        height: 15
    },
    buttonContainer: {
        width: '40%',
        marginHorizontal: '5%'
    },
    row: {
        flexDirection: 'row'
    },
    textContainer: {
        height: 54,
        justifyContent: "center",
        alignItems: "center"
    },
    footerStyle: {
        flex: 0.2,
        justifyContent: 'flex-end',
        paddingBottom: '8%'
    }
})