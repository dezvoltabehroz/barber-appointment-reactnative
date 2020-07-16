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
            isPhotoNull: false,
            expandedPhoto: false,
            isImageViewVisible: false,
            portfolio: [],
            isCertificationPhotoNull: false,
            expandedCertificationPhoto: false,
            isImageViewVisible: false,
            certification: [],

        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    componentDidMount = () => {
        const { portfolio, certification } = this.props;
        let portfolioArray = [];
        if (portfolio == null || portfolio.length == 0)
            this.setState({ isPhotoNull: true });
        else {
            var data = JSON.stringify(portfolio)
            JSON.parse(data, (key, value) => {
                if (typeof (value) != "object") {
                    portfolioArray.push(value);
                }
            });
            this.setState({ isPhotoNull: false, portfolio: portfolioArray });
        }
        let certificationArray = [];
        if (certification == null || certification.length == 0)
            this.setState({ isCertificationPhotoNull: true });
        else {
            var data = JSON.stringify(certification)
            JSON.parse(data, (key, value) => {
                if (typeof (value) != "object") {
                    certificationArray.push(value);
                }
            });
            this.setState({ isCertificationPhotoNull: false, certification: certificationArray });
        }
    }

    changePhotoLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expandedPhoto: !this.state.expandedPhoto });
    }
    changeCertificationLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expandedCertificationPhoto: !this.state.expandedCertificationPhoto });
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
                />
            </TouchableOpacity>
        })
    }

    render() {
        const { portfolio, certification } = this.state;
        const images: Array<Object> = portfolio.map((img: Object) => ({
            uri: img
        }))
        const imageURLs: Array<Object> = portfolio.map((img: Object, index: number) => ({
            source: {
                uri: img
            },
            title: img + index,
            width: 806
        }))
        const imagesCertification: Array<Object> = certification.map((img: Object) => ({
            uri: img
        }))
        const imageURLCertification: Array<Object> = certification.map((img: Object, index: number) => ({
            source: {
                uri: img
            },
            title: img + index,
            width: 806
        }))

        return (
            <>
                <View style={styles.activities_container}>
                    <TouchableOpacity activeOpacity={0.8} onPress={this.changePhotoLayout}>
                        <View style={styles.country_container}>
                            <Text style={styles.text_panel_heading}>Portfolio</Text>
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
                <View style={styles.activities_container}>
                    <TouchableOpacity activeOpacity={0.8} onPress={this.changeCertificationLayout}>
                        <View style={styles.country_container}>
                            <Text style={styles.text_panel_heading}>Certification</Text>
                            {this.state.expandedCertificationPhoto &&
                                <Icon.AntDesign name="up" size={25} />
                            }
                            {!this.state.expandedCertificationPhoto &&
                                <Icon.AntDesign name="down" size={25} />
                            }
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.expandedCertificationPhoto ? null : 0, flexDirection: 'column', overflow: 'hidden' }}>
                        {this.state.isCertificationPhotoNull ?
                            <Text style={{ fontWeight: 'bold', marginHorizontal: 10 }} >No Record Found</Text>
                            :
                            <>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={styles.postImagesContainer}>
                                        {this.renderImages(imagesCertification)}
                                    </View>
                                </View>
                                <ImageView
                                    images={imageURLCertification}
                                    imageIndex={0}
                                    isVisible={this.state.isImageViewVisible}
                                    isSwipeCloseEnabled={true}
                                    onClose={() => { this.setState({ isImageViewVisible: false }) }}
                                />
                            </>
                        }
                    </View>
                </View>
            </>
        );
    }
}