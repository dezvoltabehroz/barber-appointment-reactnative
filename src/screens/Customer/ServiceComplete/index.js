import React, { Component } from 'react';
import { View, Text, FlatList, Alert, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import styles from './style';
import { FooterButton, Icon, Button, MessageInput, FloatingInput } from '../../../components';
import THEME from '../../../assets/styles/theme.style';
import Modal from 'react-native-modal'
import StarRating from 'react-native-star-rating';
import { Avatar } from "react-native-elements";
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import { Barbers } from '../../../services';
import { connect } from 'react-redux';
import moment from 'moment';

class ServiceComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 0,
            feedback: '',
            isFeedbackFocus: false,
            barberName: '',
            barberAge: '',
            barberProfile: '',
            tipModal: false,
            tip: '',
            loading: false,
            giveTip: false,
            finishLoading: false
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
        const { starCount, isFeedbackFocus, feedback,
            barberAge, barberName, barberProfile, tip, isTipFocus, giveTip, finishLoading,
            tipModal, loading } = this.state;
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
                            <FooterButton disabled={feedback && starCount ? false : true} title='Done' onPress={() => {

                                this.setState({ tipModal: true })
                            }} />
                            <Modal isVisible={tipModal}  >
                                <View style={styles.content}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '5%' }}>
                                        <View style={styles.iconContainer}>
                                            <Icon.FontAwesome5 name='hand-holding-usd' size={25} color={THEME.PRIMARY_COLOR} />
                                        </View>
                                        <Text style={styles.headingText}>Give a tip to Barber!</Text>
                                    </View>
                                    {
                                        giveTip ?
                                            <>


                                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                    <View style={[styles.inputContainerStyle,
                                                    isTipFocus || tip != '' ? THEME.inputBorder
                                                        :
                                                        {}]}>
                                                        <FloatingInput
                                                            val={tip}
                                                            keyboardtype="number-pad"
                                                            onActive={() => this.setState({ isTipFocus: true })}
                                                            onInActive={() => this.setState({ isTipFocus: false, submit: true })}
                                                            label='$5' updateText={(tip) => this.setState({ tip })} />
                                                    </View>
                                                </View>

                                            </> : null}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <TouchableOpacity onPress={() => this.setState({ giveTip: !giveTip })} style={styles.tipContainer}>
                                            <Text style={styles.buttonText}>{giveTip ? 'Cancel' : 'Give Tip'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={async () => {
                                            this.setState({ finishLoading: true });
                                            let userData = {
                                                barber_id: this.props.userData.barber_id,
                                                customer_id: this.props.userData.id,
                                                comment: feedback,
                                                no_of_star: starCount,
                                                token: this.props.userData.token,
                                                review_by: this.props.userData.type,
                                                is_services_rate_time: moment().format("YYYY-MM-DD H:mm:ss"),
                                                userName: this.props.user.userData.full_name,
                                                booking_id: this.props.userData.booking_id
                                            }
                                            await onHome(userData);
                                        }}
                                            style={styles.tipContainer}>
                                            {
                                                finishLoading ?
                                                    <ActivityIndicator size={20} color={THEME.COLOR_WHITE} />
                                                    :
                                                    <Text style={styles.buttonText}>Finish</Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </>
                }
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};
export default connect(mapStateToProps)(ServiceComplete);