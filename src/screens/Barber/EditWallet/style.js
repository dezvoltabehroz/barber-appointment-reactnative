import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' ? screenHeight >= 812 ? '25%' : '18%' : '18%'
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#171717",
        height: 54,
        paddingHorizontal: "5%",

    },
    textStyle: {
        fontSize: 12,
        fontFamily: "Poppins-Medium",
        color: THEME.PRIMARY_COLOR
    },
    rowStyle: {
        height: 54,
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: "5%"
    },
    whiteText: {

        fontFamily: "Poppins-Medium",
        color: "#FFFFFF"
    },
    colorText: {
        paddingTop: Platform.OS == 'ios' ? screenHeight >= 812 ? '18%' : '12%' : '12%',
        fontFamily: "Poppins-Medium",
        textAlign: "justify",
        color: "#FF7E7E"
    }
})