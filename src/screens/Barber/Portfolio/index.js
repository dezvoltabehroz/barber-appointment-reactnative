import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, ActivityIndicator, Linking, Alert } from 'react-native';
import { FooterButton, Icon, Button } from '../../../components'
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import ImagePicker from 'react-native-image-crop-picker';
import Image from 'react-native-fast-image';
import ImageView from 'react-native-image-view';
import { Barbers } from '../../../services';
import { connect } from 'react-redux';
class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioImagesArray: [],
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
        Barbers.getBarberAllPortfolio(userData)
            .then((res) => {
                if (res.data.status) {
                    let arr = [...res.data.data];
                    arr.forEach((item, index) => {
                        arr[index].is_selected = false;
                    })
                    this.setState({ portfolioImagesArray: arr, loading: false, selectActions: false, selectedArray: [] })
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
                this.setState({ loading: true })
                let userData = {
                    id: this.props.user.userData.id,
                    images: response
                }
                Barbers.uploadBarberPortfolio(userData)
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
        const { portfolioImagesArray } = this.state;
        let delete_array = this.state.selectedArray;
        let items = [...portfolioImagesArray];
        if (items[index].is_selected) {
            items[index] = { ...items[index], is_selected: false };
            delete_array.splice(items[index].id, 1);
            this.setState({ selectedArray: delete_array, portfolioImagesArray: items })
        }
        else {
            items[index] = { ...items[index], is_selected: true };
            delete_array.push(items[index].id);
            this.setState({ selectedArray: delete_array, portfolioImagesArray: items })
        }
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

    deletePortfolios = () => {
        Alert.alert('Attension', 'Are you sure you want to delete portfolios',
            [
                {
                    text: "Cancel",
                    onPress: () => this.handleCancel(),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.handleDeletePortfolios() }
            ],

        );

    }

    handleDeletePortfolios = () => {
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            attachment_id: this.state.selectedArray
        }
        Barbers.deleteSelectedPortfolio(userData)
            .then(res => {
                if (res.data.status) {
                    Alert.alert('Success', res.data.message);
                    this.componentDidMount()
                }
            })
            .catch(err => { console.log(err) })
    }

    handleCancel = () => {
        let portfolioArray = [...this.state.portfolioImagesArray];

        portfolioArray.forEach((item) => {
            if (item.is_selected) {
                const index = portfolioArray.indexOf(item);
                if (index > -1) {
                    portfolioArray[index] = { ...portfolioArray[index], is_selected: false }
                }
            }
        })
        this.setState({ selectActions: false, selectedArray: [], portfolioImagesArray: portfolioArray })
    }

    render() {
        const { onNext } = this.props;
        const { portfolioImagesArray, imagestoUpload, loading, selectedArray, selectActions } = this.state;
        const imageURLs: Array<Object> = portfolioImagesArray.map((img: Object, index: number) => ({
            source: { uri: img.file_name },
            title: img + index,
            width: 806
        }))
        return (
            <View style={styles.container}>
                {
                    loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator />
                        </View>
                        :
                        <>
                            <View style={{ flex: selectActions ? 0.8 : 1 }}>
                                <View style={styles.certificationContainer1}>
                                    <View style={styles.labelContainer}  >
                                        <Text style={styles.labelTextStyle}>Upload Portfolio</Text>
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
                                    portfolioImagesArray !== null ?
                                        <>
                                            <FlatList
                                                data={portfolioImagesArray}
                                                numColumns={3}
                                                showsVerticalScrollIndicator={false}
                                                contentContainerStyle={styles.contentContainerStyle}
                                                ItemSeparatorComponent={this._renderSeparator}
                                                renderItem={({ item, index }) => this._renderItems(item, index)}
                                                keyExtractor={item => item}
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
                            {
                                selectActions ?
                                    <View style={{ flex: 0.2, justifyContent: "center" }}>
                                        <View style={[styles.buttonContainer, { flexDirection: "row", justifyContent: 'space-between' }]}>
                                            <View style={{ flex: 0.45 }}>
                                                <Button title="Cancel  " onPress={this.handleCancel} />
                                            </View>
                                            <View style={{ flex: 0.45 }}>
                                                <Button disabled={selectedArray.length != 0 ? false : true} title="Delete  " onPress={this.deletePortfolios} />
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    null
                            }
                        </>
                }
            </View>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(Portfolio)