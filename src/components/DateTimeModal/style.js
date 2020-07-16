import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../assets/styles/theme.style';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({

    centeredView: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    modalContainer: {
        flex: 1,
        height: screenHeight * 0.45,
        width: screenWidth * 0.8,
        justifyContent: "center",
        // alignItems: 'center',
        alignSelf: "center",

        // alignContent: "center",
        //  marginTop: '25%',
        // backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR
    },
    modalInputContainer:{ marginHorizontal: "10%", backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR },
    iconContainer:{ 
        position: 'relative',
         top: 40,
          alignItems: 'center' 
        },
    modalUpperContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center',
        // marginHorizontal: "10%",
        //  backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR
    },
    modalInput: {
        flex: 1,
        justifyContent: "center"
    },
    modalText: {
        color: THEME.COLOR_WHITE,
        textAlign: 'center',
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
    buttonContainer: {
        marginHorizontal: '10%'
    },
    footerStyle: { flex: 0.2, justifyContent: 'flex-end', paddingBottom: '8%' }

})