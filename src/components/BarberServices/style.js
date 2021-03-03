import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../assets/styles/theme.style';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const plusWidth = screenWidth * .3;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: '2%',
    },
    seperatorHeightStyle: {
        height: 10
    },
    rowContainer: {
        paddingTop: '5%',
        flexDirection: 'row',
        paddingHorizontal: '5%',
        alignSelf: "center"
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
    contentContainer: {
        backgroundColor: '#3B3F52',
        // borderRadius: 10,
        marginHorizontal: '5%',
        paddingHorizontal: '5%',
        paddingVertical: '2%'
    },
    checkBoxContainer: {
        flex: 0.2,
        flexDirection: 'column',
        justifyContent: "center"
    },
    serviceNameContainer: {
        flex: 0.4,
        flexDirection: 'column',
        justifyContent: "center"
    },
    serviceEstTimeContainer: {
        flex: 0.3,
        flexDirection: 'column',
        justifyContent: "center",
        // alignItems: 'center'
    },
    serviceCostContainer: {
        flex: 0.2,
        flexDirection: 'column',
        justifyContent: "center",
        // alignItems: 'center'
    },
    descriptionContainer: {
        width: 250,
        marginLeft: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    descriptionText: {
        fontSize: THEME.FONT_SIZE_SMALL,
        color: THEME.COLOR_GREY,
        fontFamily: 'Poppins-Regular'
    },
    textWhite: {
        color: THEME.PRIMARY_COLOR,
        fontFamily: 'Poppins-Medium'
    },
    textGrey: {
        fontSize: 12,
        color: THEME.COLOR_GREY,
        fontFamily: 'Poppins-Regular'
    },
    coloredText: {
        fontSize: 12,
        color: THEME.PRIMARY_COLOR,
        fontFamily: 'Poppins-Medium'
    }
})