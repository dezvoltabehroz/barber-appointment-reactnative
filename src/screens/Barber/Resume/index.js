import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, } from 'react-native';
import { Button, Icon } from '../../../components';
import styles from './style';
import ImagePicker from 'react-native-image-picker';
import THEME from '../../../assets/styles/theme.style';
import LightBox from "react-native-lightbox";
let tempArr = [];
export default class Resume extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageCertification: [],
            drivingLicense: '',
            imageSource: '',
            passportImage: '',
            nationalIdImage: '',
            cv: '',
            isVisible: false,
            isEmployerFocus: false,
            employerName: '',
            isStartDate: false,
            startDate: '',
            isEndDate: false,
            endDate: '',
            showDatePicker: false,
            showEndDatePicker: false,
            dateValue: new Date(),
            employmentHistory: [],
            modalView: false,

        }
    }


    renderImage = (value) => {
        const {
            imageCertification,
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

    takePics = () => {

        ImageCropPicker.openPicker({
            width: 200,
            height: 200, compressImageMaxHeight: 400,
            compressImageMaxWidth: 400, cropping: true, multiple: true
        })
            .then(response => {
                let tempArray = []

                response.forEach((item) => {
                    let image = {
                        uri: item.path,
                    }
                    tempArray.push(image)
                    this.setState({ imageCertification: tempArray, modalView: false })
                })
            })
    };

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
                <LightBox renderContent={() => this.renderImages(image)}  >
                    <Image source={image} resizeMode='cover' style={styles.imageStyle} />
                </LightBox>
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
        const { imageCertification,
            drivingLicense,
            passportImage,
            nationalIdImage,
            cv } = this.state;
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <View>
                                <View style={styles.certificationContainer1}>
                                    <View style={styles.labelContainer}  >
                                        <Text style={styles.labelTextStyle}>Certification</Text>
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
                                {imageCertification != null || imageCertification[0] != 'undefined' ?
                                    <FlatList
                                        data={imageCertification}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        ItemSeparatorComponent={this._renderSeparator}
                                        renderItem={({ item }) => this._renderItems(item)}
                                        keyExtractor={item => item}
                                        extraData={this.state.imageCertification}
                                    />
                                    : null}
                            </View>

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
                                {drivingLicense != '' ?
                                    <LightBox
                                        style={styles.imageContainer}
                                        renderContent={() => this.renderImage('driver')}  >
                                        <Image
                                            source={drivingLicense}
                                            resizeMode='cover'
                                            style={styles.imageStyle} />
                                    </LightBox>
                                    : null}
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
                                {passportImage != '' ?
                                    <LightBox
                                        style={styles.imageContainer}
                                        renderContent={() => this.renderImage('passport')}  >
                                        <Image
                                            source={passportImage}
                                            resizeMode='cover'
                                            style={styles.imageStyle} />
                                    </LightBox>
                                    : null}
                            </View>
                            <View style={styles.certificationContainer}>
                                <View style={styles.labelContainer} >
                                    <Text style={styles.labelTextStyle}>National Identification No:</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.iconContainer}
                                    onPress={() => this.chooseFile('nic')}>
                                    <Icon.Entypo
                                        name="attachment"
                                        size={THEME.ICON_SIZE}
                                        color={THEME.COLOR_WHITE} />
                                </TouchableOpacity>
                                {nationalIdImage != '' ?
                                    <LightBox
                                        style={styles.imageContainer}
                                        renderContent={() => this.renderImage('nic')}  >
                                        <Image
                                            source={nationalIdImage}
                                            resizeMode='cover'
                                            style={styles.imageStyle} />
                                    </LightBox>
                                    : null}
                            </View>
                            <View style={styles.certificationContainer}>
                                <View style={styles.labelContainer} >
                                    <Text style={styles.labelTextStyle}>Upload CV/Resume</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.iconContainer}
                                    onPress={() => this.chooseFile('cv')}>
                                    <Icon.Entypo
                                        name="attachment"
                                        size={THEME.ICON_SIZE}
                                        color={THEME.COLOR_WHITE} />
                                </TouchableOpacity>
                                {cv != '' ?
                                    <LightBox
                                        style={styles.imageContainer}
                                        renderContent={() => this.renderImage('cv')}  >
                                        <Image
                                            source={cv}
                                            resizeMode='cover'
                                            style={styles.imageStyle} />
                                    </LightBox>
                                    : null}
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
            </>
        );
    }
}