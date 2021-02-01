import { StyleSheet, Dimensions } from 'react-native';
import themeStyle from '../../assets/styles/theme.style';

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export default StyleSheet.create({
    image: {
        resizeMode: 'contain',
        height: screenHeight * 0.60,
        width: screenWidth * 0.8,
    },
    image_container: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: 30,
        color: themeStyle.PRIMARY_COLOR,
        textAlign: 'center',
        // marginTop: '15%'
    },
    buttonCircle: {
        width: 60,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
