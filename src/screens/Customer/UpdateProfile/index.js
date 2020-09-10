import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert, ScrollView, Modal } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
import { Icon, FloatingInput, Button, DateTime, RadioButton, FooterButton, SearchandMapView } from '../../../components'
import styles from './style';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import { connect } from 'react-redux';

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        const { name } = this.props.user.userSocialNetworkData
        this.state = {
            male: true,
            female: false,
            name: name ? name : '',
            isNameFocus: false,
            isLocationFocus: false,
            profile_Url: '',
            data: "HI HOW are you",
            avatar: null,
            location: '',
            date: '',
            showDatePicker: false,
            modalView: false
        };
    }

    componentDidMount = () => {
        this.findCoordinates();
    }

    onChangeDate = (event, selectedDate) => {
        var date = selectedDate.getDate();
        date += "/";
        date += (selectedDate.getMonth() + 1);
        date += "/";
        date += (selectedDate.getYear() + 1900);
        this.setState({
            date,
            showDatePicker: false,
        })
    };

    chooseFile = () => {
        var options = {
            title: 'Select Avatar',

            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('response  ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response;
                this.setState({
                    avatar: source,
                });
            }
        });
    };
    handleLocation = (location) => {
        if (location != '' && location != null)
            this.setState({ location })
    }

    findCoordinates = () => {
        Geolocation.getCurrentPosition(
            position => {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                Geocoder.geocodePosition(pos).then(res => {
                    this.setState({ location: res[0].formattedAddress })
                })
                    .catch(error => alert(error));
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 50000, maximumAge: 1000 }
        );
    };


    render() {
        const { onNext } = this.props;
        const { isNameFocus, name, isLocationFocus, location, date, showDatePicker, modalView } = this.state;

        return (

            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <ScrollView>
                        <View style={styles.imageContainer}>
                            <ImageBackground style={styles.imageStyle} resizeMode="contain" source={require('../../../assets/images/decor.png')}>
                                <View style={styles.avatarContainer}>
                                    <Avatar
                                        avatarStyle={styles.avatarStyle}
                                        source={this.state.avatar ? this.state.avatar : require('../../../assets/images/avatar.png')}
                                        rounded
                                        size={120} />
                                    <TouchableOpacity onPress={this.chooseFile}>
                                        <Text style={styles.profileTextStyle}>Choose Profile Photo</Text>
                                    </TouchableOpacity>
                                </View>

                            </ImageBackground>
                        </View>
                        <View style={styles.lowerContainer}>
                            <View style={[styles.inputContainerStyle,
                            isNameFocus || name != '' ? THEME.inputBorder : {}]}>
                                <FloatingInput
                                    val={name}
                                    onActive={() => this.setState({ isNameFocus: true })}
                                    onInActive={() => this.setState({ isNameFocus: false })}
                                    label='Your Name' iconInput updateText={(name) => this.setState({ name })} />
                                <Icon.Feather name='user' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                            </View>

                            <RadioButton gender
                                option1={this.state.male} option2={this.state.female}
                                option1Text="Male" option2Text="Female"
                                onPressOption1={() => this.setState({ male: true, female: false })}
                                onPressOption2={() => this.setState({ female: true, male: false })} />
                            <View>
                                <View style={styles.dateContainer}>
                                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                                        <View style={[styles.dateContainer,
                                        showDatePicker || date != '' ? THEME.inputBorder : {}]}>
                                            <Text style={[styles.dateTextStyle, date ? { color: THEME.COLOR_BLACK } : {}]}>{date && date != "" ? date : "Date of Birth"}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {showDatePicker ?
                                    <DateTime
                                        date
                                        onChangeDate={this.onChangeDate}
                                    />
                                    : null}
                            </View>
                            {/* <View style={[styles.inputLocationContainerStyle,
                            isLocationFocus || location != '' ? THEME.inputBorder : {}]}>
                                <FloatingInput val={location}
                                    onInActive={() => this.setState({ isLocationFocus: false })}
                                    onActive={() => this.setState({ isLocationFocus: true })}
                                    label='Your Location' iconInput val={this.state.location} />
                                <TouchableOpacity onPress={() => this.setState({ modalView: true })}>
                                    <Icon.SimpleLineIcons name='location-pin' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                                </TouchableOpacity>
                            </View> */}
                        </View>
                    </ScrollView>
                </View>
                <FooterButton title="Next" onPress={onNext} />
                <Modal visible={modalView}>
                    <View style={styles.modalContainer}>
                        <View>
                            <SearchandMapView
                                updateProfile
                                address={(location) => this.handleLocation(location)}
                            />
                        </View>
                    </View>
                    <FooterButton title="Cancel" onPress={() => this.setState({ modalView: false })} />
                </Modal>
            </View>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(UpdateProfile)