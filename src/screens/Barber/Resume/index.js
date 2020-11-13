import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList, Alert, } from 'react-native';
import { FooterButton, Icon, Button } from '../../../components';
import styles from './style';
import ImagePicker from 'react-native-image-crop-picker';
import THEME from '../../../assets/styles/theme.style';
import LightBox from "react-native-lightbox";
import ImageView from 'react-native-image-view';
import { Barbers } from '../../../services';
import { connect } from 'react-redux'
class Resume extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resume: [],
            selectedArray: [],
            loading: false,
            selectActions: false,
            isImageViewVisible: false,
        }
    }

    componentDidMount = () => {
        this.setState({ loading: true });
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token
        }
        Barbers.getBarberAllResumes(userData)
            .then((res) => {
                if (res.data.status) {
                    let tempArr = [];
                    let arr = [...res.data.data];
                    tempArr = res.data.data;
                    arr.forEach((item, index) => {
                        arr[index].is_selected = false;
                    })
                    this.setState({ resume: arr, loading: false, selectActions: false, selectedArray: [] })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    takePics = () => {
        ImagePicker.openPicker({
            width: 200,
            height: 200, compressImageMaxHeight: 400,
            compressImageMaxWidth: 400, cropping: true, multiple: true
        })
            .then(response => {
                response.forEach((item) => {
                    let image = {
                        uri: `${item.path}`,
                    }
                })
                let userData = {
                    id: this.props.user.userData.id,
                    images: response
                }
                Barbers.uploadBarberResumes(userData)
                    .then((res) => {
                        if (res.data.status) {
                            this.componentDidMount();
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
    };

    renderImage = (image) => {
        return (
            <View>
                <Image style={styles.renderImageStyle}
                    resizeMode='contain'
                    source={{ uri: image.file_name }} />
            </View>

        )
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }
    handleSelection = (index) => {
        const { resume } = this.state;
        let delete_array = this.state.selectedArray;
        let items = [...resume];
        if (items[index].is_selected) {
            items[index] = { ...items[index], is_selected: false };
            delete_array.splice(items[index].id, 1);
            this.setState({ selectedArray: delete_array, resume: items })
        }
        else {
            items[index] = { ...items[index], is_selected: true };
            delete_array.push(items[index].id);
            this.setState({ selectedArray: delete_array, resume: items })
        }
    }
    _renderItems = (image, index) => {
        const { selectActions } = this.state;
        return (
            <>
                <View style={styles.gapHeight}></View>
                <TouchableOpacity onLongPress={() => this.setState({ selectActions: true })} style={{ marginHorizontal: 4 }} onPress={() => {
                    this.setState({ isImageViewVisible: true })
                    // http://docs.google.com/viewer?url=${image.file_name}&embedded=true
                    // https://docs.google.com/viewerng/viewer?url=https://fleek-dev.s3-accelerate.amazonaws.com/attachments/6ffee7b5bd11062cdfce33f4b475b670
                    // Linking.openURL(`${image.file_name}`);
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

    deleteResume = () => {
        Alert.alert('Attension', 'Are you sure you want to delete videos',
            [
                {
                    text: "Cancel",
                    onPress: () => this.handleCancel(),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.handleDeleteResume() }
            ],

        );

    }

    handleDeleteResume = () => {
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            attachment_id: this.state.selectedArray
        }
        Barbers.deleteSelectedResumes(userData)
            .then(res => {
                if (res.data.status) {
                    Alert.alert('Success', res.data.message);
                    this.componentDidMount()
                }
            })
            .catch(err => { console.log(err) })
    }

    handleCancel = () => {
        let resumeArray = [...this.state.resume];

        resumeArray.forEach((item) => {
            if (item.is_selected) {
                const index = resumeArray.indexOf(item);
                if (index > -1) {
                    resumeArray[index] = { ...resumeArray[index], is_selected: false }
                }
            }
        })
        this.setState({ selectActions: false, selectedArray: [], resume: resumeArray })
    }

    render() {
        const { onNext } = this.props;
        const { resume, selectedArray, loading, selectActions } = this.state;
        const imageURLs: Array<Object> = resume.map((img: Object, index: number) => ({
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
                                                <Text style={styles.labelTextStyle}>Upload Resume</Text>
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
                                            resume != null || resume[0] != 'undefined' ?
                                                <>
                                                    <FlatList
                                                        data={resume}
                                                        numColumns={3}
                                                        showsVerticalScrollIndicator={false}
                                                        contentContainerStyle={styles.contentContainer}
                                                        ItemSeparatorComponent={this._renderSeparator}
                                                        renderItem={({ item, index }) => this._renderItems(item, index)}
                                                        keyExtractor={item => item}
                                                        extraData={this.state.resume}
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
                                                    <Button disabled={selectedArray.length != 0 ? false : true} title="Delete  " onPress={this.deleteResume} />
                                                </View>
                                            </View>
                                            :
                                            <View style={styles.buttonContainer}>
                                                <Button disabled={selectedArray.length != 0 ? false : true} title="Delete" onPress={this.deleteResume} />
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

export default connect(mapStateToProps)(Resume)