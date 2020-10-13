import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert, ScrollView, Modal } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
import { Icon, FloatingInput, Button, DateTime, RadioButton, FooterButton, SearchandMapView } from '../../../components'
import styles from './style';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import COMMON_STYLE from '../../../assets/styles/common.style';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import { connect } from 'react-redux';
import moment from 'moment';

class UpdateProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            male: true,
            female: false,
            name: '',
            isNameFocus: false,
            isLocationFocus: false,
            profile_Url: {},
            data: "HI HOW are you",
            avatar: null,
            location: '',
            date: '',
            dob: '',
            showDatePicker: false,
            modalView: false,
            submit: false,
            gender: 'Male'
        };
    }

    componentDidMount = () => {
        if (this.props.user.name != null && this.props.user.name != 'undefined') {
            const { name } = this.props.user
            if (name !== '' && name !== 'undefined') {
                this.setState({ name: name })
            }
        }
        // this.findCoordinates();
    }

    handleNext = () => {
        console.log("Handle Next===>")
        const { onNext } = this.props;
        let { name, profile_Url, dob, gender } = this.state;
        let userData = {
            name: name,
            gender: gender,
            dob: dob,
            image: profile_Url
        }
        this.setState({ submit: true });
        if (name && gender && dob) {
            onNext(userData);
        }
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
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else {
                let source = response;
                this.setState({
                    avatar: source,
                    profile_Url: response
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


    hideDatePicker = () => {
        this.setState({ showDatePicker: !this.state.showDatePicker });
    };

    handleConfirm = (selectedDate) => {
        var date = selectedDate.getDate() < 10 ? "0" + selectedDate.getDate() : selectedDate.getDate();
        date += "/";
        date += (selectedDate.getMonth() + 1) < 10 ? "0" + (selectedDate.getMonth() + 1) : (selectedDate.getMonth() + 1);
        date += "/";
        date += (selectedDate.getYear() + 1900);
        var dob = (selectedDate.getYear() + 1900);
        dob += "-";
        dob += (selectedDate.getMonth() + 1) < 10 ? "0" + (selectedDate.getMonth() + 1) : (selectedDate.getMonth() + 1);
        dob += "-";
        dob += selectedDate.getDate() < 10 ? "0" + selectedDate.getDate() : selectedDate.getDate();
        this.setState({
            date,
            dob
        })
        this.hideDatePicker();
    };



    render() {
        const { onNext } = this.props;
        const { isNameFocus, name, submit, date, showDatePicker, gender ,dob} = this.state;

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
                            <View style={{ marginHorizontal: '10%', }}>
                                <View style={[styles.inputContainerStyle,
                                isNameFocus || name != '' ? THEME.inputBorder : {}]}>
                                    <FloatingInput
                                        val={name}
                                        onActive={() => this.setState({ isNameFocus: true })}
                                        onInActive={() => this.setState({ isNameFocus: false })}
                                        label='Your Name' iconInput updateText={(name) => this.setState({ name })} />
                                    <Icon.Feather name='user' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                                </View>
                                {
                                    submit && !name ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                                }
                            </View>

                            <RadioButton gender
                                option1={this.state.male} option2={this.state.female}
                                option1Text="Male" option2Text="Female"
                                onPressOption1={() => this.setState({ gender: 'Male', male: true, female: false })}
                                onPressOption2={() => this.setState({ gender: 'Female', female: true, male: false })} />
                            <View>
                                <View style={{ marginHorizontal: '10%' }}>
                                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                                        <View style={[styles.dateContainer,
                                        showDatePicker || date != '' ? THEME.inputBorder : {}]}>
                                            <Text style={[styles.dateTextStyle, date ? { color: THEME.COLOR_BLACK } : {}]}>{date && date != "" ? date : "Date of Birth"}</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                                <View style={{ marginHorizontal: '10%' }}>
                                    {
                                        submit && !date ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                                    }
                                </View>

                                {/* {showDatePicker ? */}
                                <DateTimePickerModal
                                    isVisible={this.state.showDatePicker}
                                    mode="date"
                                    minimumDate={new Date(1950, 0, 1)}
                                    onConfirm={this.handleConfirm}
                                    onCancel={this.hideDatePicker}
                                />
                                {/* : null} */}
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <FooterButton disabled={gender&&name&&dob&&date?false:true} loading={this.props.user.loading} title="Save & Continue" onPress={this.handleNext} />
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