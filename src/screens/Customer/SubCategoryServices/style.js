import { StyleSheet, Dimensions } from "react-native";
import THEME from "../../../assets/styles/theme.style";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
        paddingTop: Platform.OS == 'ios' && screenHeight == 896 ? '30%' : '15%'
    },
    lowerListContainer: {
        flex: 1,
        paddingTop: '5%',
        marginBottom: '1%',
        alignItems: "center",
        justifyContent: "center"
    },
    lowerListItemContainer: {
        // flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        height: screenHeight * 0.15,
        width: screenWidth * 0.9

    },
    lowerListImageStyle: {
        height: screenHeight * 0.1,
        width: screenWidth * 0.2,
        borderRadius: 10
    },
    lowerListTitleContainer: {
        // flex: 1,
        
        marginTop: Platform.OS == 'ios' && screenHeight == 896 ? '7%' : 15,
        // margin: 15,
        // margin:,
        // borderRadius: 10,
        // height: screenHeight * 0.16,
        // width: screenWidth * 0.9,
        // backgroundColor: 'rgba(0,0,0,.4)',
        // paddingHorizontal: '10%',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start'
    },
    lowerListTitleStyle: {
        fontSize: THEME.FONT_SIZE_LARGE,
        color: THEME.COLOR_WHITE,
        width: screenWidth * 0.5,
        fontFamily: 'Poppins-Medium'
    },
    lowerListDescriptionStyle: {
        fontSize: 10,
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Medium'
    },
    opacityContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.4)',
        opacity: 0.7,
        width: '70%',
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
        paddingHorizontal: '10%',
    },
    line: {
        borderWidth: 1,
        borderColor:
            THEME.COLOR_WHITE,
        width: 43
    },
    nameContainer: {
        marginHorizontal: '5%'
    },
    appNameTextStyle: {
        color: THEME.COLOR_WHITE,
        fontSize: 30,
        fontFamily: 'Poppins-Medium'
    },
    appointmentTextStyle: {
        color: THEME.COLOR_WHITE,
        fontSize: THEME.FONT_SIZE_LARGE,
        fontFamily: 'Poppins-Medium'
    },
    seperatorHeightStyle: {
        height: 15
    }

})