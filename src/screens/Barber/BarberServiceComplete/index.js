import React, { Component } from 'react';
import { View, Text, FlatList, Alert, ScrollView, } from 'react-native';
import styles from './style';
import { FooterButton, Icon, MessageInput } from '../../../components';
import THEME from '../../../assets/styles/theme.style';
import StarRating from 'react-native-star-rating';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
            starCount: 0,
            feedback: '',
            isFeedbackFocus: false
        }
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    render() {
        let { onHome } = this.props
        const { starCount, isFeedbackFocus, feedback } = this.state;
        return (
            <KeyboardAwareScrollView>

                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <View style={styles.rowStyle}>
                            <Text style={styles.headingTextStyle1}>Total Amount Paid:</Text>
                            <Text style={[styles.headingTextStyle1, { color: THEME.PRIMARY_COLOR }]}>  $260</Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <Icon.FontAwesome5 name='hand-holding-usd' size={120} color={THEME.PRIMARY_COLOR} />
                        </View>
                        <View style={styles.borderStyle}>
                            <Text style={styles.headingText}>Rate Customer</Text>
                            <View style={{ marginVertical: '5%' }}>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    starSize={25}
                                    rating={starCount}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    fullStarColor={THEME.PRIMARY_COLOR}
                                />
                            </View>
                            <View style={[styles.messageContainerStyle,
                            isFeedbackFocus || feedback != '' ? THEME.inputBorder : {}]}>
                                <MessageInput
                                    label={"Please type your feedback"}
                                    val={feedback}
                                    multiline={true}
                                    onActive={() => this.setState({ isMessageFocus: true })}
                                    onInActive={() => this.setState({ isMessageFocus: false })}
                                    updateText={(feedback) => this.setState({ feedback })} />
                            </View>
                        </View>
                    </View>
                    <FooterButton title='Done' onPress={onHome} />
                </View>
            </KeyboardAwareScrollView>
        )
    }
}