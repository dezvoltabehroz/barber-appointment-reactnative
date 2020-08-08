import React, { Component } from 'react';
import { View, ImageBackground, FlatList, TouchableOpacity, Text } from "react-native";
import styles from './style';

export default class SubCategoryServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servcieTile: '',
            services: []
        }
    }
    componentDidMount = () => {
        const { data } = this.props;
        this.setState({ services: data })
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }

    _renderItems = (item) => {
        return (
            <TouchableOpacity onPress={() => { }} style={styles.lowerListItemContainer}>
                <View style={styles.lowerListTitleContainer}>
                    <Text style={styles.lowerListTitleStyle}>{item.serviceName}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { services } = this.state;
        let { onItemPress } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.lowerListContainer}>

                    <TouchableOpacity onPress={onItemPress} style={styles.lowerListItemContainer}>
                        <View style={styles.lowerListTitleContainer}>
                            <Text style={styles.lowerListTitleStyle}>Hair Style</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.seperatorHeightStyle}></View>
                    <TouchableOpacity onPress={onItemPress} style={styles.lowerListItemContainer}>
                        <ImageBackground source={require('../../../assets/images/Salon-Style.png')}
                            style={styles.lowerListImageStyle} imageStyle={{ borderRadius: 10 }}>
                            <View style={styles.lowerListTitleContainer}>
                                <Text style={styles.lowerListTitleStyle}>Hair Style</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={styles.seperatorHeightStyle}></View>
                    <TouchableOpacity onPress={onItemPress} style={styles.lowerListItemContainer}>
                        <View style={styles.lowerListTitleContainer}>
                            <Text style={styles.lowerListTitleStyle}>Hair Style</Text>
                            <Text style={styles.lowerListDescriptionStyle}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.. </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.seperatorHeightStyle}></View>
                    <TouchableOpacity onPress={onItemPress} style={styles.lowerListItemContainer}>
                        <ImageBackground source={require('../../../assets/images/Salon-Style.png')}
                            style={styles.lowerListImageStyle} imageStyle={{ borderRadius: 10 }}>
                            <View style={styles.lowerListTitleContainer}>
                                <Text style={styles.lowerListTitleStyle}>Hair Style</Text>
                                <Text style={styles.lowerListDescriptionStyle}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.. </Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>


                    {/* <FlatList
                        data={services}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={this._renderSeparator}
                        renderItem={({ item }) => this._renderItems(item)}
                        keyExtractor={item => item} /> */}
                </View>
            </View>
        )
    }
}