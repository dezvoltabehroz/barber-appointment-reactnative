import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' && screenHeight == 896 ? '30%' : '20%'
    },
    //upper Container Styles
    upperContainer: {
        flex: 0.8,
        marginHorizontal: '10%',
    },

    certificationContainer: {
        marginVertical: '3%',
        height: 54,
        flexDirection: 'row',
        justifyContent: "space-between"

    },
    certificationContainer1: {
        // marginVertical: '3%',
        height: 54,
        flexDirection: 'row',
        justifyContent: "space-between"

    },
    labelContainer: {
        flexDirection: 'column',
        flex: 0.5
    },
    renderImageStyle: {
        height: screenHeight,
        width: screenWidth
    },
    imageContainer: {
        flex: 0.2,
        flexDirection: 'column'
    },
    imageStyle: {
        height: 50, width: 50, borderRadius: 5
    },
    iconContainer: {
        flex: 0.2,
        flexDirection: 'column'
    },
    modalContainer: {
        flexDirection: 'row',
        marginHorizontal: '10%'
    },
    modalTextStyle: {
        color: THEME.COLOR_WHITE
    },
    iconModalContainer: {
        alignItems: 'center',
        // flexDirection: 'row',
        marginHorizontal: '5%'
    },
    labelTextStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Medium'
    },
    employmentLabelStyle: {
        marginTop: "3%",
        textAlign: "center",
        color: THEME.COLOR_WHITE,
        fontFamily: "Poppins-Medium",
        fontSize: THEME.FONT_SIZE_MEDIUM

    },
    addContainer: {
        paddingVertical: '4%',
        flexDirection: "row",
        justifyContent: "center", alignItems: 'center'
    },
    addDetailContainer: {
        height: 54,
        width: screenWidth * 0.8,
        borderRadius: 5,
        backgroundColor: THEME.PRIMARY_COLOR,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },
    cancelContainer: {
        height: 54,
        width: screenWidth * 0.8,
        borderRadius: 5,
        backgroundColor: 'rgb(240,89,42)',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },
    // modalContainer: {
    //     height: screenHeight, paddingVertical: '3%', justifyContent: "center"
    // },

    columnStyle: { flexDirection: 'column', marginHorizontal: '0.5%' },
    columnStyle1: { flexDirection: 'column' },
    inputContainerStyle: {
        marginHorizontal: '10%',
        justifyContent: "center",
        alignItems: "center",
        height: 54,
        marginBottom: '4%',
        width: screenWidth * 0.8,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
    inputDateContainerStyle: {
        justifyContent: "center",
        alignItems: "center",
        height: 54,
        marginBottom: '4%',
        width: screenWidth * 0.22,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
    result_textStyle: {
        height: 50,
    },
    text1Style: {
        textAlign: 'center',
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Medium'
    },
    textStyle: {
        textAlign: 'center',
        color: THEME.COLOR_WHITE,
        fontFamily: "Poppins-Regular",
    },
    seperatorStyle: {
        width: 5
    },
    addButtonContainer: { paddingVertical: '3%', justifyContent: 'center', alignItems: 'center' },

    cancelButtonContainer: { justifyContent: 'center', alignItems: 'center' },
    // FOoter StylEs
    lineStyle: {
        borderColor: '#44495C',
        borderWidth: 2,
        marginHorizontal: '10%',
        borderRadius: 5
    },
    gapHeight: {
        height: 15
    },
    buttonContainer: {
        marginHorizontal: '10%'
    },
    footerStyle: { flex: 0.2, justifyContent: 'flex-end', paddingBottom: '8%' }

})