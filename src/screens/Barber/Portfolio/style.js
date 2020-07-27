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
    upperContainer: {
        flex: 0.8,
        marginHorizontal: '10%'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center"
    },
    uploadImagesTextStyle: {
        fontFamily: 'Poppins-Medium',
        textAlign: "center",
        fontSize: THEME.FONT_SIZE_MEDIUM,
        color: THEME.COLOR_WHITE
    },
    contentContainer: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        height: screenHeight * 0.2,
        width: screenWidth * 0.8,
        borderRadius: 7
    },
    renderImageStyle: {
        height: screenHeight,
        width: screenWidth,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR
    },
    seperatorStyle: {
        height: 10
    },
    postImage: {
        width: 100,
        height: 100,
        borderColor: '#BBBAB9',
        borderWidth: 1,
        resizeMode: 'center'
    },
})