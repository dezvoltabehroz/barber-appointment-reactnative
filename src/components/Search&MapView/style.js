import { StyleSheet, Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import THEME from '../../assets/styles/theme.style';

export default StyleSheet.create({
    mapStyle: {
        marginTop: "2%",
        height: screenHeight < 600 ? screenHeight * 0.45 : screenHeight * 0.55,
        width: screenWidth,
    },
    modalContainer: {
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingHorizontal: "5%"
    },
    searchBarStyle: {
        marginTop: "5%",
        marginHorizontal: "5%",
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 54,
        justifyContent: "center"
    },
    barTextStyle: {
        color: THEME.COLOR_GREY,
        marginLeft: "5%"
    }
})