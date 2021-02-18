import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert, ScrollView } from 'react-native';
import THEME from '../../../assets/styles/theme.style';
import { Icon, FloatingInput, Button, DateTime, RadioButton, Input, FooterButton, SearchandMapView } from '../../../components'
import styles from './style';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import COMMON_STYLE from '../../../assets/styles/common.style';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-native-modal';
import { ActivityIndicator } from 'react-native';
import EmailandPasssword from '../../Barber/EmailandPasssword';
import User from '../../../assets/svg/user.svg'
import Gift from '../../../assets/svg/gift.svg'
import Beard from '../../../assets/svg/beard.svg';
import BeardGray from '../../../assets/svg/beardgray.svg';
import Female from '../../../assets/svg/female.svg';
import FemaleGray from '../../../assets/svg/femaleGray.svg';
class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            male: true,
            female: false,
            name: '',
            isNameFocus: false,
            isLocationFocus: false,
            profile_Url: null,
            data: "HI HOW are you",
            avatar: '',
            location: '',
            date: '',
            dob: '',
            showDatePicker: false,
            modalView: false,
            submit: false,
            gender: 'Male',
            uploading: false
        };
    }

    componentDidMount = () => {
        const { full_name, profile_picture, dob, gender } = this.props.user.userData;
        console.log(this.props.user.userData)
        this.setState({
            name: full_name,
            avatar: profile_picture,
            date: moment(dob).format('Do MMMM YYYY'),
            dob: moment(dob).format('YYYY-MM-DD'),
        })
        if (gender == 'Male') {
            this.setState({ male: true, female: false, gender: gender })
        }
        else {
            this.setState({ female: true, male: false, gender: gender })
        }
    }

    handleNext = () => {
        this.setState({ submit: true }, async () => {
            const { onNext } = this.props;
            let { name, profile_Url, dob, gender, submit } = this.state;
            let userData = {
                name: name,
                gender: gender,
                dob: dob,
                image: profile_Url,
                id: this.props.user.userData.id,
                token: this.props.user.userData.token,
                phone: this.props.user.userData.phone
            }

            if (name && gender && dob && submit && this.isNameValid(name)) {
                this.setState({ uploading: true })
                await onNext(userData);
                // this.setState({ uploading: false })
            }
        })

    };

    chooseFile = () => {
        var options = {
            title: 'Select Avatar',
            noData: true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
            } else {
                let source = response;
                this.setState({
                    avatar: source.uri,
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

    isNameValid = (name) => {
        return /^[A-Za-z\.\s]{3,25}$/.test(name)
    }


    render() {
        const { onNext } = this.props;
        const { isNameFocus, name, submit, date, showDatePicker, gender, dob, uploading } = this.state;

        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <ScrollView>
                            <View style={styles.imageContainer}>
                                <View style={styles.avatarContainer}>
                                    <Avatar
                                        avatarStyle={styles.avatarStyle}
                                        source={this.state.avatar != '' ? { uri: this.state.avatar } : require('../../../assets/images/avatar.png')}
                                        rounded
                                        accessory={{ name: 'ios-camera', type: 'ionicon', color: '#fff', underlayColor: '#000', iconStyle: { fontSize: 20 } }}
                                        showAccessory={true}
                                        onAccessoryPress={this.chooseFile}
                                        size={120} />
                                    {/* <TouchableOpacity onPress={this.chooseFile}>
                                        <Text style={styles.profileTextStyle}>Choose Profile Photo</Text>
                                    </TouchableOpacity> */}
                                </View>
                                {/* <ImageBackground style={styles.imageStyle} resizeMode="contain" source={require('../../../assets/images/decor.png')}>
                               

                            </ImageBackground> */}
                            </View>
                            <View style={styles.lowerContainer}>
                                <View style={{ marginHorizontal: "7%" }}>
                                    <Input placeholder="Your Full Name"
                                        rightIcon={(<View style={{ padding: 5 }}><User height={25} width={25} /></View>)}
                                        value={name} onChangeText={(name) => { this.setState({ name }) }} />
                                    {
                                        submit && !name ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                                    }
                                    {
                                        name.length && !this.isNameValid(name) ? <Text style={COMMON_STYLE.errorText}>Name is Invalid</Text> : null
                                    }

                                </View>

                                {/* <RadioButton gender
                                option1={this.state.male} option2={this.state.female}
                                option1Text="Male" option2Text="Female"
                                onPressOption1={() => this.setState({ gender: 'Male', male: true, female: false })}
                                onPressOption2={() => this.setState({ gender: 'Female', female: true, male: false })} /> */}
                                <View>
                                    <View>
                                        <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                                            <View style={[styles.dateContainer,
                                                // showDatePicker || date != '' ? THEME.inputBorder : {}
                                            ]}>
                                                <View>
                                                    <Text style={[styles.dateTextStyle,]}>{date && date != "" ? date : "DD/MM/YYYY | Birthday"}</Text>
                                                </View>
                                                <View style={{ marginRight: '2.5%' }}>
                                                    <Gift height={25} width={25} />
                                                </View>
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
                                    <View style={{ marginHorizontal: '10%' }}>
                                        {
                                            submit && !date ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                                        }
                                    </View>

                                    {/* {showDatePicker ?
                                <DateTimePickerModal
                                    isVisible={this.state.showDatePicker}
                                    mode="date"
                                    minimumDate={new Date(1950, 0, 1)}
                                    onConfirm={this.handleConfirm}
                                    onCancel={this.hideDatePicker}
                                />
                                : null} */}
                                </View>
                                <View style={{ marginTop: "5%", flexDirection: 'row', justifyContent: "center" }}>
                                    <TouchableOpacity onPress={() => this.setState({ male: true, female: false })}>
                                        {
                                            this.state.male == true && this.state.female == false ?
                                                <Beard height={80} width={80} />
                                                :
                                                <BeardGray height={80} width={80} />
                                        }

                                    </TouchableOpacity>
                                    <View style={{ width: 20 }}></View>
                                    <TouchableOpacity onPress={() => this.setState({ female: true, male: false })}>
                                        {
                                            this.state.female == true && this.state.male == false ?
                                                <Female height={80} width={80} />
                                                :
                                                <FemaleGray height={80} width={80} />
                                        }

                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <FooterButton disabled={gender && name && dob && date ? false : true} title="Update Profile"
                        onPress={this.handleNext}
                    />
                </View>
                <Modal isVisible={uploading}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={60} />
                    </View>
                </Modal>
            </>);
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(EditProfile)