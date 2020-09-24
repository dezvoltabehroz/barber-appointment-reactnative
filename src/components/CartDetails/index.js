

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
import { FloatingInput, Icon } from '..';
import THEME from '../../assets/styles/theme.style';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';


class CartDetail extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            services: [],
            isQtyFocus: false,
            qty: '',
            totalPrice: 0,
            totalTime: 0
        }
    }
    componentDidMount = () => {
        const { services } = this.props
        this.setState({ services })
    }

    handleTimeAndPrice = () => {
        this.props.addQuantity(this.state.services)
        let totalPrice = 0;
        let totalTime = 0;
        this.state.services.forEach(element => {
            if (element.quantity != '') {
                totalTime = totalTime + (element.serviceEstTime * element.quantity);
                totalPrice = totalPrice + (element.serviceCost * element.quantity);
                this.props.onChangePress();
            }

        })

        this.props.time(totalTime)
        this.props.price(totalPrice);
    }

    _renderItems = ({ index, item }) => {
        const { isQtyFocus, qty } = this.state;
        const { onChangePress } = this.props;
        return (
            <>
                <View style={styles.lineStyle}></View>
                <View style={styles.rowContainer}>
                    <View style={styles.columnChange}>
                        <Text style={styles.textStyle}>{item.serviceName}</Text>
                    </View>
                    <View style={styles.columnChange} >
                        {
                            item.quantity != "" ?
                                <Text style={styles.textStyle}>{item.quantity}</Text>
                                :
                                <View style={[styles.inputRowContainerStyle,
                                item.quantity != '' ? THEME.inputBorder : {}]}>
                                    <FloatingInput
                                        val={item.quantity}
                                        maxLength={2}
                                        keyboardtype={'number-pad'}
                                        onActive={() => this.setState({ isQtyFocus: true })}
                                        onInActive={() => this.setState({ isQtyFocus: false })}
                                        label='Qty' iconSmallInput updateText={(qty) => {
                                            this.state.services[index].quantity = `${qty}`;
                                            this.handleTimeAndPrice();
                                        }} />
                                </View>
                        }

                    </View>
                    <View style={styles.columnChange}>
                        <Text style={styles.textStyle}>{item.quantity != '' && item.quantity > 1 ? (item.serviceEstTime * item.quantity) : item.serviceEstTime}</Text>
                    </View>
                    <View style={styles.columnChange}>
                        <Text style={styles.textStyle}>${item.quantity != '' && item.quantity > 1 ? (item.serviceCost * item.quantity) : item.serviceCost}</Text>
                    </View>
                </View>
            </>)
    }

    render() {
        const { addresslocation, region } = this.props;
        return (
            <>
                <ScrollView>
                    <View style={styles.marginVertical}>
                        <View style={styles.generalMargin}>
                            <Text style={styles.colorTextStyle}>Cart Items</Text>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.rowContainer}>
                                <View style={styles.columnChange}>
                                    <Text style={styles.colorTextStyle}>Services</Text>
                                </View>
                                <View style={styles.columnChange}>
                                    <Text style={styles.colorTextStyle}>Qty</Text>
                                </View>
                                <View style={styles.columnChange}>
                                    <Text style={styles.colorTextStyle}>Time</Text>
                                </View>
                                <View style={styles.columnChange}>
                                    <Text style={styles.colorTextStyle}>Price</Text>
                                </View>
                            </View>
                            <View style={styles.rowStyle}>
                                <FlatList data={this.state.services}
                                    keyExtractor={item => item}
                                    ItemSeparatorComponent={this.renderSeparator}
                                    renderItem={({ index, item }) => this._renderItems({ index, item })} />
                            </View>
                        </View>
                    </View>
                    {/* <View style={styles.borderStyle}></View>
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
                    </View> */}
                </ScrollView>
            </>
        );
    }
};



export default CartDetail;
