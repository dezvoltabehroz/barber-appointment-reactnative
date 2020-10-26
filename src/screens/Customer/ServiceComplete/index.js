import React, { Component } from 'react';
import { View, Text, FlatList, Alert, ScrollView, ActivityIndicator, } from 'react-native';
import styles from './style';
import { FooterButton, Icon, MessageInput } from '../../../components';
import THEME from '../../../assets/styles/theme.style';
import StarRating from 'react-native-star-rating';
import { Avatar } from "react-native-elements";
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import { Barbers } from '../../../services';
export default class ServiceComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 0,
            feedback: '',
            isFeedbackFocus: false,
            barberName: '',
            barberAge: '',
            barberProfile: '', loading: false
        }
    }
    componentDidMount = () => {
        this.setState({ loading: true })
        const { userData } = this.props;
        Barbers.getBarberProfile(userData)
            .then((res) => {
                if (res.data.status) {
                    this.setState({
                        barberName: res.data.barber_details.full_name,
                        barberAge: res.data.barber_details.age,
                        barberProfile: res.data.barber_details.profile_picture,
                        loading: false
                    })
                }
            })
            .catch((err) => console.log(err))
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    render() {
        let { onHome } = this.props
        const { starCount, isFeedbackFocus, feedback, barberAge, barberName, barberProfile, loading } = this.state;
        return (
            <View style={styles.container}>
                {
                    loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            <ActivityIndicator />
                        </View>
                        :
                        <>
                            <KeyboardAwareView>
                                <View style={styles.upperContainer}>
                                    <View style={styles.cardStyle} >
                                        <View style={styles.avatarContainer}>
                                            <Avatar rounded={true} source={{ uri: barberProfile }} size={100} />
                                        </View>
                                        <View style={styles.nameContainer}>
                                            <Text style={styles.nameTextStyle} >{barberName}</Text>
                                            <Text style={styles.dateTextStyle} >Age: {barberAge}</Text>
                                        </View>
                                    </View>
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
                                                // multiline={true}
                                                onActive={() => this.setState({ isMessageFocus: true })}
                                                onInActive={() => this.setState({ isMessageFocus: false })}
                                                updateText={(feedback) => this.setState({ feedback })} />
                                        </View>
                                    </View>
                                </View>
                            </KeyboardAwareView>
                            <FooterButton disabled={feedback&&starCount?false:true} title='Done' onPress={() => {
                                let userData = {
                                    barber_id: this.props.userData.barber_id,
                                    customer_id: this.props.userData.id,
                                    comment: feedback,
                                    no_of_star: starCount,
                                    token:this.props.userData.token,
                                    review_by:this.props.userData.type
                                }
                                onHome(userData)
                            }} />
                        </>
                }
            </View>
        )
    }
}