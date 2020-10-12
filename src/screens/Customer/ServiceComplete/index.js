import React, { Component } from 'react';
import { View, Text, FlatList, Alert, ScrollView, } from 'react-native';
import styles from './style';
import { FooterButton, Icon, MessageInput } from '../../../components';
import THEME from '../../../assets/styles/theme.style';
import StarRating from 'react-native-star-rating';
import { Avatar } from "react-native-elements";
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
export default class ServiceComplete extends Component {
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
        let { onHome } = this.props
        const { starCount, isFeedbackFocus, feedback } = this.state;
        return (
            <View style={styles.container}>
                <KeyboardAwareView>
                    <View style={styles.upperContainer}>

                        {/* <View style={styles.rowStyle}>
                        <Text style={styles.headingTextStyle1}>Total Amount Paid:</Text>
                        <Text style={[styles.headingTextStyle1, { color: THEME.PRIMARY_COLOR }]}>  $260</Text>
                    </View> */}
                        <View style={styles.cardStyle} >
                            <View style={styles.avatarContainer}>
                                <Avatar source={{ uri: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png' }} size={100} />
                            </View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTextStyle} >Alexendar</Text>
                                <Text style={styles.dateTextStyle} >Age: 26</Text>
                                <Text style={styles.dateTextStyle} >Rating: 4.5 / 5</Text>
                            </View>
                        </View>
                        {/* <View style={styles.iconContainer}>
                        <Icon.FontAwesome5 name='hand-holding-usd' size={120} color={THEME.PRIMARY_COLOR} />
                    </View> */}
                        <View style={styles.borderStyle}>
                            <Text style={styles.headingText}>Rate Barber</Text>
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
                </KeyboardAwareView>
                <FooterButton title='Done' onPress={onHome} />
            </View>
        )
    }
}