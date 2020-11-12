import React, { Component } from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, Alert, Image, ScrollView } from "react-native";
import styles from './style';
import { Button, Icon, ProfileCard } from '../../../components'
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import Geocoder from 'react-native-geocoder';
import THEME from '../../../assets/styles/theme.style';
import moment from 'moment'
import ImagePicker from 'react-native-image-picker';
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
        }
    }

    componentDidMount = () => {
    }

    render() {
        const { filePath } = this.state;
        return (
            <>

                <View style={styles.container}>
                    <ScrollView>
                        <View style={{ marginTop: '5%', marginHorizontal: '5%' }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Avatar
                                    avatarStyle={styles.avatarStyle}
                                    source={{ uri: this.props.user.userData ? this.props.user.userData.profile_picture : filePath.uri }}
                                    rounded
                                    size={120} />
                                <View style={{ justifyContent: 'center', }}>
                                    <Text style={styles.textStyle}>{this.props.user.userData ? this.props.user.userData.full_name : 'JOHN DOE'}</Text>
                                    <Text style={styles.textStyle}>Age: {this.props.user.userData ? moment().diff(this.props.user.userData.dob, 'years') : ''} </Text>
                                    <Text style={styles.textStyle}>Rating: 4.5/5</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: '5%' }}>
                            <ProfileCard
                                icon={"ios-person"}
                                heading={'PROFILE'}
                                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                                onPress={() => this.props.onProfile()}
                            />
                            <ProfileCard
                                icon={"ios-images"}
                                heading={'PORTFOLIO'}
                                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                                onPress={() => this.props.onPortfolio()}
                            />
                            <ProfileCard
                                icon={"ios-settings"}
                                heading={'SERVICES'}
                                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                                onPress={() => this.props.onServices()}
                            />
                            <ProfileCard
                                icon={"drivers-license"}
                                heading={'LICENCE/CERTIFICATE'}
                                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                                onPress={() => this.props.onCertificate()}
                            />
                            <ProfileCard
                                icon={"clock-o"}
                                heading={'MANAGE SCHEDULE'}
                                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                                onPress={() => this.props.onManageSchedule()}
                            />
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