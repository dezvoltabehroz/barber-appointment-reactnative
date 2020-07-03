import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import THEME from '../../assets/styles/theme.style';
import { Icon, FloatingInput, Button } from '../../components'
import styles from './style';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

export default class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            male: true, female: false,
            profile_Url: '',
            filePath: {}
        };
    }

    chooseFile = () => {
        var options = {
            title: 'Select Avatar',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
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


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <View style={styles.imageContainer}>
                        <ImageBackground style={styles.imageStyle} resizeMode="contain" source={require('../../assets/images/decor.png')}>
                            <View style={styles.avatarContainer}>
                                <Avatar
                                    avatarStyle={styles.avatarStyle}
                                    source={require('../../assets/images/avatar.png')}
                                    rounded
                                    // showEditButton
                                    // onEditPress={this.chooseFile}
                                    size={180} />
                                <TouchableOpacity onPress={this.chooseFile}>
                                    <Text style={styles.profileTextStyle}>Choose Profile Photo</Text>
                                </TouchableOpacity>
                            </View>

                        </ImageBackground>
                    </View>
                </View>
                <View style={styles.lowerContainer}>
                    <View style={styles.inputContainerStyle}>
                        <FloatingInput label='Your Name' iconInput />
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
                    <View style={styles.inputContainerStyle}>
                        <FloatingInput label='Your Location' iconInput />
                        <Icon.SimpleLineIcons name='location-pin' style={styles.iconStyle} size={THEME.ICON_SIZE} color={THEME.COLOR_GREY} />
                    </View>
                    <View style={styles.lineStyle}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.buttonContainer}>
                        <Button title='Update & Finish' />
                    </View>
                </View>
            </View>
        );
    }
}