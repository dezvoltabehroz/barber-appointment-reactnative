import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { Button, Icon } from '../../../components'
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import ImagePicker from 'react-native-image-picker';
import LightBox from "react-native-lightbox";

export default class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioImagesArray: []
        }
    }

    chooseFile = () => {
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
                let tempArray = this.state.portfolioImagesArray;
                tempArray.push(source);
                this.setState({ portfolioImagesArray: tempArray })

            }
        });
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
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }} onPress={this.chooseFile}>
                        <Text style={styles.uploadImagesTextStyle}>Upload Portfolio</Text>
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
                <View style={styles.footerStyle}>
                    <View style={styles.lineStyle}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.buttonContainer}>
                        <Button title='Save & Continue' onPress={onNext} />
                    </View>
                </View>
            </View>

        );
    }
}