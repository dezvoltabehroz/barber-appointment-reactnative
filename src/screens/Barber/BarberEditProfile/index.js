import React, { Component } from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, Alert, Image, ScrollView } from "react-native";
import styles from './style';
import { Button, Icon, ProfileCard } from '../../../components'
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import THEME from '../../../assets/styles/theme.style';
import StarRating from 'react-native-star-rating';
class BarberEditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filePath: { uri: 'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Bearded_Man-17-512.png' },
            barberServices: [
                { id: 1, serviceName: 'Hair Cuttuing', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 2, serviceName: 'Hair Trimming', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 3, serviceName: 'Blowout', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 4, serviceName: 'Hair Color', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 5, serviceName: 'Double process hair color', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 6, serviceName: 'Shave', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '', isFilled: '' },
                { id: 7, serviceName: 'Beard Trim', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 8, serviceName: 'Braids & Twist', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 9, serviceName: 'Hair color touch ups', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 10, serviceName: 'Scalp Conditioning Treatment', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 11, serviceName: 'Permanent Hair Retexturizing', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
            ],
            userArray: [
                {
                    name: 'Profile',
                },
                {
                    name: 'Portfolio',
                },
                {
                    name: 'Services',
                },
                {
                    name: 'Licence',
                },
                {
                    name: 'Schedule',
                },

            ]
        }
    }

    componentDidMount = () => {
    }

    renderItem = ({ item, index }) => {
        return (
            <ProfileCard heading={item.name} onPress={
                item.name == 'Profile' ? () => this.props.onProfile()
                    : item.name == 'Portfolio' ?
                        () => this.props.onPortfolio()
                        : item.name == 'Services' ?
                            () => this.props.onServices()
                            : item.name == 'Licence' ?
                                () => this.props.onCertificate()
                                : item.name == 'Schedule' ?
                                    () => this.props.onManageSchedule()
                                    : null} />
        )
    }

    renderSeparator = () => {
        return (<View style={styles.gapHeight}></View>)
    }

    render() {
        const { filePath } = this.state;
        console.log("this.props.user.userData.start_count", this.props.user.userData)
        console.log("this.props.user.userData.start_count", this.props.user.userData.start_count)
        return (
            <>

                <View style={[styles.container, { paddingBottom: '1%' }]}>
                    <ScrollView>
                        <View style={{ marginTop: '5%', marginHorizontal: '5%' }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Avatar
                                    avatarStyle={styles.avatarStyle}
                                    source={{ uri: this.props.user.userData ? this.props.user.userData.profile_picture : filePath.uri }}
                                    rounded
                                    size={120} />

                            </View>
                            <View style={{ marginTop: '5%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.textStyle}>{this.props.user.userData ? this.props.user.userData.full_name : 'JOHN DOE'}</Text>
                                {/* <Text style={styles.textStyle}>Age: {this.props.user.userData ? moment().diff(this.props.user.userData.dob, 'years') : ''} </Text> */}

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    starSize={20}
                                    rating={this.props.user.userData.stars_count != null ? this.props.user.userData.stars_count : 5}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    fullStarColor={THEME.PRIMARY_COLOR}
                                />
                                <Text style={[styles.textStyle, { marginLeft: 5 }]}>{this.props.user.userData.stars_count != null ? this.props.user.userData.stars_count : 5}/5</Text>

                            </View>
                        </View>
                        <View style={{ marginTop: '5%' }}>
                            <FlatList keyExtractor={item => item}
                                ItemSeparatorComponent={this.renderSeparator}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.contentContainer}
                                data={this.state.userArray}
                                renderItem={this.renderItem} />
                        </View>
                    </ScrollView>
                </View>
            </>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(BarberEditProfile)