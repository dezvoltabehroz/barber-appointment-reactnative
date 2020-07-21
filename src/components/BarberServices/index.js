import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from './style';
import { Icon } from '../../components'
import THEME from '../../assets/styles/theme.style';


export default class BarberServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedService: [],
            services: [
                {
                    id: 1,
                    serviceName: 'Hair Styling',
                    serviceCost: '$100',
                    serviceEstTime: '00:30',
                    selected: false,
                    description: 'All haircuts include eyebrows, nose, and ears groomed.'
                },
                {
                    id: 2,
                    serviceName: 'Hair Color',
                    serviceCost: '$50',
                    serviceEstTime: '00:45',
                    selected: false,
                    description: 'Any type of haircut + beard + eyebrows and nose and ears Groomed.'
                },
                {
                    id: 3,
                    serviceName: 'Shave',
                    serviceCost: '$50',
                    serviceEstTime: '00:30',
                    selected: false,
                    description: 'Includes whole head shaped up and back tapered, eyebrows, nose, ears groomed.'
                },
                {
                    id: 4,
                    serviceName: 'Blow Out',
                    serviceCost: '$50',
                    serviceEstTime: '00:20',
                    selected: false,
                    description: 'Any type of haircut + beard + eyebrows and nose and ears Groomed.'
                },
                {
                    id: 5,
                    serviceName: 'Hair Styling',
                    serviceCost: '$100',
                    serviceEstTime: '01:00',
                    selected: false,
                    description: 'Includes whole head shaped up and back tapered, eyebrows, nose, ears groomed.'
                },
                {
                    id: 6,
                    serviceName: 'Hair Color',
                    serviceCost: '$50',
                    serviceEstTime: '00:45',
                    selected: false,
                    description: 'Includes Chips or choice of Beverage'
                },
                {
                    id: 7,
                    serviceName: 'Shave',
                    serviceCost: '$50',
                    serviceEstTime: '00:30',
                    selected: false,
                    description: 'Any type of haircut + beard + eyebrows and nose and ears Groomed.'
                },
                {
                    id: 8,
                    serviceName: 'Blow Out',
                    serviceCost: '$50',
                    serviceEstTime: '00:20',
                    selected: false,
                    description: 'Includes Chips or choice of Beverage'
                }
            ]
        }
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }

    onPressCheckedItem = (val) => {
        const objIndex = this.state.services.findIndex((obj => obj.id == val.id));
        let items = [...this.state.services];
        if (items[objIndex].selected) {
            items[objIndex] = { ...items[objIndex], selected: false };
            this.setState({ services: items });
            if (!items[objIndex].selected) {
                this.setState({ selectedService: this.state.selectedService.filter(item => item.id != val.id) })
            }
        } else {
            items[objIndex] = { ...items[objIndex], selected: true };
            this.setState({ services: items });
            this.state.selectedService.push(items[objIndex]);
        }
    }


    _renderItems = (item) => {
        return (
            <>
                <View style={styles.contentContainer}>
                    <View style={styles.rowContainer}>
                        <View style={styles.checkBoxContainer}>
                            <TouchableOpacity onPress={() => this.onPressCheckedItem(item)} style={{ padding: '5%' }} >
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
                            <Text style={{ color: THEME.COLOR_WHITE, fontFamily: 'Poppins-Medium' }} >
                                {item.serviceName}
                            </Text>
                        </View>

                        <View style={styles.serviceEstTimeContainer}>
                            <Text style={{ color: THEME.COLOR_GREY, fontFamily: 'Poppins-Regular' }}>
                                {item.serviceEstTime[3]}{item.serviceEstTime[4]} minutes
                            </Text>
                        </View>
                        <View style={styles.serviceCostContainer}>
                            <Text style={{ color: THEME.PRIMARY_COLOR, fontFamily: 'Poppins-Medium' }}>
                                {item.serviceCost}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.lineStyle}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.descriptionContainer}>
                        <View style={styles.gapHeight}></View>
                        <Text style={{ fontSize: THEME.FONT_SIZE_SMALL, color: THEME.COLOR_GREY, fontFamily: 'Poppins-Regular' }}>{item.description}</Text>
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
                    renderItem={({ item, index }) => this._renderItems(item)}
                    keyExtractor={item => item} />
            </View>
        );
    }
}