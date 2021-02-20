import React, { Component } from 'react';
import { View, Text, FlatList, Alert, ScrollView, } from 'react-native';
import styles from './style';
import { FooterButton, Button, Icon, MessageInput } from '../../../components';
import THEME from '../../../assets/styles/theme.style';
import StarRating from 'react-native-star-rating';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import moment from 'moment';
class BarberServiceComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {

            starCount: 0,
            feedback: '',
            isFeedbackFocus: false,
            loading: false
        }
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    handleDone = () => {
        this.setState({ loading: true })
        const { feedback, starCount } = this.state;
        let userData = {
            id: this.props.user.userData.id,
            customer_id: this.props.customerId,
            comment: feedback,
            no_of_star: starCount != 0 ? starCount : 5,
            token: this.props.user.userData.token,
            review_by: this.props.user.userData.type,
            is_customer_rate_time: moment().format('YYYY-MM-DD H:mm:ss'),
            userName: this.props.user.userData.full_name,
            booking_id: this.props.bookingId
        }
        this.props.onHome(userData);
    }

    render() {
        let { onHome, totalPrice } = this.props
        const { starCount, isFeedbackFocus, feedback, loading } = this.state;
        return (
            <View style={styles.container}>
                {/* <KeyboardAwareScrollView> */}
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
                {/* </KeyboardAwareScrollView> */}
                <View style={styles.footerStyle}>
                    <View style={styles.lineStyle}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.buttonContainer}>
                        <Button loading={loading} title={"Done"} onPress={this.handleDone} />
                    </View>
                </View>
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