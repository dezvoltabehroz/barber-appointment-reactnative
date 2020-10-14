import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert, Dimensions, ScrollView, Platform, Modal } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
import { Icon, FloatingInput, FooterButton, DateTime, RadioButton, SearchandMapView } from '../../../components'
import styles from './style';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import RangeSlider from 'rn-range-slider';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import { connect } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";
class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        let { name } = this.props.user
        this.state = {
            male: true,
            female: false,
            name: name ? name : '',
            isNameFocus: false,
            isLocationFocus: false,
            profile_Url: '',
            dateValue: new Date(),
            data: "HI HOW are you",
            avatar: require('../../../assets/images/avatar.png'),
            location: '',
            date: '',
            minDistance: 5,
            maxDistance: 50,
            showDatePicker: false,
            submit: false,
            modalView: false,
            filePath: { uri: 'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Bearded_Man-17-512.png' },
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
        this.setState({ date, showDatePicker: Platform.OS == 'android' ? !this.state.showDatePicker : this.state.showDatePicker });
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
                    filePath: source,
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

    handleLocation = (location) => {
        if (location != '' && location != null)
            this.setState({ location })
    }

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
        const { isNameFocus, name, isLocationFocus, location, date, showDatePicker, maxDistance, minDistance, modalView, filePath } = this.state;

        return (

            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <ScrollView>
                        <View style={styles.imageContainer}>
                            <ImageBackground style={styles.imageStyle} resizeMode="contain" source={require('../../../assets/images/decor.png')}>
                                <View style={styles.avatarContainer}>
                                    <Avatar
                                        avatarStyle={styles.avatarStyle}
                                        source={{ uri: filePath.uri }}
                                        rounded
                                        accessory={{ name: 'ios-camera', type: 'ionicon', color: '#fff', underlayColor: '#000', iconStyle: { fontSize: 20 } }}
                                        showAccessory={true}
                                        onAccessoryPress={this.chooseFile}
                                        size={120} />
                                    {/* <TouchableOpacity onPress={this.chooseFile}>
                                        <Text style={styles.profileTextStyle}>Choose Profile Photo</Text>
                                    </TouchableOpacity> */}
                                </View>

                            </ImageBackground>
                        </View>
                        <View style={styles.lowerContainer}>
                            <View style={[styles.inputContainerStyle, isNameFocus || name != '' ? THEME.inputBorder : {}]}>
                                <FloatingInput
                                    val={name}
                                    onActive={() => this.setState({ isNameFocus: true })}
                                    onInActive={() => this.setState({ isNameFocus: false })}
                                    label='Your Name' iconInput updateText={(name) => this.setState({ name })} />
                                <Icon.Feather name='user' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                            </View>
                            <RadioButton gender
                                option1={this.state.male} option2={this.state.female}
                                option1Text="Male" option2Text="female"
                                onPressOption1={() => this.setState({ male: true, female: false })}
                                onPressOption2={() => this.setState({ female: true, male: false })} />
                            <View>
                                <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                                    <View style={[styles.dateContainer,
                                    showDatePicker || date != '' ? THEME.inputBorder : {}]}>
                                        <Text style={[styles.dateTextStyle, date ? { color: THEME.COLOR_BLACK } : {}]}>{date && date != "" ? date : "Date of Birth"}</Text>
                                    </View>
                                </TouchableOpacity>
                                {/* {showDatePicker ?
                                    <>
                                        <View>
                                            <DateTime
                                                date
                                                onChangeDate={this.onChangeDate} />
                                        </View>
                                        {
                                            Platform.OS == 'ios' ?
                                                <View style={styles.buttonContainer}>
                                                    <Button title='Save' onPress={() => this.setState({ showDatePicker: false })} />
                                                </View> : null
                                        }
                                    </> : null} */}
                                <DateTimePickerModal
                                    isVisible={this.state.showDatePicker}
                                    mode="date"
                                    minimumDate={new Date(1950, 0, 1)}
                                    onConfirm={this.handleConfirm}
                                    onCancel={this.hideDatePicker}
                                />
                            </View>
                            <View style={[styles.inputContainerStyle, { marginBottom: '2%' },
                            isLocationFocus || location != '' ? THEME.inputBorder : {}]}>
                                <FloatingInput val={location}
                                    onInActive={() => this.setState({ isLocationFocus: false })}
                                    onActive={() => this.setState({ isLocationFocus: true })}
                                    label='Your Location' val={this.state.location} />
                                {/* <TouchableOpacity onPress={() => this.setState({ modalView: true })}>
                                    <Icon.SimpleLineIcons name='location-pin' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                                </TouchableOpacity> */}
                            </View>
                            <View style={styles.distanceContainerStyle}>
                                <View style={styles.distanceHeadingContainer}>
                                    <Text style={styles.distanceTextStyle}>Maximum Distance</Text>
                                    <Text style={styles.distanceStyle}>{minDistance} - {maxDistance} miles</Text>
                                </View>
                                <View style={styles.sliderContainer}>
                                    <RangeSlider
                                        style={styles.sliderStyle}
                                        gravity={"top"}
                                        min={5}
                                        max={50}
                                        step={5}
                                        thumbColor={THEME.PRIMARY_COLOR}
                                        labelBackgroundColor={THEME.PRIMARY_COLOR}
                                        labelBorderWidth={0}
                                        thumbBorderWidth={0}
                                        selectionColor={THEME.PRIMARY_COLOR}
                                        blankColor={THEME.COLOR_GREY}
                                        onValueChanged={(low, high, fromUser) => {
                                            this.setState({ minDistance: low, maxDistance: high })
                                        }} />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <FooterButton title='Update Profile' onPress={onNext} />
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