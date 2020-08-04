import { StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style';

export default StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: "12%"
    },

    aboutTitleStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        marginLeft: 15,
        marginTop: 8
    },
    aboutcontentmainStyle: {
        // marginTop: 12,
        marginBottom: 60
    },
    aboutcontentStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        textAlign: "justify",
        alignSelf: 'center',
        // width: width - 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        letterSpacing: 1,
        marginTop: 6,
    },
    contact: {
        marginTop: 6,
        marginLeft: 15,
        //flexDirection:'row',
        width: "100%",
        marginBottom: 30
    },
    rowContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    contacttype1: {
        color: THEME.COLOR_WHITE,
        textAlign: 'left',
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
    },
    contacttype2: {
        color: THEME.COLOR_WHITE,
        textAlign: 'left',
        marginTop: 4,
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
    }
})