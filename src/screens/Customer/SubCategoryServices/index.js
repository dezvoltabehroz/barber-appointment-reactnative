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
        let { onItemPress } = this.props;

        return (
            <TouchableOpacity onPress={onItemPress} style={styles.lowerListItemContainer}>
                <ImageBackground source={{ uri: item.serviceImage }}
                    style={styles.lowerListImageStyle} imageStyle={{ borderRadius: 10 }}>
                    <View style={styles.lowerListTitleContainer}>
                        <Text style={styles.lowerListTitleStyle}> {item.serviceName} </Text>
                        <Text style={styles.lowerListDescriptionStyle}>{item.serviceDescription}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    render() {
        const { services } = this.state;
        let { onItemPress } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.lowerListContainer}>
                    <FlatList
                        data={services}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={this._renderSeparator}
                        renderItem={({ item }) => this._renderItems(item)}
                        keyExtractor={item => item} />
                </View>
            </View>
        )
    }
}