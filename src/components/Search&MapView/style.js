import { StyleSheet, Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    mapStyle: {
        height: screenHeight < 600 ? screenHeight * 0.45 : screenHeight * 0.54,
        width: screenWidth,
    },
    searchBarContainer: {
        height: screenHeight * 0.12,
        width: screenWidth,
    },
    height:{
        height: screenHeight * 0.2,
    }
})