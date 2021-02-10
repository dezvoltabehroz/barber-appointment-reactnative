import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' ? screenHeight >= 812 ? '25%' : '18%' : '15%'
    },
    backIconStyle: {
        alignSelf: 'flex-start',
        marginLeft: 20
    },
    contentContainerStyle: {
        flexGrow: 1
    },

    row: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    avatar: {
        borderRadius: 20,
        width: 40,
        height: 40,
        marginRight: 10
    },
    rowText: {
        flex: 1
    },
    message: {
        fontSize: 18
    },
    sender: {
        fontWeight: 'bold',
        paddingRight: 10
    },
    footer: {
        flexDirection: 'row',
        paddingHorizontal: '2%',
        paddingVertical: '2%',
        alignItems: 'center',
        backgroundColor: '#eee'
    },
    input: {
        paddingHorizontal: 20,
        fontSize: 18,
        // flex: 1
    },
    send: {
        // alignSelf: 'flex-end',
        color: 'lightseagreen',
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 10
    }, 
    inputContainer: {
        // flex: 1,
        height: 45,
        backgroundColor: THEME.COLOR_WHITE,
        borderRadius: 50,
    },
    drivermsgStyle: {
        // backgroundColor: colors.GREY.default,
        marginBottom: 5,
        marginTop: 5,
        marginRight: 10,
        marginLeft: 30,
        borderRadius: 20,
        elevation: 5,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        // shadowColor: colors.GREY.Deep_Nobel,
        shadowOffset: { height: 1, width: 0 },
    },
    msgTextStyle: {
        marginStart: 15,
        marginEnd: 15,
        marginTop: 10,
        textAlign: "right",
        fontSize: 18,
        color: "#fff"
    },
    msgTimeStyle: {
        marginStart: 15,
        marginBottom: 10,
        marginEnd: 15,
        textAlign: "right",
        fontSize: 12,
        color: "#fff"
    },
    riderMsgStyle: {
        backgroundColor: "#fff",
        marginBottom: 5,
        marginTop: 5,
        marginRight: 30,
        marginLeft: 10,
        borderRadius: 20,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        // shadowColor: colors.GREY.Deep_Nobel,
        shadowOffset: { height: 1, width: 0 },
    },
    riderMsgText: {
        marginStart: 15,
        textAlign: "left",
        fontSize: 18,
        color: "#000",
        marginTop: 10
    },
    riderMsgTime: {
        marginStart: 15,
        textAlign: "left",
        fontSize: 12,
        color: "#000",
        marginBottom: 10
    }

});