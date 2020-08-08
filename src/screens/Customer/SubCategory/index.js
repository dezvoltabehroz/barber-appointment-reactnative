import React, { Component } from 'react';
import { View, ImageBackground, FlatList, TouchableOpacity, Text } from "react-native";
import styles from './style';


export default class SubCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hairServices: []
        }
    }

    componentDidMount = () => {
        const { data } = this.props;
        this.setState({ hairServices: data })
    }
    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }


    _renderAppointmentItems = (item) => {
        const { onItemPress } = this.props;
        return (
            <>
                <TouchableOpacity onPress={()=>onItemPress(item.services,item.subCategoryName)} style={styles.lowerListItemContainer}>
                    <ImageBackground source={item.image}
                        style={styles.lowerListImageStyle} imageStyle={{ borderRadius: 10 }}>
                        <View style={styles.lowerListTitleContainer}>
                            <Text style={styles.lowerListTitleStyle} >{item.subCategoryName}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </>
        )
    }

    render() {
        const { hairServices } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.lowerListContainer}>
                    <FlatList
                        data={hairServices}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={this._renderSeparator}
                        renderItem={({ item }) => this._renderAppointmentItems(item)}
                        keyExtractor={item => item} />
                </View>
            </View>
        );
    }
}