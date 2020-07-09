import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
import { Icon, FloatingInput, Button } from '../../../components'
import styles from './style';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
export default class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            male: true, female: false, name: '', isNameFocus: false, isLocationFocus: false,
            profile_Url: '',
            dateValue: new Date(),
            data: "HI HOW are you",
            avatar: null, location: '',
            date: '',
            showDatePicker: false,
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
        console.log(date);
        this.setState({ date, showDatePicker: Platform.OS == 'android'? !this.state.showDatePicker : this.state.showDatePicker });
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
        const { isNameFocus, name, isLocationFocus, location, date, dateValue, showDatePicker } = this.state;

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
                            <View style={[styles.inputContainerStyle, isNameFocus || name != '' ? {
                                borderWidth: 2,
                                borderColor: THEME.PRIMARY_COLOR,
                            } : {}]}>
                                <FloatingInput
                                    val={name}
                                    onActive={() => this.setState({ isNameFocus: true })}
                                    onInActive={() => this.setState({ isNameFocus: false })}
                                    label='Your Name' iconInput updateText={(name) => this.setState({ name })} />
                                <Icon.Feather name='user' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                            </View>

                            <View style={styles.customerAndBarberContainer}>
                                <TouchableOpacity onPress={() => this.setState({ male: !this.state.male, female: false })}
                                    style={[styles.CustomerContainer, this.state.female == false && this.state.male ? { backgroundColor: THEME.PRIMARY_COLOR } : null]}>
                                    <View style={styles.optionContainer}>
                                        <Icon.Ionicons
                                            name="md-male"
                                            color={this.state.female == false && this.state.male ? THEME.COLOR_WHITE : THEME.COLOR_GREY}
                                            size={25} />
                                        <Text style={[styles.optionTextStyle, this.state.female == false && this.state.male ? { color: THEME.COLOR_WHITE } : null]}>
                                            Male
                                </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.gap}></View>
                                <TouchableOpacity onPress={() => this.setState({ female: !this.state.female, male: false })}
                                    style={[styles.barberContainer, this.state.male == false && this.state.female ? { backgroundColor: THEME.PRIMARY_COLOR } : null]} >
                                    <View style={styles.optionContainer}>
                                        <Icon.Ionicons
                                            name="md-female"
                                            color={this.state.male == false && this.state.female ? THEME.COLOR_WHITE : THEME.COLOR_GREY}
                                            size={25} />
                                        <Text style={[styles.optionTextStyle, this.state.male == false && this.state.female ? { color: THEME.COLOR_WHITE } : null]}>
                                            Female
                                </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                                    <View style={[styles.dateContainer, showDatePicker || date != '' ? {
                                        borderWidth: 2,
                                        borderColor: THEME.PRIMARY_COLOR,
                                    } : {}]}>
                                        <Text style={[styles.dateTextStyle, date ? { color: THEME.COLOR_BLACK } : {}]}>{date && date != "" ? date : "Date of Birth"}</Text>
                                    </View>
                                </TouchableOpacity>
                                {showDatePicker ?
                                    <>
                                        <View>
                                            <DateTimePicker
                                                value={dateValue}
                                                mode={'date'}
                                                textColor={THEME.COLOR_WHITE}
                                                is24Hour={true}
                                                display="spinner"
                                                onChange={this.onChangeDate}
                                            />
                                        </View>
                                        {
                                            Platform.OS == 'ios' ?
                                                <View style={styles.buttonContainer}>
                                                    <Button title='Save' onPress={() => this.setState({ showDatePicker: false })} />
                                                </View> : null
                                        }
                                    </> : null}
                            </View>
                            <View style={[styles.inputLocationContainerStyle, isLocationFocus || location != '' ? {
                                borderWidth: 2,
                                borderColor: THEME.PRIMARY_COLOR,
                            } : {}]}>
                                <FloatingInput val={location}
                                    onInActive={() => this.setState({ isLocationFocus: false })}
                                    onActive={() => this.setState({ isLocationFocus: true })}
                                    label='Your Location' iconInput val={this.state.location} />
                                <Icon.SimpleLineIcons name='location-pin' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.footerStyle}>
                    <View style={styles.lineStyle}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.buttonContainer}>
                        <Button title='Next' onPress={onNext} />
                    </View>
                </View>
            </View>
        );
    }
}