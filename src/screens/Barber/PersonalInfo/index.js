import React, { Component } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, ActivityIndicator, ScrollView, FlatList, } from 'react-native';
import { FooterButton, Button, Icon } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import ImageView from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { Barbers } from '../../../services';
import ImagePicker from 'react-native-image-crop-picker'
class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drivingLicense: [],
            passportImage: [],
            isImageViewVisible: false,
            isImageViewVisiblePassport: false,
            loading: false,
            selectedArray: [],
            selectActions: false
        }
    }

    componentDidMount = () => {
        this.setState({ loading: true });
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token
        }
        Barbers.getBarberAllPassportAndLicence(userData)
            .then((res) => {
                if (res.data.status) {
                    let arr = [...res.data.data];
                    let drivingLicenseArr = [];
                    let passportArr = []
                    let tempArr = res.data.data;
                    tempArr.forEach((item, index) => {
                        arr[index] = { ...arr[index], is_selected: false }
                        if (item.type == 'driving_license') {
                            drivingLicenseArr.push(arr[index])
                        }
                        else if (item.type == 'passport') {
                            passportArr.push(arr[index])
                        }
                    })
                    console.log('driving', drivingLicenseArr)
                    console.log('passport', passportArr)
                    this.setState({ drivingLicense: drivingLicenseArr, passportImage: passportArr, loading: false, selectActions: false, selectedArray: [] })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleSelection = (item, index) => {
        const { drivingLicense, passportImage } = this.state;
        let delete_array = this.state.selectedArray;
        if (item.type == 'passport') {
            let items = [...passportImage];
            if (items[index].is_selected) {
                items[index] = { ...items[index], is_selected: false };
                delete_array.splice(items[index].id, 1);
                this.setState({ selectedArray: delete_array, passportImage: items })
            }
            else {
                items[index] = { ...items[index], is_selected: true };
                delete_array.push(items[index].id);
                this.setState({ selectedArray: delete_array, passportImage: items })
            }
        }
        else {
            let items = [...drivingLicense];
            if (items[index].is_selected) {
                items[index] = { ...items[index], is_selected: false };
                delete_array.splice(items[index].id, 1);
                this.setState({ selectedArray: delete_array, drivingLicense: items })
            }
            else {
                items[index] = { ...items[index], is_selected: true };
                delete_array.push(items[index].id);
                this.setState({ selectedArray: delete_array, drivingLicense: items })
            }
        }

    }

    deletePassportAndLicence = () => {
        Alert.alert('Attension', 'Are you sure you want to delete videos',
            [
                {
                    text: "Cancel",
                    onPress: () => this.handleCancel(),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.handleDeletePassportAndLicence() }
            ],

        );

    }

    handleDeletePassportAndLicence = () => {
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            attachment_id: this.state.selectedArray
        }
        Barbers.deleteSelectedPassportAndLicence(userData)
            .then(res => {
                if (res.data.status) {
                    Alert.alert('Success', res.data.message);
                    this.componentDidMount()
                }
            })
            .catch(err => { console.log(err) })
    }

    handleCancel = () => {
        let passportArray = [...this.state.passportImage];
        let drivingLicenceArray = [...this.state.drivingLicense];
        passportArray.forEach((item) => {
            if (item.is_selected) {
                const index = passportArray.indexOf(item);
                if (index > -1) {
                    passportArray[index] = { ...passportArray[index], is_selected: false }
                }
            }
        })
        drivingLicenceArray.forEach((item) => {
            if (item.is_selected) {
                const index = drivingLicenceArray.indexOf(item);
                if (index > -1) {
                    drivingLicenceArray[index] = { ...drivingLicenceArray[index], is_selected: false }
                }
            }
        })
        this.setState({ selectActions: false, selectedArray: [], passportImage: passportArray, drivingLicense: drivingLicenceArray })
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    _renderItems = (image, index) => {
        const { selectActions } = this.state;
        return (
            <>
                <View style={styles.gapHeight}></View>
                <TouchableOpacity onLongPress={() => this.setState({ selectActions: true })} style={{ marginHorizontal: 4 }} onPress={() => {
                    this.setState({ isImageViewVisible: true })
                }}>
                    <Image source={{ uri: image.file_name }} resizeMode='cover' style={styles.imageStyle} />
                    {
                        selectActions ?
                            <TouchableOpacity style={{ position: 'absolute', flexDirection: "row", justifyContent: 'flex-end', marginRight: '5%', marginTop: '5%' }}
                                onPress={() => this.handleSelection(index)}>
                                <Icon.MaterialCommunityIcons
                                    name={image.is_selected == true ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                                    color={THEME.PRIMARY_COLOR} size={THEME.ICON_SIZE} />
                            </TouchableOpacity>
                            :
                            null
                    }
                </TouchableOpacity>
                <ImageView
                    // image
                    image={{ uri: image.file_name }}
                    imageIndex={0}
                    isVisible={this.state.isImageViewVisible}
                    isSwipeCloseEnabled={true}
                    onClose={() => { this.setState({ isImageViewVisible: false }) }}
                />
            </>
        )
    }

    _renderPassportItems = (image, index) => {
        const { selectActions } = this.state;
        console.log(image)
        return (
            <>
                <View style={styles.seperatorStyle}></View>
                <TouchableOpacity onLongPress={() => this.setState({ selectActions: true })} style={{ marginHorizontal: 4 }} onPress={() => {
                    this.setState({ isImageViewVisiblePassport: true })
                }}>
                    <Image source={{ uri: image.file_name }} resizeMode='cover' style={styles.imageStyle} />
                    {
                        selectActions ?
                            <TouchableOpacity style={{ position: 'absolute', flexDirection: "row", justifyContent: 'flex-end', marginRight: '5%', marginTop: '5%' }}
                                onPress={() => this.handleSelection(image, index)}>
                                <Icon.MaterialCommunityIcons
                                    name={image.is_selected == true ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                                    color={THEME.PRIMARY_COLOR} size={THEME.ICON_SIZE} />
                            </TouchableOpacity>
                            :
                            null
                    }
                </TouchableOpacity>
                <ImageView
                    // image
                    images={imageURLs}
                    imageIndex={0}
                    isVisible={this.state.isImageViewVisiblePassport}
                    isSwipeCloseEnabled={true}
                    onClose={() => { this.setState({ isImageViewVisiblePassport: false }) }}
                />
            </>
        )
    }

    takePics = (value) => {
        ImagePicker.openPicker({
            width: 200,
            height: 200, compressImageMaxHeight: 400,
            compressImageMaxWidth: 400, cropping: true, multiple: true
        })
            .then(response => {
                let userData = {
                    id: this.props.user.userData.id,
                    images: response
                }
                if (value == 'driver') {
                    Barbers.uploadBarberDrivingLicence(userData)
                        .then((res) => {
                            if (res.data.status) {
                                this.componentDidMount();
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                }
                else {
                    Barbers.uploadBarberPassport(userData)
                        .then((res) => {
                            if (res.data.status) {
                                this.componentDidMount();
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                }
            })
    };
    render() {
        const { onNext } = this.props;
        const { passportImage, drivingLicense, selectActions, loading, selectedArray } = this.state;
        const imageURLs: Array<Object> = drivingLicense.map((img: Object, index: number) => ({
            source: { uri: img.file_name },
            title: img + index,
            width: 806
        }))
        return (
            <>
                <View style={styles.container}>
                    {
                        loading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator />
                            </View>
                            :
                            <>
                                <View style={styles.upperContainer}>
                                    <ScrollView>
                                        <View style={styles.certificationContainer1}>
                                            <View style={styles.labelContainer}  >
                                                <Text style={styles.labelTextStyle}>Upload Driving License</Text>
                                            </View>
                                            <TouchableOpacity
                                                style={styles.iconContainer}
                                                onPress={() => this.takePics('driver')}>
                                                <Icon.Entypo
                                                    name="attachment"
                                                    size={THEME.ICON_SIZE}
                                                    color={THEME.COLOR_WHITE} />
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            drivingLicense != null ?
                                                <>
                                                    <View style={styles.contentContainerStyle}>
                                                        {
                                                            drivingLicense.map((image, index) => {
                                                                return (
                                                                    <>
                                                                        <View style={styles.seperatorStyle}></View>
                                                                        <TouchableOpacity onLongPress={() => this.setState({ selectActions: true })} style={{ marginHorizontal: 4, marginTop: 10 }} onPress={() => {
                                                                            this.setState({ isImageViewVisiblePassport: true })
                                                                        }}>
                                                                            <Image source={{ uri: image.file_name }} resizeMode='cover' style={styles.imageStyle} />
                                                                            {
                                                                                selectActions ?
                                                                                    <TouchableOpacity style={{ position: 'absolute', flexDirection: "row", justifyContent: 'flex-end', marginRight: '5%', marginTop: '5%' }}
                                                                                        onPress={() => this.handleSelection(image, index)}>
                                                                                        <Icon.MaterialCommunityIcons
                                                                                            name={image.is_selected == true ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                                                                                            color={THEME.PRIMARY_COLOR} size={THEME.ICON_SIZE} />
                                                                                    </TouchableOpacity>
                                                                                    :
                                                                                    null
                                                                            }
                                                                        </TouchableOpacity>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                </>
                                                :
                                                null
                                        }
                                        <View style={styles.certificationContainer1}>
                                            <View style={styles.labelContainer}  >
                                                <Text style={styles.labelTextStyle}>Upload Passport</Text>
                                            </View>
                                            <TouchableOpacity
                                                style={styles.iconContainer}
                                                onPress={() => this.takePics('passport')}>
                                                <Icon.Entypo
                                                    name="attachment"
                                                    size={THEME.ICON_SIZE}
                                                    color={THEME.COLOR_WHITE} />
                                            </TouchableOpacity>


                                        </View>
                                        {
                                            passportImage != null ?
                                                <>
                                                    <View style={styles.contentContainerStyle}>
                                                        {
                                                            passportImage.map((image, index) => {
                                                                return (
                                                                    <>
                                                                        <View style={styles.seperatorStyle}></View>
                                                                        <TouchableOpacity onLongPress={() => this.setState({ selectActions: true })} style={{ marginHorizontal: 4, marginTop: 10 }} onPress={() => {
                                                                            this.setState({ isImageViewVisiblePassport: true })
                                                                        }}>
                                                                            <Image source={{ uri: image.file_name }} resizeMode='cover' style={styles.imageStyle} />
                                                                            {
                                                                                selectActions ?
                                                                                    <TouchableOpacity style={{ position: 'absolute', flexDirection: "row", justifyContent: 'flex-end', marginRight: '5%', marginTop: '5%' }}
                                                                                        onPress={() => this.handleSelection(image, index)}>
                                                                                        <Icon.MaterialCommunityIcons
                                                                                            name={image.is_selected == true ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                                                                                            color={THEME.PRIMARY_COLOR} size={THEME.ICON_SIZE} />
                                                                                    </TouchableOpacity>
                                                                                    :
                                                                                    null
                                                                            }
                                                                        </TouchableOpacity>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                    {/* <ImageView
                                                        // image
                                                        images={imageURLs}
                                                        imageIndex={0}
                                                        isVisible={this.state.isImageViewVisiblePassport}
                                                        isSwipeCloseEnabled={true}
                                                        onClose={() => { this.setState({ isImageViewVisiblePassport: false }) }}
                                                    /> */}
                                                </>
                                                :
                                                null
                                        }
                                    </ScrollView>
                                </View>
                                <View style={{ flex: 0.2, justifyContent: "center" }}>
                                    {
                                        selectActions ?
                                            <View style={[styles.buttonContainer, { flexDirection: "row", justifyContent: 'space-between' }]}>
                                                <View style={{ flex: 0.45 }}>
                                                    <Button title="Cancel  " onPress={this.handleCancel} />
                                                </View>
                                                <View style={{ flex: 0.45 }}>
                                                    <Button disabled={selectedArray.length != 0 ? false : true} title="Delete  " onPress={this.deletePassportAndLicence} />
                                                </View>
                                            </View>
                                            :
                                            <View style={styles.buttonContainer}>
                                                <Button disabled={selectedArray.length != 0 ? false : true} title="Delete" onPress={this.deleteCertificates} />
                                            </View>
                                    }
                                </View>
                            </>
                    }
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

export default connect(mapStateToProps)(PersonalInfo)