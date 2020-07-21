import { StyleSheet, Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    mapStyle: {
        height: screenHeight * 0.5,
        width: screenWidth,
        // position:'relative'
    },
    searchBarContainer: {
        // height: screenHeight * 0.4,
        width: screenWidth,
        justifyContent:'flex-start'
        // position:'relative'
    }
})