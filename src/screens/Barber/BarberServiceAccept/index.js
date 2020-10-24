import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { SearchandMapView, Icon } from '../../../components';
import { Linking, Platform } from 'react-native';
import THEME from '../../../assets/styles/theme.style';

export default class BarberServiceAccept extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '03001234567',
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.9922,
                longitudeDelta: 0.9421,
            }
        }
    }

    componentWillMount = () => {
        const { item } = this.props;
        this.setState({ region: item });
    }

    openGps = (lat, lng) => {
        var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
        var url = scheme + `${lat},${lng}`;
        Linking.openURL(url);
    }



    on_Phone = () => {
        const { data } = this.state;
        let number = ''
        number = 'tel:' + data;
        Linking.openURL(number);
    }

    render() {
        let { arrivedAtlocation, onChat } = this.props;
        const { region } = this.state;
        const location = `${region.latitude},${region.longitude}`;
        const url = Platform.select({
            ios: `maps:${location}`,
            android: `geo:${location}?center=${location}&q=${location}&z=16`,
        });
        // const url = Platform.select({
        //     ios: `maps:0,0?q=${region.latitude},${region.longitude}`,
        //     android: `geo:0,0?q=${region.latitude},${region.longitude}`,
        // })
        // const urlGG = `https://google.com/maps/place/${region.latitude},${region.longitude}`
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.8 }}>
                    <View>
                        <TouchableOpacity onPress={() => Linking.openURL(url)}>
                            <Text style={styles.getDirectionText}>Get Direction</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <SearchandMapView accept region={(region)} />
                    </View>
                </View>
                <View style={styles.footerStyle}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={arrivedAtlocation} style={styles.customerLocationContainer}>
                            <Text style={styles.buttonText}>Arrived</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <TouchableOpacity onPress={onChat}>
                                <Icon.MaterialCommunityIcons name='chat' color={THEME.COLOR_WHITE} size={THEME.ICON_SIZE} />
                            </TouchableOpacity>
                            <View style={{ width: 20 }}></View>
                            <TouchableOpacity onPress={this.on_Phone}>
                                <Icon.MaterialCommunityIcons name='phone' color={THEME.COLOR_WHITE} size={THEME.ICON_SIZE} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}