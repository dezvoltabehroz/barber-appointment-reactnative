import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../assets/styles/theme.style';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1
    },

    // Conatiner Styles
    upperBackStyle: {
        flex: 0.3,
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
        backgroundColor: "#1E2023"
    },
    upperContainerStyle: {
        paddingTop: '5%',
        flexDirection: "row",
        marginHorizontal: "4%"
    },
    avatarContainer: {
        flex: 0.2,
    },
    avatarStyle: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 100
    },
    textContainer: {
        marginHorizontal: "3%",
        flex: 0.5,
        justifyContent: "center"
    },
    nameTextStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: "Poppins-Medium",
        fontSize: THEME.FONT_SIZE_MEDIUM
    },
    row: { flexDirection: 'row' },
    vipTagStyle: {
        marginTop: '2%',
        height: 20, width: 30,
        borderRadius: 5,
        marginHorizontal: '3%',
        backgroundColor: THEME.PRIMARY_COLOR,
        // justifyContent: "center",
        alignItems: "center",
    },
    vipTagTextStyle: {
        color: THEME.COLOR_WHITE,
        fontFamily: "Poppins-Bold",
        fontSize: THEME.FONT_SIZE_SMALL
    },
    vipTextStyle: {
        color: THEME.COLOR_GREY,
        fontFamily: 'Poppins-Regular',
        fontSize: THEME.FONT_SIZE_SMALL
    },
    dateStyle: {
        color: THEME.PRIMARY_COLOR
    },
    notificationStyle: {
        flex: 0.3,
        // marginHorizontal: '3%',
        justifyContent: "center",
        alignItems: 'flex-end'
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: "#3B3F52"
    },

    // Middle Container Styles
    middleContainerStyle: {
        flex: 0.2,
        bottom: '10%',
        marginHorizontal: "4%",
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        borderRadius: 5

    },
    loyalityPointsContainer: {
        flex: 0.4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    gap: { width: screenWidth * 0.3 },
    justifyCenter: { justifyContent: "center" },
    iconContainerStyle: {
        marginLeft: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    loyalText: {
        fontFamily: "Poppins-Regular",
        fontSize: THEME.FONT_SIZE_SMALL,
        color: THEME.COLOR_WHITE
    },
    pointText: {
        fontFamily: "Poppins-Bold",
        fontSize: THEME.FONT_SIZE_SMALL,
        color: THEME.PRIMARY_COLOR
    },
    buttonContainer: {
        flex: 0.6
    },
    column: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    column2: {
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#44495C',
        // borderWidth: 1,
        borderRadius: 5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    line: {
        borderColor: '#44495C',
        borderWidth: 1,
        borderRadius: 5
    }

})