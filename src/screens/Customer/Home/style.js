import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' && screenHeight == 896 ? '20%' : '5%'

    },
    upperListContainer: {
        marginVertical: '5%',
        justifyContent: "center"
    },
    upperListItemContainer: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,

    },
    upperListImageStyle: {
        height: 80,
        width: 145,
    },
    upperListTitleContainer: {
        flex: 1,
        paddingTop: '20%',
        marginLeft: '10%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    upperListTitleStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Medium'
    },
    lowerListContainer: {
        flex: 1,
        paddingTop: '5%',
        marginBottom: '1%',
        justifyContent: "center"
    },
    lowerListItemContainer: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    lowerListImageStyle: {
        height: screenHeight * 0.2,
        width: screenWidth * 0.9,
        borderRadius: 10
    },
    lowerListTitleContainer: {
        flex: 1,
        paddingTop: '10%',
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,.4)',
        paddingHorizontal: '10%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    lowerListTitleStyle: {
        fontSize: THEME.FONT_SIZE_LARGE,
        color: THEME.COLOR_WHITE,
        fontFamily: 'Poppins-Medium'
    },
    line: { borderWidth: 1, borderColor: THEME.COLOR_WHITE, width: 43 },
    nameContainer: {
        marginHorizontal: '5%',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    appNameTextStyle: {
        color: THEME.COLOR_WHITE,
        fontSize: 25,
        justifyContent: "center",
        textAlign: 'center',
        fontFamily: 'Poppins-Medium'
    },
    appointmentTextStyle: {
        color: THEME.COLOR_WHITE,
        // fontSize: THEME.FONT_SIZE,
        fontFamily: 'Poppins-Medium'
    },
    seperatorWidthStyle: {
        width: 15
    },
    seperatorHeightStyle: {
        height: 10
    },
    exitContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center"
    },
    searchBarberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
        // justifyContent: "center",
        // alignItems: "center"
    },
    headingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
        // paddingLeft: '15%'
    },
    addressesContainer: {
        borderRadius: 5,
        height: 60,
        justifyContent: 'center',
        paddingHorizontal: '5%',
        marginHorizontal: '5%',
        marginVertical: '2%'
    },
    addNewAddressContainer: {
        flexDirection: 'row',
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        paddingLeft: '10%',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    logoStyle: {
        height: 40, width: 60
    },
    modalMainHeading: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14
    },
    modalTextStyle: {
        fontSize: 10,
        textAlign: 'justify',
        fontFamily: 'Poppins-Regular'
    }


})