import { StyleSheet, Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    mapStyle: {
        height: screenHeight < 600 ? screenHeight * 0.45 : screenHeight * 0.55,
        width: screenWidth,
        position: 'relative'
    },
    searchBarContainer: {
        height: screenHeight * 0.2,
        width: screenWidth,
        position: 'relative'
    }
})