import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, } from 'react-native';
import { FooterButton, Icon } from '../../../components';
import styles from './style';
import ImagePicker from 'react-native-image-picker';
import THEME from '../../../assets/styles/theme.style';
import LightBox from "react-native-lightbox";
import ImageView from 'react-native-image-view';
import BarberTopNavigationRoutes from '../../../navigation/BarberTopTabNavigator';

export default class PersonalInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageCertification: [],
            drivingLicense: '',
            imageSource: '',
            passportImage: '',
            nationalIdImage: '',
            cv: '',
            isImageViewVisible: false,
        }
    }


    renderImage = (value) => {
        const {
            drivingLicense,
            passportImage,
            nationalIdImage,
            cv
        } = this.state;
        return (
            <Image style={styles.renderImageStyle}
                resizeMode='contain'
                source={value == 'cv' ?
                    cv : value == 'driver' ?
                        drivingLicense : value == 'passport' ?
                            passportImage : nationalIdImage} />
        )
    }


    renderImages = (image) => {
        return (
            <Image style={styles.renderImageStyle}
                resizeMode='contain'
                source={image} />
        )
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    _renderItems = (image) => {
        return (
            <>
                <View style={styles.gapHeight}></View>
                <TouchableOpacity onPress={() =>
                    this.setState({ isImageViewVisible: true })
                }>
                    <Image source={image} resizeMode='cover' style={styles.imageStyle} />
                </TouchableOpacity>
            </>
        )
    }

    chooseFile = (value, index) => {
        var options = {
            title: 'Select an Image',
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
                this.setState({ imageSource: source })
                if (value == 'driver') {
                    this.setState({
                        drivingLicense: source,
                    });
                } else if (value === 'passport') {
                    this.setState({
                        passportImage: source,
                    });
                } else if (value === 'nic') {
                    this.setState({
                        nationalIdImage: source,
                    });
                } else if (value === 'cv') {
                    this.setState({
                        cv: source,
                    });
                } else if (value === 'certification') {
                    let tempArray = this.state.imageCertification;
                    tempArray.push(source);
                    this.setState({ imageCertification: tempArray })
                }

            }
        });
    };


    render() {
        const { onNext } = this.props;
        const { 
            drivingLicense,
            passportImage,
            nationalIdImage,} = this.state;
    
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            {/* <View>
                                <View style={styles.certificationContainer1}>
                                    <View style={styles.labelContainer}  >
                                        <Text style={styles.labelTextStyle}>Upload Certification</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.iconContainer}
                                        onPress={() => this.chooseFile('certification')}>
                                        <Icon.Entypo
                                            name="attachment"
                                            size={THEME.ICON_SIZE}
                                            color={THEME.COLOR_WHITE} />
                                    </TouchableOpacity>
                                </View>
                                {
                                    imageCertification != null || imageCertification[0] != 'undefined' ?
                                        <>
                                            <FlatList
                                                data={imageCertification}
                                                // horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                                ItemSeparatorComponent={this._renderSeparator}
                                                renderItem={({ item }) => this._renderItems(item)}
                                                keyExtractor={item => item}
                                                extraData={this.state.imageCertification}
                                            />
                                            <ImageView
                                                images={imageURLs}
                                                imageIndex={0}
                                                isVisible={this.state.isImageViewVisible}
                                                isSwipeCloseEnabled={true}
                                                onClose={() => { this.setState({ isImageViewVisible: false }) }}
                                            />
                                        </>
                                        :
                                        null
                                }
                            </View> */}

                            <View style={styles.certificationContainer}>
                                <View style={styles.labelContainer} >
                                    <Text style={styles.labelTextStyle}>Driving License</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.iconContainer}
                                    onPress={() => this.chooseFile('driver')}>
                                    <Icon.Entypo
                                        name="attachment"
                                        size={THEME.ICON_SIZE}
                                        color={THEME.COLOR_WHITE} />
                                </TouchableOpacity>
                                {
                                    drivingLicense != '' ?
                                        <LightBox
                                            style={styles.imageContainer}
                                            renderContent={() => this.renderImage('driver')}  >
                                            <Image
                                                source={drivingLicense}
                                                resizeMode='cover'
                                                style={styles.imageStyle} />
                                        </LightBox>
                                        :
                                        null
                                }
                            </View>
                            <View style={styles.certificationContainer}>
                                <View style={styles.labelContainer}>
                                    <Text style={styles.labelTextStyle}>Passport</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.iconContainer}
                                    onPress={() => this.chooseFile('passport')}>
                                    <Icon.Entypo
                                        name="attachment"
                                        size={THEME.ICON_SIZE}
                                        color={THEME.COLOR_WHITE} />
                                </TouchableOpacity>
                                {
                                    passportImage != '' ?
                                        <LightBox
                                            style={styles.imageContainer}
                                            renderContent={() => this.renderImage('passport')}  >
                                            <Image
                                                source={passportImage}
                                                resizeMode='cover'
                                                style={styles.imageStyle} />
                                        </LightBox>
                                        :
                                        null
                                }
                            </View>
                        </ScrollView>
                    </View>
                    <FooterButton title='Save & Continue' onPress={onNext} />
                </View>
            </>
        );
    }
}