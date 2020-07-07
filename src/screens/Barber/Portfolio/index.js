import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { Button, Icon } from '../../../components'
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import ImagePicker from 'react-native-image-crop-picker';
import LightBox from "react-native-lightbox";

export default class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioImagesArray: []
        }
    }

    takePics = () => {
        ImagePicker.openPicker({
            width: 200,
            height: 200, compressImageMaxHeight: 400,
            compressImageMaxWidth: 400, cropping: true, multiple: true
        })
            .then(response => {
                let tempArray = []
                // console.log("responseimage-------" + response)
                // this.setState({ ImageSource: response })
                // console.log("responseimagearray" + this.state.ImageSource)
                response.forEach((item) => {
                    let image = {
                        uri: item.path,
                    }
                    // console.log("imagpath==========" + image)
                    tempArray.push(image)
                    this.setState({ portfolioImagesArray: tempArray })
                    // console.log("imagpath==========" + image)
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
                <LightBox renderContent={() => this.renderImage(image)}  >
                    <Image source={image} resizeMode='cover' style={styles.imageStyle} />
                </LightBox>
            </>
        )
    }

    render() {
        const { onNext } = this.props;
        const { portfolioImagesArray } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }} onPress={this.takePics}>
                        <Text style={styles.uploadImagesTextStyle}>Upload Images</Text>
                        <Icon.Entypo name='attachment' size={THEME.ICON_SIZE} color={THEME.COLOR_WHITE} style={{ marginHorizontal: 5 }} />
                    </TouchableOpacity>
                    {portfolioImagesArray !== null ?
                        <FlatList
                            data={portfolioImagesArray}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this._renderSeparator}
                            renderItem={({ item }) => this._renderItems(item)}
                            keyExtractor={item => item}
                        /> : null}
                </View>
                <View style={styles.footerContainer}>
                    <View style={styles.lineStyle}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.buttonContainer}>
                        <Button title='Next' onPress={onNext} />
                    </View>
                </View>
            </View>

        );
    }
}