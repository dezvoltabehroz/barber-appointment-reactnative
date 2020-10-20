

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
import styles from './style';
import moment from 'moment';

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
                    <View style={styles.columnChange}>
                        <Text style={styles.textStyle}>{item.service_name} {item.quantity == '1' ? '' : `(${item.quantity})`}</Text>
                    </View>
                    <View style={styles.column} >
                        <Text style={styles.textStyle}>{moment.duration(item.time_duration).asMinutes()}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.textStyle}>${item.price}</Text>
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
                                <View style={styles.columnChange}>
                                    <Text style={styles.colorTextStyle}>Title</Text>
                                </View>
                                <View style={styles.column}>
                                    <Text style={styles.colorTextStyle}>Time</Text>
                                </View>
                                <View style={styles.column}>
                                    <Text style={styles.colorTextStyle}>price</Text>
                                </View>
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
                            <View style={styles.addressRowContainer}>
                                <View>
                                    <Text style={styles.colorTextStyle}>Address: </Text>
                                </View>
                                <View style={styles.textFlex}>
                                    <Text style={styles.textStyle}> {addresslocation}</Text>
                                </View>
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
                                    <Text style={styles.textStyle}>{this.props.bookingTime}</Text>
                                </View>
                            </View>
                            <View style={styles.lineStyle}></View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.colorTextStyle}>Date: </Text>
                                <View style={styles.textFlex}>
                                    <Text style={styles.textStyle}>{this.props.bookingDate}</Text>
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
