import { StyleSheet, Dimensions } from "react-native";
import THEME from '../../../assets/styles/theme.style';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' ? screenHeight >= 812 ? '25%' : '18%' : '15%'
    },
    contentContainer: {
        marginHorizontal: '5%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    labelTextStyle: {
        fontSize: THEME.FONT_SIZE_LARGE,
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Medium'
    },
    textStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Medium'
    },
    addressContainer: {
        marginHorizontal: '10%'
    },
    gapHeight: {
        height: 10
    },
    seperatorStyle: {
        borderWidth: 1,
        width: '90%',
        marginHorizontal: '5%',
        borderColor: THEME.COLOR_WHITE
    },
    labelRowContainer: {
        flex: 1, flexDirection: 'row', alignItems: 'center',
    },
    buttonEditContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "flex-end"
    }

})