import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from './style';
import { Icon } from '..';
import THEME from '../../assets/styles/theme.style';
import moment from 'moment';
import { Barbers } from '../../services';
export default class BarberServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedService: [],
            disabled: true,
            totalPrice: 0,
            totalTime: 0,
            services: []
        }
    }

    componentDidMount = () => {
        Barbers.getBarberServices(this.props.userdata)
            .then((response) => {
                if (response.data.status) {
                    let array = [...response.data.barber_services_list]
                    array.map((element, index) => {
                        array[index] = { ...element, selected: false, quantity: '' }
                    })
                    this.setState({ services: array })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }

    onPressCheckedItem = async (val) => {
        const { totalPrice, totalTime } = this.state;
        let price = totalPrice;
        let time = totalTime;
        const objIndex = this.state.services.findIndex((obj => obj.id == val.id));
        let items = [...this.state.services];
        if (items[objIndex].selected) {
            items[objIndex] = { ...items[objIndex], selected: false };
            await this.setState({ services: items });
            this.setState({ selectedService: this.state.selectedService.filter(item => item.id != val.id) }, () => {
                price = (price - parseInt(val.price))
                time = (time - parseInt(moment.duration(val.time_duration).asMinutes()))
             
                this.props.time(time);
                this.props.price(price);
                if (this.state.selectedService.length === 0) {
                    this.props.isDisable("true")
                }
                this.setState({ totalPrice: price, totalTime: time })
            })

        }
        else {
            items[objIndex] = { ...items[objIndex], selected: true };
            await this.setState({ services: items });
            this.state.selectedService.push(items[objIndex]);
            price = (price + parseInt(val.price))
            time = (time + parseInt(moment.duration(val.time_duration).asMinutes()))
            this.props.time(time);
            this.props.price(price);
            this.props.isDisable("false")
            this.setState({ totalPrice: price, totalTime: time });
        }
        this.props.markedServices(this.state.services);
    }


    _renderItems = ({ item, index }) => {

        return (
            <>
                <View style={styles.contentContainer}>
                    <View style={styles.rowContainer}>
                        <View style={styles.checkBoxContainer}>
                            <TouchableOpacity onPress={() => this.onPressCheckedItem(item)}
                                style={{ padding: '5%' }} >
                                {
                                    item.selected == true ?
                                        <Icon.MaterialIcons
                                            name='check-box'
                                            color={THEME.PRIMARY_COLOR}
                                            size={THEME.ICON_SIZE} />
                                        :
                                        <Icon.MaterialIcons
                                            size={THEME.ICON_SIZE}
                                            name='check-box-outline-blank'
                                            color={THEME.COLOR_GREY} />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.serviceNameContainer}>
                            <Text style={styles.textWhite} >
                                {item.service_name}
                            </Text>
                        </View>

                        <View style={styles.serviceEstTimeContainer}>
                            <Text style={styles.textGrey}>
                                {item.time_duration ? `${moment.duration(item.time_duration).asMinutes()} minutes` : ''}
                            </Text>
                        </View>
                        <View style={styles.serviceCostContainer}>
                            <Text style={styles.coloredText}>
                                ${item.price}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.lineStyle}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.descriptionContainer}>
                        <View style={styles.gapHeight}></View>
                        <Text style={styles.descriptionText}>{item.service_description ? item.service_description : ''}</Text>
                    </View>
                    <View style={styles.gapHeight}></View>
                </View>
            </>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.services}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={this._renderSeparator}
                    renderItem={({ item, index }) => this._renderItems({ item, index })}
                    keyExtractor={item => item} />
            </View>
        );
    }
}