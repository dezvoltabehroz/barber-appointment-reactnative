import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' && screenHeight == 896 ? '30%' : '15%'
    },
    buttonContainer: {
        marginHorizontal: '10%'
    },
    upperContainer: {
        flex: 0.8,
        // marginHorizontal: '10%'
    },
    iconContainer: {
        flex: 0.2,
        flexDirection: 'column'
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
    contentContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: screenWidth,
        paddingVertical: "3%",
        paddingBottom: '10%',
        paddingHorizontal: "4%"
    },
    imageStyle: {
        height: 100,
        width: 100,
        borderRadius: 15
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
    certificationContainer1: {
        height: 40,
        flexDirection: 'row',
        justifyContent: "space-between"

    },
    labelContainer: {
        flexDirection: 'column',
        flex: 0.8,
        marginLeft: '10%'
    },
    labelTextStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Medium'
    },
})