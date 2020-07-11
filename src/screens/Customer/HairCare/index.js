import React, { Component } from 'react';
import { View, ImageBackground, FlatList, TouchableOpacity, Text } from "react-native";
import styles from './style';


export default class HairCare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hairServices: [
                {
                    name: 'Hair Wash',
                    image: 'https://i.insider.com/57581624dd08957c538b4b21?width=1100&format=jpeg&auto=webp'
                },
                {
                    name: 'Hair Color',
                    image: 'https://www.makeup.com/-/media/project/loreal/brand-sites/mdc/americas/us/articles/2019/12-december/30-dye-hair-at-home/how-to-at-home-hair-dye-hero-mudc-123019.jpg?w=600&h=450&blr=False&hash=874572AB3BFFBF4EF5162D34D58F0F5C'
                },
                {
                    name: 'Hair Straightening',
                    image: 'https://i.ndtvimg.com/i/2016-11/hair-straightening_620x350_41479295261.jpg'
                },
                {
                    name: 'Hair Cutting',
                    image: 'https://www.angelbeautysalonlv.com/wp-content/uploads/2018/01/Women-Hair-Cuts-1000x658.jpg'
                },
                {
                    name: 'Hair Styling',
                    image: 'https://d3e5kk0afz85hq.cloudfront.net/278138-preview.jpg'
                },
                {
                    name: 'Hair Cutting',
                    image: 'https://www.angelbeautysalonlv.com/wp-content/uploads/2018/01/Women-Hair-Cuts-1000x658.jpg'
                },
                {
                    name: 'Hair Wash',
                    image: 'https://i.insider.com/57581624dd08957c538b4b21?width=1100&format=jpeg&auto=webp'
                },
                {
                    name: 'Hair Color',
                    image: 'https://www.makeup.com/-/media/project/loreal/brand-sites/mdc/americas/us/articles/2019/12-december/30-dye-hair-at-home/how-to-at-home-hair-dye-hero-mudc-123019.jpg?w=600&h=450&blr=False&hash=874572AB3BFFBF4EF5162D34D58F0F5C'
                },
            ]
        }
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
             <TouchableOpacity onPress={onItemPress} style={styles.lowerListItemContainer}>
                    <ImageBackground source={{ uri: `${item.image}` }}
                        style={styles.lowerListImageStyle} imageStyle={{ borderRadius: 10 }}>
                        <View style={styles.lowerListTitleContainer}>
                            <Text style={styles.lowerListTitleStyle} >{item.name}</Text>
                            <View style={styles.line}></View>
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