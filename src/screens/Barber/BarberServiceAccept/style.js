import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../../assets/styles/theme.style';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' ? screenHeight >= 812 ? '25%' : '18%' : '15%'
    },
    getDirectionText: {
        marginRight: '5%',
        color: THEME.COLOR_WHITE,
        textAlign: 'right',
        fontFamily: 'Poppins-Medium'
    },
    customerLocationContainer: {
        height: 75,
        // backgroundColor: THEME.PRIMARY_COLOR,
        justifyContent: "center",
        alignItems: "center",
        width: screenWidth * 0.8,
        // borderRadius: 7
    },
    buttonContainer: {
        marginHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: '5%'
    },
    buttonText: {
        color: THEME.PRIMARY_COLOR,
        textAlign: 'right',
        fontFamily: 'Poppins-Medium'
    },
    footerStyle: {
        flex: 0.5,
        justifyContent: 'center',
        // paddingBottom: '4%',
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR
    },
})