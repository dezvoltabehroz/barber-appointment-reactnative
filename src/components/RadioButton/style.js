import { StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style';

export default StyleSheet.create({
    customerAndBarberContainer: {
        borderRadius: 5,
        marginBottom: 15,
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
})