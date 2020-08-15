import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { FooterButton, Icon } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'

export default class EndService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serviceList: [
                { id: 1, serviceName: 'Hair Cuttuing', serviceDescription: '', selected: false, price: 50, time: 30, isFilled: '' },
                { id: 2, serviceName: 'Hair Trimming', serviceDescription: '', selected: false, price: 50, time: 30, isFilled: '' },
                { id: 3, serviceName: 'Blowout', serviceDescription: '', selected: false, price: 50, time: 30, isFilled: '' },
                { id: 4, serviceName: 'Hair Color', serviceDescription: '', selected: false, price: 50, time: 30, isFilled: '' },
                { id: 5, serviceName: 'Double process hair color', serviceDescription: '', selected: false, price: 50, time: 30, isFilled: '' },
                { id: 6, serviceName: 'Shave', serviceDescription: '', selected: false, price: 50, time: 30, isFilled: '', isFilled: '' },
                { id: 7, serviceName: 'Beard Trim', serviceDescription: '', selected: false, price: 50, time: 30, isFilled: '' },
                { id: 8, serviceName: 'Braids & Twist', serviceDescription: '', selected: false, price: 50, time: 30, isFilled: '' },
            ],
            timerStart: false,
            stopwatchStart: false,
            totalDuration: 90000,
            timerReset: false,
            stopwatchReset: false,
            totalTime: null,
        }
    }

    componentDidMount = () => {
        let { start } = this.props
        // this.setState({ timerStart: start, stopwatchStart: start })
    }


    getFormattedTime(time) {
        // this.currentTime = time;
        // this.setState({ totalTime: time })
    };


    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }



    _renderItems = (item) => {
        return (
            <>
                <View style={styles.row}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.textStyle}>{item.serviceName}</Text>
                    </View>
                    <View style={styles.priceContainer} >
                        <Text style={styles.timeTextStyle}>${item.price}</Text>
                    </View>
                    <View style={styles.timeContainer}>
                        <View style={styles.priceAndTimeContainer}>
                            <Text style={styles.timeTextStyle}>00:{item.time}</Text>
                        </View>
                    </View>
                </View>
            </>
        )
    }



    render() {
        const { onEndService } = this.props;
        const { serviceList } = this.state;
        const options = {
            container: {
                backgroundColor: THEME.PRIMARY_COLOR,
                padding: 5,
                borderRadius: 5,
                width: 220,
            },
            text: {
                fontSize: 30,
                color: '#FFF',
                textAlign: 'center'
            }
        };
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <View style={{ marginBottom: '5%' }}>
                            <Text style={styles.textHeadingStyle}>List of Customer Services</Text>
                        </View>
                        <View style={styles.headingContainer}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.headingTextStyle}>Services</Text>
                            </View>
                            <View style={styles.priceContainer} >
                                <Text style={styles.headingTextStyle1}>Price</Text>
                            </View>
                            <View style={styles.timeContainer}>
                                <Text style={styles.headingTextStyle1}>Est.Time</Text>
                            </View>
                        </View>
                        <View style={styles.flatlistContainer}>
                            {
                                serviceList.map((item) => {
                                    return (
                                        <>
                                            <View style={styles.row}>
                                                <View style={styles.nameContainer}>
                                                    <Text style={styles.textStyle}>{item.serviceName}</Text>
                                                </View>
                                                <View style={styles.priceContainer} >
                                                    <Text style={styles.timeTextStyle}>${item.price}</Text>
                                                </View>
                                                <View style={styles.timeContainer}>
                                                    <View style={styles.priceAndTimeContainer}>
                                                        <Text style={styles.timeTextStyle}>00:{item.time}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.seperatorStyle}></View>
                                        </>
                                    )
                                })
                            }
                        </View>
                        <View style={styles.stopwatchContainer}>
                            <Stopwatch start={this.state.stopwatchStart}
                                reset={this.state.stopwatchReset}
                                options={options}
                                getTime={this.getFormattedTime} />
                        </View>
                    </View>
                    <FooterButton title='End Service' onPress={() => onEndService(this.state.totalTime)} />
                </View>
            </>
        );
    }
}