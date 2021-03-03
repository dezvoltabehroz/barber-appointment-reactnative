import { StyleSheet, Dimensions } from "react-native";
import THEME from '../../../assets/styles/theme.style';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' ? screenHeight >= 812 ? '25%' : '18%' : '15%'
    },
    listItemContainer: {
        borderRadius: 10,
        marginHorizontal: '5%',
    },
    cardStyle: {
        paddingTop: '2%',
        // flexDirection: 'row',
        backgroundColor: '#171717',
        borderRadius: 10,
        paddingVertical: '2%'

    },
    containerStyle: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        paddingTop: 5,
        paddingBottom: 5
    },
    inputContainerStyle: {
        backgroundColor: '#171717',
        // height: 40,
        // elevation: 3,
        // width: '102%',
        // alignSelf: 'center',
        marginBottom: 10,
        // borderRadius: 5
    },
    nameContainer: {
        flex: 1,
        marginHorizontal: "5%",
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    nameTextStyle: {
        fontSize: THEME.FONT_SIZE_LARGE,
        color: THEME.PRIMARY_COLOR,
        fontFamily: 'Poppins-Medium'
    },
    dateTextStyle: {
        color: THEME.PRIMARY_COLOR,
        fontFamily: 'Poppins-Regular'
    },
    seperatorHeightStyle: {
        height: 15
    },
    avatarContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextStyle: {
        marginHorizontal: '10%',
        color: '#000',
        fontFamily: 'Poppins-Bold'
    },
    buttonStyle: {
        backgroundColor: THEME.PRIMARY_COLOR,
        // borderRadius: 7,
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    daycontainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%'
    },
    daysContainer: {
        height: 20,
        width: 20,
        backgroundColor: THEME.PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: '#000',
        borderRadius: 20,
        marginHorizontal: '0.5%'
    },
    textStyle: {
        fontSize: 8,
        // padding: '2%',
        // height: 20,
        // width: 20,
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins-Bold'
    },
})