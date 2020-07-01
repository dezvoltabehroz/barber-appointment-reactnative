import { StyleSheet } from 'react-native'
import THEME from '../../assets/styles/theme.style'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        justifyContent: "center",
        
    },
    imageContainer: {
        alignItems: "flex-start",
        paddingHorizontal: "15%"
    },
    imageStyle: {
        height: 150,
        width: 150
    },
    TextContainer: {
        paddingHorizontal: "15%"
    },
    headingTextStyle: {
        fontSize: THEME.FONT_SIZE_LARGE,
        color: THEME.PRIMARY_TEXT_COLOR
    },
    babeoTextStyle: {
        fontSize: THEME.FONT_SIZE_LARGE,
        color: THEME.PRIMARY_COLOR
    }
})