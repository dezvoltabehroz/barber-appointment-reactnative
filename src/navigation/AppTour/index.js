import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import themeStyle from '../../assets/styles/theme.style';
import styles from './style';

const slides = [
    {
        key: 's1',
        title: 'Missing your Stylist in Covid-19?',
        image: require('../../assets/images/chair.png'),
    },
    {
        key: 's2',
        title: 'Get salon services at your doorstep',
        image: require('../../assets/images/beard.png'),
    },
    {
        key: 's3',
        title: `Booking management and easy income`,
        image: require('../../assets/images/calendar.png'),
    },
    {
        key: 's4',
        title: 'Booking management and easy income',
        image: require('../../assets/images/colorfulmask.png'),
    }
];

class AppTour extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _onDone = () => { this.props.navigation.navigate('AuthLoading'); };

    _renderItem({ item }) {
        return (
            <View style={{ flex: 1, backgroundColor: '#171717', paddingHorizontal: '5%' }}>
                <View style={styles.image_container}>
                    <Image style={styles.image} source={item.image} />
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
