import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform } from 'react-native';
import { FooterButton, Icon } from '../../../components'
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import ImagePicker from 'react-native-image-crop-picker';
import Image from 'react-native-fast-image';
import ImageView from 'react-native-image-view';

export default class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioImagesArray: [],
            isImageViewVisible: false,
            imagestoUpload: []
        }
    }

    takePics = () => {
        ImagePicker.openPicker({
            width: 200,
            height: 200, compressImageMaxHeight: 400,
            compressImageMaxWidth: 400, cropping: true, multiple: true
        })
            .then(response => {
                let tempArray = this.state.portfolioImagesArray;
                let uploadingArray = [];
                response.forEach((item) => {
                    let image = {
                        uri: `${item.path}`,
                    }
                    tempArray.push(image)
                    uploadingArray.push(item)
                    this.setState({ portfolioImagesArray: tempArray, imagestoUpload: uploadingArray })
                })
            })
    };

    renderImage = (image) => {
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

    render() {
        const { onNext } = this.props;
        const { portfolioImagesArray, imagestoUpload } = this.state;
        const imageURLs: Array<Object> = portfolioImagesArray.map((img: Object, index: number) => ({
            source: { uri: img.uri },
            title: img + index,
            width: 806
        }))
        return (
            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <TouchableOpacity style={styles.rowContainer} onPress={this.takePics}>
                        <Text style={styles.uploadImagesTextStyle}>Upload Portfolio</Text>
                        <Icon.Entypo name='attachment' size={THEME.ICON_SIZE} color={THEME.COLOR_WHITE} style={{ marginHorizontal: 5 }} />
                    </TouchableOpacity>
                    {
                        portfolioImagesArray !== null ?
                            <>
                                <FlatList
                                    data={portfolioImagesArray}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={this._renderSeparator}
                                    renderItem={({ item }) => this._renderItems(item)}
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
                <FooterButton title='Save & Continue' onPress={() => onNext(imagestoUpload)} />
            </View>

        );
    }
}