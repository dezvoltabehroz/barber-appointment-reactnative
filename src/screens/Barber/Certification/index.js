import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Linking, Alert, } from 'react-native';
import { Button, Icon } from '../../../components';
import styles from './style';
import Image from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import THEME from '../../../assets/styles/theme.style';
import LightBox from "react-native-lightbox";
import ImageView from 'react-native-image-view';
import { connect } from 'react-redux';
import { Barbers } from '../../../services';
class Certification extends Component {

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
        Barbers.getBarberAllCertificates(userData)
            .then((res) => {
                if (res.data.status) {
                    let tempArr = [];
                    let arr = [...res.data.data];
                    tempArr = res.data.data;
                    tempArr.forEach((item, index) => {
                        arr[index].is_selected = false;
                    })
                    this.setState({ imageCertification: arr, loading: false, selectActions: false, selectedArray: [] })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    renderImages = (image) => {
        return (
            <Image style={styles.renderImageStyle}
                resizeMode='contain'
                source={image.file_name} />
        )
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
            </>
        )
    }

    takePics = () => {
        ImagePicker.openPicker({
            width: 200,
            height: 200, compressImageMaxHeight: 400,
            compressImageMaxWidth: 400, cropping: true, multiple: true
        })
            .then(response => {
                this.setState({ loading: true })
                let userData = {
                    id: this.props.user.userData.id,
                    images: response
                }
                Barbers.uploadBarberCertificates(userData)
                    .then((res) => {
                        if (res.data.status) { this.componentDidMount(); }
                    })
                    .catch((err) => { console.log(err) })
            })
    };

    handleSelection = (index) => {
        const { imageCertification } = this.state;
        let delete_array = this.state.selectedArray;
        let items = [...imageCertification];
        if (items[index].is_selected) {
            items[index] = { ...items[index], is_selected: false };
            delete_array.splice(items[index].id, 1);

            this.setState({ selectedArray: delete_array, imageCertification: items })
        }
        else {
            items[index] = { ...items[index], is_selected: true };
            delete_array.push(items[index].id);
            this.setState({ selectedArray: delete_array, imageCertification: items })
        }
    }

    deleteCertificates = () => {
        Alert.alert('Attension', 'Are you sure you want to delete videos',
            [
                {
                    text: "Cancel",
                    onPress: () => this.handleCancel(),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.handleDeleteImages() }
            ],

        );

    }

    handleDeleteImages = () => {
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            attachment_id: this.state.selectedArray
        }
        Barbers.deleteSelectedCertificates(userData)
            .then(res => {
                if (res.data.status) {
                    Alert.alert('Success', res.data.message);
                    this.componentDidMount()
                }
            })
            .catch(err => { console.log(err) })
    }

    handleCancel = () => {
        let certificateArray = [...this.state.imageCertification];

        certificateArray.forEach((item) => {
            if (item.is_selected) {
                const index = certificateArray.indexOf(item);
                if (index > -1) {
                    certificateArray[index] = { ...certificateArray[index], is_selected: false }
                }
            }
        })
        this.setState({ selectActions: false, selectedArray: [], imageCertification: certificateArray })
    }

    render() {
        const { onNext } = this.props;
        const { imageCertification, selectedArray, loading, selectActions } = this.state;
        const imageURLs: Array<Object> = imageCertification.map((img: Object, index: number) => ({
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
                                    <View>
                                        <View style={styles.certificationContainer1}>
                                            <View style={styles.labelContainer}  >
                                                <Text style={styles.labelTextStyle}>Upload Certification</Text>
                                            </View>


                                            <TouchableOpacity
                                                style={styles.iconContainer}
                                                onPress={() => this.takePics()}>
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
                                                        numColumns={3}
                                                        showsVerticalScrollIndicator={false}
                                                        contentContainerStyle={styles.contentContainer}
                                                        ItemSeparatorComponent={this._renderSeparator}
                                                        renderItem={({ item, index }) => this._renderItems(item, index)}
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
                                    </View>
                                </View>
                                <View style={{ flex: 0.2, justifyContent: "center" }}>
                                    {
                                        selectActions ?
                                            <View style={[styles.buttonContainer, { flexDirection: "row", justifyContent: 'space-between' }]}>
                                                <View style={{ flex: 0.45 }}>
                                                    <Button title="Cancel  " onPress={this.handleCancel} />
                                                </View>
                                                <View style={{ flex: 0.45 }}>
                                                    <Button disabled={selectedArray.length != 0 ? false : true} title="Delete  " onPress={this.deleteCertificates} />
                                                </View>
                                            </View>
                                            :
                                            <View style={styles.buttonContainer}>
                                                <Button disabled={selectedArray.length != 0 ? false : true} title="Delete" onPress={this.deleteCertificates} />
                                            </View>}
                                </View>
                            </>}
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

export default connect(mapStateToProps)(Certification)