import React, { Component } from 'react';
import { View, Text, FlatList, Alert, } from 'react-native';
import styles from './style';
import { FooterButton, Icon } from '../../../components';
import THEME from '../../../assets/styles/theme.style';
import StarRating from 'react-native-star-rating';

export default class BarberServiceComplete extends Component {
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
            rating: 4.5
        }
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    _renderItems = ({ item, index }) => {
        return (
            <View style={styles.row}>
                <View style={styles.nameContainer}>
                    <View style={{ flexDirection: "row" }}>
                        <Icon.Entypo name='dot-single' color={THEME.COLOR_WHITE} size={20} />
                        <Text style={styles.textStyle}>{item.serviceName}</Text>
                    </View>
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
        )
    }

    onStarRatingPress = (rating) => {
        this.setState({ rating })
    }

    render() {
        const { serviceList, rating } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <Text style={styles.headingTextStyle1}>Customer Paid:</Text>
                    <View style={styles.rowStyle}>
                        <Icon.Entypo name='dot-single' color={THEME.COLOR_WHITE} size={20} />
                        <Text style={styles.headingTextStyle1}>Total Amount Paid:</Text>
                        <Text style={[styles.headingTextStyle1, { color: THEME.PRIMARY_COLOR }]}>  $260</Text>
                    </View>
                    <Text style={styles.headingTextStyle1}>Customer Services:</Text>

                    <View style={styles.flatlistContainer}>
                        <FlatList
                            data={serviceList}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this._renderSeparator}
                            renderItem={({ item, index }) => this._renderItems({ item, index })}
                            keyExtractor={item => item} />
                    </View>
                    <View style={styles.borderStyle}>
                        <Text style={styles.headingText}>Rate Customer</Text>
                        <View style={{ paddingTop: '5%' }}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                starSize={20}
                                rating={rating}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                fullStarColor={THEME.PRIMARY_COLOR}
                            />
                        </View>

                        {/* <View style={styles.rowStyle}>
                            <Icon.Entypo name='dot-single' color={THEME.COLOR_WHITE} size={20} />
                            <Text style={styles.textStyle}>Total Time of Service:</Text>
                            <Text style={[styles.textStyle, { color: THEME.PRIMARY_COLOR }]}>  2 hr 05 minutes</Text>
                        </View>
                        <View style={styles.rowStyle}>
                            <Icon.Entypo name='dot-single' color={THEME.COLOR_WHITE} size={20} />
                            <Text style={styles.textStyle}>Total Amount of Service:</Text>
                            <Text style={[styles.textStyle, { color: THEME.PRIMARY_COLOR }]}>  $260</Text>
                        </View>
                        <View style={styles.rowStyle}>
                            <Icon.Entypo name='dot-single' color={THEME.COLOR_WHITE} size={20} />
                            <Text style={styles.textStyle}>Service Start Time:</Text>
                            <Text style={[styles.textStyle, { color: THEME.PRIMARY_COLOR }]}>  04:00 PM</Text>
                        </View>
                        <View style={styles.rowStyle}>
                            <Icon.Entypo name='dot-single' color={THEME.COLOR_WHITE} size={20} />
                            <Text style={styles.textStyle}>Service End Time:</Text>
                            <Text style={[styles.textStyle, { color: THEME.PRIMARY_COLOR }]}>  06:00 PM</Text>
                        </View> */}
                    </View>
                </View>
                <FooterButton title='Finish' onPress={() => { }} />
            </View>
        )
    }
}