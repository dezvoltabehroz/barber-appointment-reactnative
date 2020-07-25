import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../assets/styles/theme.style';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const plusWidth = screenWidth * .3;
export default StyleSheet.create({
    activities_container: {
        marginHorizontal: 20,
        marginTop: 20,
        padding: 10,
        backgroundColor: '#FFFAFA',
        borderRadius: 10
    },
    text_panel_heading: {
        fontSize: 15,
        color: THEME.PRIMARY_COLOR,
        fontWeight: 'bold',
        marginBottom: 2,
        width: '90%'
    },
    plus_sign_panel_heading: {
        flex: 1,
        height: 30,
        resizeMode: 'contain',
        width: plusWidth,
    },
    country_container: {
        padding: 5,
        flexDirection: 'row',
        textAlign: 'left',
        fontSize: 15
    },
    postImagesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-evenly',
    },
    postImage: {
        width: 100,
        height: 100,
        borderColor: '#BBBAB9',
        borderWidth: 1,
        resizeMode: 'center'
    },
    dayContainer: {
        flex: 0.4,
        flexDirection: 'column'
    },
    startTimeContainer: {
        flex: 0.3,
        flexDirection: 'column',
        alignItems: 'center'
    },
    endTimeContainer: {
        flex: 0.3,
        flexDirection: 'column',
        alignItems: 'center'
    },
    nameContainer: {
        flex: 0.57,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    priceContainer: {
        flex: 0.3,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    timeContainer: {
        flex: 0.3, width: screenWidth * 0.2,
        flexDirection: 'column',
        justifyContent: 'center'
    },

    headingContainer: {
        flexDirection: 'row',
        paddingTop: '5%', marginHorizontal: '2%'
    },
    headingServiceContainer: {
        flexDirection: 'row',
        paddingTop: '5%',
        justifyContent: 'space-between'
    },
    headingTextStyle: {
        fontFamily: 'Poppins-Medium',
        fontSize: THEME.FONT_SIZE_MEDIUM,
    },
    textStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: THEME.FONT_SIZE_MEDIUM,
    },
    timeTextStyle: {
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        fontSize: THEME.FONT_SIZE_MEDIUM,
    },
    linkContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linkTextStyle: {
        color: THEME.PRIMARY_COLOR,
        fontFamily: 'Poppins-Medium',
        fontSize: THEME.FONT_SIZE_MEDIUM,
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    lineStyle: {
        flex: 1,
        borderRadius: 5,
        borderWidth: 1
    },
    ratingContainer: {
        justifyContent: 'center',
        paddingVertical: '5%'
    },
    starContainer: {
        flex: 0.4,
        flexDirection: "row"
    },
    noRecord: {
        fontWeight: 'bold',
        marginHorizontal: 10
    },
    row: {
        flexDirection: "row"
    },
    borderLine: {
        flex: 1,
        borderRadius: 5,
        borderWidth: 1
    },
    columnStyle: {
        flexDirection: 'column',
        overflow: 'hidden'
    }
})