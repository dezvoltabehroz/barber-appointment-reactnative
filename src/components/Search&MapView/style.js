import { StyleSheet, Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    mapStyle: {
        height: screenHeight * 0.55,
        width: screenWidth,
    },
    searchBarContainer: {
        width: screenWidth,
    }
})