import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Button, Icon } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';


export default class Services extends Component {

    constructor(props) {
        super(props);
        this.state = {
            val: false,
            selectedService: [],
            barberServices: [
                { id: 1, serviceName: 'Hair Cuttuing', selected: false, price: '', time: '' },
                { id: 2, serviceName: 'Hair Trimming', selected: false, price: '', time: '' },
                { id: 3, serviceName: 'Blowout', selected: false, price: '', time: '' },
                { id: 4, serviceName: 'Hair Color', selected: false, price: '', time: '' },
                { id: 5, serviceName: 'Double process hair color', selected: false, price: '', time: '' },
                { id: 6, serviceName: 'Shave', selected: false, price: '', time: '' },
                { id: 7, serviceName: 'Beard Trim', selected: false, price: '', time: '' },
                { id: 8, serviceName: 'Braids & Twist', selected: false, price: '', time: '' },
                { id: 9, serviceName: 'Hair color touch ups', selected: false, price: '', time: '' },
                { id: 10, serviceName: 'Scalp Conditioning Treatment', selected: false, price: '', time: '' },
                { id: 11, serviceName: 'Permanent Hair Retexturizing', selected: false, price: '', time: '' }
            ],
        }
    }

    handleSelected = (val) => {
        const objIndex = this.state.barberServices.findIndex((obj => obj.id == val.id));
        let items = [...this.state.barberServices];
        if (items[objIndex].selected) {
            items[objIndex] = { ...items[objIndex], selected: false };
            this.setState({ barberServices: items });
            if (!items[objIndex].selected) {
                this.setState({ selectedService: this.state.selectedService.filter(item => item.id != val.id) })
            }
        } else {
            items[objIndex] = { ...items[objIndex], selected: true };
            this.setState({ barberServices: items });
            this.state.selectedService.push(items[objIndex]);
        }
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    _renderItems = (item) => {
        return (
            <>
                <View style={styles.contentContainer}>
                    <View style={styles.nameContainer}>
                        <View style={{ marginHorizontal: 8 }}>
                            <Text style={styles.idTextLabel}>{item.id}.</Text>
                        </View>
                        <View>
                            <Text style={styles.textStyle}>{item.serviceName}</Text>
                        </View>
                    </View>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => this.handleSelected(item)}>
                            <Icon.MaterialCommunityIcons
                                name={item.selected == true ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                                color={THEME.COLOR_WHITE} size={THEME.ICON_SIZE} />
                        </TouchableOpacity>
                    </View>


                </View>
            </>
        )
    }



    render() {
        const { onNext } = this.props;
        const { barberServices } = this.state;
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <FlatList
                            data={barberServices}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this._renderSeparator}
                            renderItem={({ item }) => this._renderItems(item)}
                            keyExtractor={item => item} />
                    </View>
                    <View style={styles.footerStyle}>
                        <View style={styles.lineStyle}></View>
                        <View style={styles.gapHeight}></View>
                        <View style={styles.buttonContainer}>
                            <Button title='Next' onPress={() => onNext(this.state.selectedService)} />
                        </View>
                    </View>
                </View>

            </>
        );
    }
}