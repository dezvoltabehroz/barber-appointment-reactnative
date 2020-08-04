import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../assets/styles/theme.style';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({

    centeredView: {
        justifyContent: "center",
        alignItems: "center",

    },
    modalContainer: {
        flex: 1,
        height: screenHeight * 0.45,
        width: screenWidth * 0.8,
        justifyContent: "center",
        alignSelf: "center",
    },
    gap: {
        width: THEME.GAP_BETWEEN_ELEMENT
    },
    modalInputContainer: {
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingVertical: '3%',
        borderRadius: 10,
    },
    iconContainer: {
        position: 'relative',
        top: 40,
        alignItems: 'center'
    },
    modalUpperContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center',
        marginHorizontal: "5%",
    },
    modalInput: {
        flex: 1,
        justifyContent: "center"
    },
    modalText: {
        color: THEME.COLOR_WHITE,
        textAlign: 'center',
        paddingVertical: '3%',
        fontFamily: 'Poppins-Medium',
        fontSize: THEME.FONT_SIZE_LARGE,
    },

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
    row:{
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    buttonContainer: {
        marginHorizontal: '15%'
    },
    footerStyle: {
        flex: 0.2,
        justifyContent: 'flex-end',
        paddingBottom: '8%'
    }

})