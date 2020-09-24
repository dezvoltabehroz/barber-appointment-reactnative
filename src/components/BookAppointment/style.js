
import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../assets/styles/theme.style';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
    },
    seperatorHeightStyle: {
        height: 10
    },
    rowContainer: {
        flexDirection: 'row',
        paddingHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lineStyle: {
        borderColor: '#44495C',
        borderWidth: 0.5,
        marginTop: "1%",
        marginBottom: "1%",
        marginHorizontal: '5%',
        borderRadius: 5
    },
    unSelected: {
        borderWidth: 1,
        borderColor: '#44495C',
        height: 25,
        width: 25,
        marginHorizontal: "5%",
        borderRadius: 5
    },
    selected: {
        backgroundColor: '#44495C',
        borderWidth: 1,
        borderColor: '#44495C',
        height: 25,
        width: 25,
        marginHorizontal: "5%",
        borderRadius: 5
    },
    textStyle: {
        color: THEME.COLOR_WHITE,
        fontSize: THEME.FONT_SIZE_SMALL,
        fontFamily: "Poppins-Regular"
    },
    textFlatlistStyle: {
        color: THEME.COLOR_WHITE,
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        margin: 7
    },
    flatlistContainer: {
        backgroundColor: THEME.PRIMARY_COLOR,
        height: 44,
        width: screenWidth * 0.275,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    marginHorizontal: {
        marginHorizontal: "2%"
    },
    gapHeight: {
        height: 10
    },
    dateRowContainer: {
        flexDirection: 'column',
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: "3%"
    },
    selectedDate: {
        backgroundColor: THEME.PRIMARY_COLOR,
        height: 30,
        width: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    unSelectedDate: {
        backgroundColor: '#3B3F52',
        height: 30,
        width: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: screenWidth,
        paddingVertical: "5%",
        paddingLeft: "5%"
    },
    contentBOOKContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: "100%",
        width: screenWidth,
        paddingTop: "5%",
        paddingBottom: "5%",
        paddingLeft: "5%"
    },
    unSelectedText: {
        color: THEME.COLOR_GREY,
        fontSize: THEME.FONT_SIZE_SMALL,
        fontFamily: "Poppins-Regular"
    },
    buttonContainer: {
        marginHorizontal: "20%",
        paddingTop: "4%"
    },
    bookingRowContainer: {
        flexDirection: 'row',
        paddingTop: "4%"
    },
    justify: {
        justifyContent: 'center'
    },
    paddingTop: {
        paddingTop: "20%"
    }
})