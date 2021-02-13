import { StyleSheet, Dimensions, Platform } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' ? screenHeight >= 812 ? '25%' : '18%' : '15%'
    },
    avatarStyle: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 100
    },
    // Upper Container Style
    upperContainer: {
        flex: 0.8,
    },
    imageContainer: {
        // marginTop: '5%',
        justifyContent: "center",
        alignItems: 'center'
    },
    imageStyle: {
        width: screenWidth * 0.8,
        height: screenHeight * 0.3,
    },
    avatarContainer: {
        marginTop: '8%',
        justifyContent: "center",
        alignItems: 'center'
    },
    profileTextStyle: {
        marginVertical: "3%",
        fontSize: THEME.FONT_SIZE_SMALL,
        fontFamily: 'Poppins-Regular',
        color: THEME.PRIMARY_COLOR
    },
    //Lower Container Style
    lowerContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainerStyle: {
        marginHorizontal: '10%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 54,
        marginBottom: '-2%',
        width: screenWidth * 0.8,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
    distanceContainerStyle: {
        marginTop:5,
        marginHorizontal: '10%',
        justifyContent: "center",
        height: 80,
        marginBottom: '2%',
        width: screenWidth * 0.8,
        borderRadius: 0,
        backgroundColor: '#171717'
    },
    distanceHeadingContainer: {
        // paddingTop: "2%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    sliderContainer: {
        paddingHorizontal: '2%',
        flexDirection: "row",
        justifyContent: "space-between", alignItems: "center",
    },
    sliderStyle: {
        width: screenWidth * 0.6,
        height: 60,
        bottom: 20,
    },
    inputLocationContainerStyle: {
        marginHorizontal: '10%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 54,
        marginBottom: '2%',
        width: screenWidth * 0.8,
        borderRadius: 5,
        backgroundColor: THEME.COLOR_WHITE
    },
    iconStyle: {
        marginHorizontal: 15
    },
    customerAndBarberContainer: {
        borderRadius: 5,
        marginTop: 15,
        width: screenWidth * 0.8,
        marginHorizontal: '10%',
        flexDirection: 'row',
        justifyContent: "center",
        backgroundColor: THEME.COLOR_WHITE,
        height: 54,
    },
    CustomerContainer: {
        margin: 3,
        borderRadius: 5,
        width: "46%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center'

    },
    optionContainer: {
        flexDirection: "row",
        marginHorizontal: 10
    },
    optionTextStyle: {
        color: '#1E2023',
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        marginHorizontal: 10,
        marginTop: 5
    },
    gap: {
        width: THEME.GAP_BETWEEN_ELEMENT
    },
    barberContainer: {
        margin: 3,
        borderRadius: 5,
        width: "46%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center'
    },
    dateContainer: {
        flexDirection: "row",
        backgroundColor: "#171717",
        // borderRadius: 5,
        marginTop: 5,
        marginVertical: '2%',
        marginHorizontal: '10%',
        justifyContent: 'space-between',
        alignItems: "center",
        height: 54,
        width: screenWidth * 0.81,
    },
    dateTextStyle: {
        width: screenWidth * 0.65,
        color: THEME.PRIMARY_COLOR,
        marginLeft: 11,
        fontFamily: 'Poppins-Regular'
    },
    distanceTextStyle: {
        color: THEME.COLOR_GREY,
        marginLeft: 11,
        fontFamily: 'Poppins-Regular'
    },
    distanceStyle: {
        color: THEME.PRIMARY_COLOR,
        marginRight: 10,
        marginBottom: 5,
        fontFamily: 'Poppins-Regular'
    },
    modalContainer: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR
    },
})