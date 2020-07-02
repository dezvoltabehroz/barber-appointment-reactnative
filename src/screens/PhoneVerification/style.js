import { StyleSheet, Platform } from 'react-native'
import THEME from '../../assets/styles/theme.style'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' ? '20%' : '15%'
    },
    textContainer: {
        paddingVertical: "5%",
        justifyContent: 'center',
        marginHorizontal: '8%'
    },
    textStyle: {
        color: THEME.COLOR_WHITE,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular'
    },
    numberTextStyle: {
        fontFamily: 'Poppins-Bold'
    },

    codeContainer: {
        justifyContent: 'center',
        paddingTop: "5%",
        paddingVertical: "5%",
        flexDirection: 'row',
        marginBottom: '7%',
        marginHorizontal: '10%'
    },
    codeInput: {
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: '#F0F1F3',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#00A9A5',
        fontSize: 13,
        color: '#3F4B59'
    },

    buttonContainer: {
        paddingVertical: "5%",
        justifyContent: "center",
        marginHorizontal: '10%'
    },
    resendContainer: {
        paddingVertical: "5%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    resendTextStyle: {
        color: THEME.PRIMARY_COLOR,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        fontSize: THEME.FONT_SIZE_SMALL
    },
    termTextStyle: {
        color: '#9FACBD',
        textAlign: 'center',
        fontSize: THEME.FONT_SIZE_SMALL,
        fontFamily: 'Poppins-Regular'
    },
    termANdConditionTextStyle: {
        color: THEME.COLOR_WHITE,
        textAlign: 'center',
        fontSize: THEME.FONT_SIZE_SMALL,
        fontFamily: 'Poppins-Regular'
    },
    termANdConditionContainer: {
        marginHorizontal: '12%',
        justifyContent: 'center',
        alignItems: "center"
    }

})