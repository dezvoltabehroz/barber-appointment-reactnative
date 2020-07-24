

import React, { Component } from 'react';
import {
    View,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    Modal,
    FlatList
} from 'react-native';
import styles from './style'
import { Icon } from '..';
import THEME from '../../assets/styles/theme.style';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';


class Summary extends Component {
    constructor(prop) {
        super(prop);

    }

    _renderItems = ({ index, item }) => {
        const { onChangePress } = this.props;
        return (
            <>
                <View style={styles.lineStyle}></View>
                <View style={styles.rowContainer}>
                    <View style={styles.column}>
                        <Text style={styles.textStyle}>{item.serviceName}</Text>
                    </View>
                    <View style={styles.columnChange} >
                        <Text style={styles.textStyle}>{item.serviceEstTime}</Text>
                    </View>
                    <View style={styles.columnChange}>
                        <Text style={styles.textStyle}>${item.serviceCost}</Text>
                    </View>
                    <View style={styles.columnChange}>
                        <TouchableOpacity onPress={onChangePress} style={styles.row}>
                            <Text style={styles.colorTextStyle}>Change</Text>
                            <Icon.AntDesign name="right" size={15} color={THEME.COLOR_GREY} />
                        </TouchableOpacity>
                    </View>
                </View>
            </>)
    }

    render() {
        const { services, addresslocation, region } = this.props;
        return (
            <>
                <ScrollView>
                    <View style={styles.marginVertical}>
                        <View style={styles.generalMargin}>
                            <Text style={styles.colorTextStyle}>Services</Text>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.rowContainer}>
                                <View style={styles.column}>
                                    <Text style={styles.colorTextStyle}>Title</Text>
                                </View>
                                <View style={styles.columnChange}>
                                    <Text style={styles.colorTextStyle}>Time</Text>
                                </View>
                                <View style={styles.columnChange}>
                                    <Text style={styles.colorTextStyle}>price</Text>
                                </View>
                                <View style={styles.columnChange}></View>
                            </View>
                            <View style={styles.rowStyle}>
                                <FlatList data={services}
                                    keyExtractor={item => item}
                                    ItemSeparatorComponent={this.renderSeparator}
                                    renderItem={({ index, item }) => this._renderItems({ index, item })} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.borderStyle}></View>
                    <View style={styles.marginVertical}>
                        <View style={styles.generalMargin}>
                            <Text style={styles.colorTextStyle}>Location</Text>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.rowContainer}>
                                <View>
                                    <Text style={styles.colorTextStyle}>Address: </Text>
                                </View>
                                <View style={styles.textFlex}>
                                    <Text style={styles.textStyle}> {addresslocation}</Text>
                                </View>
                            </View>
                            <View style={styles.lineStyle}></View>
                            <View style={{ marginBottom: "1%" }}>
                                <MapView
                                    provider={PROVIDER_GOOGLE}
                                    showsUserLocation={true}
                                    loadingEnabled
                                    showsMyLocationButton={true}
                                    style={styles.mapStyle}
                                    customMapStyle={THEME.mapStyle}
                                    region={region}
                                // onRegionChangeComplete={this.onRegionChange}
                                // onRegionChange={onRegionChange}
                                //onPanDrag={onPanDrag}
                                // onMapReady={() => this.setState({ marginBottom: 1 })}
                                >
                                    <Marker.Animated
                                        ref={marker => {
                                            this.marker = marker;
                                        }}
                                        coordinate={new AnimatedRegion({
                                            latitude: region.latitude,
                                            longitude: region.longitude,
                                            latitudeDelta: region.latitudeDelta,
                                            longitudeDelta: region.longitudeDelta,
                                        })}
                                    ></Marker.Animated>
                                </MapView>
                            </View>
                        </View>
                    </View>
                    <View style={styles.borderStyle}></View>
                    <View style={styles.marginVertical}>
                        <View style={styles.generalMargin}>
                            <Text style={styles.colorTextStyle}>Booking</Text>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.rowContainer}>
                                <Text style={styles.colorTextStyle}>Time: </Text>
                                <View style={styles.textFlex}>
                                    <Text style={styles.textStyle}> 10:00 AM - 11:45 PM</Text>
                                </View>
                            </View>
                            <View style={styles.lineStyle}></View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.colorTextStyle}>Date: </Text>
                                <View style={styles.textFlex}>
                                    <Text style={styles.textStyle}> 23 Jul, 2020</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </>
        );
    }
};



export default Summary;
