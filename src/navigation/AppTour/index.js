import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import themeStyle from '../../assets/styles/theme.style';
import styles from './style';
import Chair from '../../assets/svg/chair';
import Beard from '../../assets/svg/beard';
import Calendar from '../../assets/svg/calendar(1)';
import Mask from '../../assets/svg/mask(1)';
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const slides = [
    {
        key: 's1',
        title: 'Missing your Stylist in Covid-19?',
        image: <Chair height={screenHeight * 0.60} width={screenWidth * 0.8} />,
    },
    {
        key: 's2',
        title: 'Get salon services at your doorstep',
        image: <Beard height={screenHeight * 0.60} width={screenWidth * 0.8} />,
    },
    {
        key: 's3',
        title: `Booking management and easy income`,
        image: <Calendar height={screenHeight * 0.60} width={screenWidth * 0.8} />,
    },
    {
        key: 's4',
        title: 'Safe and sound in the pandemic',
        image: <Mask height={screenHeight * 0.60} width={screenWidth * 0.8} />,
    }
];

class AppTour extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _onDone = () => { this.props.navigation.replace('AuthLoading'); };

    _renderItem({ item }) {
        return (
            <View style={{ flex: 1, backgroundColor: '#171717', paddingHorizontal: '5%' }}>
                <View style={styles.image_container}>
                    {/* <Image style={styles.image} source={item.image} /> */}
                    {item.image}
                </View>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        );
    };
    _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Text style={{ color: themeStyle.PRIMARY_COLOR, fontSize: 18 }}>Next</Text>
            </View>
        );
    };

    render() {
        return (
            <AppIntroSlider
                data={slides}
                activeDotStyle={{ backgroundColor: themeStyle.PRIMARY_COLOR }}
                renderItem={this._renderItem}
                renderDoneButton={this._renderDoneButton}
                onDone={this._onDone}
                showNextButton={false}
                dotStyle={{ backgroundColor: '#c4c4c4' }}
                showSkipButton={false}
            />
        );
    }
}


export default AppTour;
