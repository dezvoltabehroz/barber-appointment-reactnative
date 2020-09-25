

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
import style from '../Button/style';


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
        this.setState({ services });
        const notEqual = (currentValue) => currentValue.quantity != '';
        const data = this.state.services.every(notEqual)
        console.log(data)
        this.props.isDisable(data);
    }

    handleTimeAndPrice = () => {
        const { totalPrice, totalTime } = this.state;
        let price = totalPrice;
        let time = totalTime;
        this.state.services.forEach(element => {
            if (element.quantity != '') {
                price = (price + (element.serviceCost * element.quantity))
                time = (time + (element.serviceEstTime * element.quantity))
                const notEqual = (currentValue) => currentValue.quantity != '';
                const data = this.state.services.every(notEqual)
                console.log(data)
                this.props.isDisable(data);
            }
        })
        this.props.time(time)
        this.props.price(price);
        this.props.addQuantity(this.state.services)

    }

    on_Press_Edit = (index) => {
        let selectedArray = [...this.state.services];
        this.props.isDisable(false);
        let item = { ...selectedArray[index], quantity: '', };
        selectedArray[index] = item;
        this.setState({ services: selectedArray });
    }

    _renderItems = ({ index, item }) => {
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
                    <View style={styles.column} >
                        {item.quantity != '' ?
                            <TouchableOpacity onPress={() => this.on_Press_Edit(index)}>
                                <Icon.FontAwesome name='edit' color={THEME.COLOR_WHITE} size={20} />
                            </TouchableOpacity>
                            : null}
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
                                <View style={styles.column}></View>
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
