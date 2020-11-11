import React, { Component } from 'react';
import { View, Text, FlatList, Alert, ScrollView, } from 'react-native';
import styles from './style';
import { FooterButton, Icon, MessageInput } from '../../../components';
import THEME from '../../../assets/styles/theme.style';
import StarRating from 'react-native-star-rating';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux'
class BarberServiceComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
        let { onHome, totalPrice } = this.props
        const { starCount, isFeedbackFocus, feedback } = this.state;
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={styles.upperContainer}>
                        <View style={styles.rowStyle}>
                            <Text style={styles.headingTextStyle1}>Total Amount Paid:</Text>
                            <Text style={[styles.headingTextStyle1, { color: THEME.PRIMARY_COLOR }]}>  ${totalPrice}</Text>
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
                                    // multiline={true}
                                    onActive={() => this.setState({ isMessageFocus: true })}
                                    onInActive={() => this.setState({ isMessageFocus: false })}
                                    updateText={(feedback) => this.setState({ feedback })} />
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <FooterButton disabled={feedback && starCount ? false : true} title='Done' onPress={() => {
                    let userData = {
                        id: this.props.user.userData.id,
                        customer_id: this.props.customerId,
                        comment: feedback,
                        no_of_star: starCount,
                        token: this.props.user.userData.token,
                        review_by: this.props.user.userData.type
                    }
                    onHome(userData);
                }} />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(BarberServiceComplete)