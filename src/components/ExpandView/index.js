import React, { Component } from 'react';
import { View, Text, LayoutAnimation, UIManager, FlatList, TouchableOpacity } from 'react-native';
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
            isPorfolioImageViewVisible: false,
            portfolio: [],
            isCertificationPhotoNull: false,
            expandedCertificationPhoto: false,
            expandedWorkingDays: false,
            expandedServices: false,
            isWorkingDays: false,
            isServices: false,
            isImageViewVisible: false,
            certification: [],
            workingDays: [],
            services: []

        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    componentDidMount = () => {
        const { portfolio, certification, workingDay, service } = this.props;
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
        if (workingDay == null || workingDay.length == 0)
            this.setState({ isWorkingDays: true });
        else {
            this.setState({ isWorkingDays: false, workingDays: workingDay });
        }
        if (service == null || service.length == 0)
            this.setState({ isServices: true });
        else {
            this.setState({ isServices: false, services: service });
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

    changeWorkingDaysLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expandedWorkingDays: !this.state.expandedWorkingDays });
    }

    changeServiceLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expandedServices: !this.state.expandedServices });
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

    renderPortfolioImages = (images) => {
        return images.map((image) => {
            return <TouchableOpacity onPress={() =>
                this.setState({ isPorfolioImageViewVisible: true })
            }>
                <Image
                    source={image}
                    style={styles.postImage}
                    resizeMode='center'
                />
            </TouchableOpacity>
        })
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    _renderItems = ({ item, index }) => {
        return (
            <View style={styles.headingContainer}>
                <View style={styles.dayContainer}>
                    <Text style={styles.textStyle}>{item.day}</Text>
                </View>
                <View style={styles.startTimeContainer} >
                    <View style={styles.priceAndTimeContainer}>
                        <Text style={styles.textStyle}>{item.startTime}</Text>
                    </View>
                </View>
                <View style={styles.endTimeContainer}>
                    <View style={styles.priceAndTimeContainer}>
                        <Text style={styles.textStyle}>{item.endTime}</Text>
                    </View>
                </View>
            </View>
        )
    }

    _renderServicesItems = ({ item, index }) => {
        return (
            <View style={styles.headingContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.textStyle}>{item.serviceName}</Text>
                </View>
                <View style={styles.priceContainer} >
                    <Text style={styles.textStyle}>{item.serviceCost}</Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeTextStyle}>{item.serviceEstTime}</Text>
                </View>
            </View>
        )
    }


    render() {
        const { portfolio, certification, workingDays, services } = this.state;
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
                                        {this.renderPortfolioImages(images)}
                                    </View>
                                </View>
                                <ImageView
                                    images={imageURLs}
                                    imageIndex={0}
                                    isVisible={this.state.isPorfolioImageViewVisible}
                                    isSwipeCloseEnabled={true}
                                    onClose={() => { this.setState({ isPorfolioImageViewVisible: false }) }}
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
                <View style={styles.activities_container}>
                    <TouchableOpacity activeOpacity={0.8} onPress={this.changeWorkingDaysLayout}>
                        <View style={styles.country_container}>
                            <Text style={styles.text_panel_heading}>Working Days</Text>
                            {this.state.expandedWorkingDays &&
                                <Icon.AntDesign name="up" size={25} />
                            }
                            {!this.state.expandedWorkingDays &&
                                <Icon.AntDesign name="down" size={25} />
                            }
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.expandedWorkingDays ? null : 0, flexDirection: 'column', overflow: 'hidden' }}>
                        {this.state.isWorkingDays ?
                            <Text style={{ fontWeight: 'bold', marginHorizontal: 10 }} >No Record Found</Text>
                            :
                            <>
                                <View style={styles.headingContainer}>
                                    <View style={styles.dayContainer}>
                                        <Text style={styles.headingTextStyle}>Days</Text>
                                    </View>
                                    <View style={styles.startTimeContainer} >
                                        <Text style={styles.headingTextStyle}>Start Time</Text>
                                    </View>
                                    <View style={styles.endTimeContainer}>
                                        <Text style={styles.headingTextStyle}>End Time</Text>
                                    </View>
                                </View>
                                <FlatList
                                    data={workingDays}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={this._renderSeparator}
                                    renderItem={({ item, index }) => this._renderItems({ item, index })}
                                    keyExtractor={item => item} />
                            </>
                        }
                    </View>
                </View>
                <View style={styles.activities_container}>
                    <TouchableOpacity activeOpacity={0.8} onPress={this.changeServiceLayout}>
                        <View style={styles.country_container}>
                            <Text style={styles.text_panel_heading}>Services</Text>
                            {this.state.expandedServices &&
                                <Icon.AntDesign name="up" size={25} />
                            }
                            {!this.state.expandedServices &&
                                <Icon.AntDesign name="down" size={25} />
                            }
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: this.state.expandedServices ? null : 0, flexDirection: 'column', overflow: 'hidden' }}>
                        {this.state.isServices ?
                            <Text style={{ fontWeight: 'bold', marginHorizontal: 10 }} >No Record Found</Text>
                            :
                            <>
                                <View style={styles.headingContainer}>
                                    <View style={styles.dayContainer}>
                                        <Text style={styles.headingTextStyle}>Services</Text>
                                    </View>
                                    <View style={styles.startTimeContainer} >
                                        <Text style={styles.headingTextStyle}>Price</Text>
                                    </View>
                                    <View style={styles.endTimeContainer}>
                                        <Text style={styles.headingTextStyle}>Est.Time</Text>
                                    </View>
                                </View>
                                <FlatList
                                    data={services}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={this._renderSeparator}
                                    renderItem={({ item, index }) => this._renderServicesItems({ item, index })}
                                    keyExtractor={item => item} />
                            </>
                        }
                    </View>
                </View>
            </>
        );
    }
}