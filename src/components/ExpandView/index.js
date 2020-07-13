import React, { Component } from 'react';
import { View, Text, LayoutAnimation, UIManager, TouchableOpacity } from 'react-native';
import styles from './style';
import { Icon } from '../../components';
import ImageView from 'react-native-image-view';
import Image from 'react-native-fast-image';

export default class ExpandingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isImageViewVisible: false,
            isPhotoNull: false,
            expandedPhoto: false,
            isImageViewVisible: false,
            photos: [],

        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    componentDidMount = () => {
        const { portfolio } = this.props;
        let photosArray = [];
        if (portfolio == null && portfolio.length == 0)
            this.setState({ isPhotoNull: true });
        else {
            var data = JSON.stringify(portfolio)
            JSON.parse(data, (key, value) => {
                if (typeof (value) != "object") {
                    photosArray.push(value);
                }
            });
            this.setState({ isPhotoNull: false, photos: photosArray });
        }
    }
    
    changePhotoLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expandedPhoto: !this.state.expandedPhoto });
    }

    renderImages = (images) => {
        return images.map((image) => {
            return <TouchableOpacity onPress={() =>
                this.setState({ isImageViewVisible: true })
            }>
                <Image
                    source={image}
                    style={styles.postImage}
                    resizeMode='center'
                    onProgress={e => console.log(e.nativeEvent.loaded / e.nativeEvent.total)}
                />
            </TouchableOpacity>
        })
    }

    render() {
        const { photos } = this.state;

        const images: Array<Object> = photos.map((img: Object) => ({
            uri: img
        }))
        const imageURLs: Array<Object> = photos.map((img: Object, index: number) => ({
            source: {
                uri: img
            },
            title: img + index,
            width: 806
        }))


        return (
            <View style={styles.activities_container}>
                <TouchableOpacity activeOpacity={0.8} onPress={this.changePhotoLayout}>
                    <View style={styles.country_container}>
                        <Text style={styles.text_panel_heading}>Certification</Text>
                        {this.state.expandedPhoto &&
                            <Icon.AntDesign name="up" size={25} />
                        }
                        {!this.state.expandedPhoto &&
                            <Icon.AntDesign name="down" size={25} />
                        }
                    </View>
                </TouchableOpacity>
                <View style={{ height: this.state.expandedPhoto ? null : 0, flexDirection: 'column', overflow: 'hidden' }}>
                    {this.state.isPhotoNull ?
                        <Text style={{ fontWeight: 'bold', marginHorizontal: 10 }} >No Record Found</Text>
                        :
                        <>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.postImagesContainer}>
                                    {this.renderImages(images)}
                                </View>
                            </View>
                            <ImageView
                                images={imageURLs}
                                imageIndex={0}
                                isVisible={this.state.isImageViewVisible}
                                isSwipeCloseEnabled={true}
                                onClose={() => { this.setState({ isImageViewVisible: false }) }}
                            />
                        </>
                    }
                </View>
            </View>
        );
    }
}