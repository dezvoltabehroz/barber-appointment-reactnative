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
})