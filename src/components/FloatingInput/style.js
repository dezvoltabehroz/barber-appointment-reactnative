import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../../assets/styles/theme.style';

const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    labelTextStyle: {
        marginTop: 17,
        paddingLeft: 9,
        color: '#1E2023',
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
    },
    inputStyle: {
        fontSize: 14,
        paddingLeft: 10,
        marginTop: 10,
        borderWidth: 0,
        fontFamily: 'Poppins-Regular'
    },
    container: { width: '100%' },
    phoneContainer: { width: '79.5%' }


});