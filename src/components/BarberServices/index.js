import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from './style';
import { Icon } from '..';
import THEME from '../../assets/styles/theme.style';

export default class BarberServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedService: [],
            disabled: true,
            totalPrice: 0,
            totalTime: 0,
            services: [
                {
                    id: 1,
                    serviceName: 'Hair Styling',
                    serviceCost: 100,
                    serviceEstTime: 30,
                    selected: false,
                    description: 'All haircuts include eyebrows, nose, and ears groomed.'
                },
                {
                    id: 2,
                    serviceName: 'Hair Color',
                    serviceCost: 50,
                    serviceEstTime: 45,
                    selected: false,
                    description: 'Any type of haircut + beard + eyebrows and nose and ears Groomed.'
                },
                {
                    id: 3,
                    serviceName: 'Shave',
                    serviceCost: 50,
                    serviceEstTime: 30,
                    selected: false,
                    description: 'Includes whole head shaped up and back tapered, eyebrows, nose, ears groomed.'
                },
                {
                    id: 4,
                    serviceName: 'Blow Out',
                    serviceCost: 50,
                    serviceEstTime: 20,
                    selected: false,
                    description: 'Any type of haircut + beard + eyebrows and nose and ears Groomed.'
                },
                {
                    id: 5,
                    serviceName: 'Hair Styling',
                    serviceCost: 100,
                    serviceEstTime: 60,
                    selected: false,
                    description: 'Includes whole head shaped up and back tapered, eyebrows, nose, ears groomed.'
                },
                {
                    id: 6,
                    serviceName: 'Hair Color',
                    serviceCost: 50,
                    serviceEstTime: 45,
                    selected: false,
                    description: 'Includes Chips or choice of Beverage'
                },
                {
                    id: 7,
                    serviceName: 'Shave',
                    serviceCost: 50,
                    serviceEstTime: 30,
                    selected: false,
                    description: 'Any type of haircut + beard + eyebrows and nose and ears Groomed.'
                },
                {
                    id: 8,
                    serviceName: 'Blow Out',
                    serviceCost: 50,
                    serviceEstTime: 20,
                    selected: false,
                    description: 'Includes Chips or choice of Beverage'
                }
            ]
        }
    }

    componentDidMount = () => {
        this.setState({ selectedService: this.props.customerSelectedServices });
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }

    onPressCheckedItem = (val) => {
        const { totalPrice, totalTime } = this.state;
        let price = totalPrice;
        let time = totalTime;
        const objIndex = this.state.services.findIndex((obj => obj.id == val.id));
        let items = [...this.state.services];
        if (items[objIndex].selected) {
            items[objIndex] = { ...items[objIndex], selected: false };
            this.setState({ services: items });
            this.setState({ selectedService: this.state.selectedService.filter(item => item.id != val.id) }, () => {
                price = (price - val.serviceCost)
                time = (time - val.serviceEstTime)
                console.log(time);
                this.props.time(time);
                this.props.price(price);
                if (this.state.selectedService.length === 0) {
                    this.props.isDisable("true")
                    this.props.markedServices(this.state.selectedService);
                }
                this.setState({ totalPrice: price, totalTime: time })
            })
        }
        else {
            items[objIndex] = { ...items[objIndex], selected: true };
            this.setState({ services: items });
            this.state.selectedService.push(items[objIndex]);
            price = (price + val.serviceCost)
            time = (time + val.serviceEstTime)
            this.props.time(time);
            console.log(time);
            this.props.price(price);
            this.props.isDisable("false")
            this.props.markedServices(this.state.selectedService);
            this.setState({ totalPrice: price, totalTime: time });
        }
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
                                {item.serviceName}
                            </Text>
                        </View>

                        <View style={styles.serviceEstTimeContainer}>
                            <Text style={styles.textGrey}>
                                {item.serviceEstTime} minutes
                            </Text>
                        </View>
                        <View style={styles.serviceCostContainer}>
                            <Text style={styles.coloredText}>
                                ${item.serviceCost}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.lineStyle}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.descriptionContainer}>
                        <View style={styles.gapHeight}></View>
                        <Text style={styles.descriptionText}>{item.description}</Text>
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