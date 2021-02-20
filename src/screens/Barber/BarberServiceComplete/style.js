import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' ? screenHeight >= 812 ? '25%' : '18%' : '15%'
    },
    upperContainer: {
        flex: 0.8,
        marginHorizontal: '10%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    iconContainer: {
        flex: 0.7,
        justifyContent: "center", alignItems: "center"
    },
    rowStyle: {
        flexDirection: "row",
    },
    borderStyle: {
        flex: 1,
        justifyContent: 'center',
    },
    textStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Medium',
        fontSize: 11,
    },
    headingTextStyle1: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Bold',
        fontSize: THEME.FONT_SIZE_MEDIUM,
    },
    headingText: {
        color: THEME.COLOR_WHITE,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: THEME.FONT_SIZE_LARGE,
    },
    messageContainerStyle: {
        height: 110,
        marginVertical: '4%',
        width: screenWidth * 0.8,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
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
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR
    },

})