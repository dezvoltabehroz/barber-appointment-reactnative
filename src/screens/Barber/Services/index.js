import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Button, Icon } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import { FA5Style } from 'react-native-vector-icons/FontAwesome5';


export default class Services extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedService: [],
            barberServices: [
                { id: 1, serviceName: 'Hair Cuttuing', selected: false },
                { id: 2, serviceName: 'Hair Trimming', selected: false },
                { id: 3, serviceName: 'Blowout', selected: false },
                { id: 4, serviceName: 'Hair Color', selected: false },
                { id: 5, serviceName: 'Double process hair color', selected: false },
                { id: 6, serviceName: 'Shave', selected: false },
                { id: 7, serviceName: 'Beard Trim', selected: false },
                { id: 8, serviceName: 'Braids & Twist', selected: false },
                { id: 9, serviceName: 'Hair color touch ups', selected: false },
                { id: 10, serviceName: 'Scalp Conditioning Treatment', selected: false },
                { id: 11, serviceName: 'Permanent Hair Retexturizing', selected: false }
            ],
        }
    }

    handleSelected = (val) => {

        const objIndex = this.state.barberServices.findIndex((obj => obj.id == val.id));
        let items = [...this.state.barberServices];
        items[objIndex] = { ...items[objIndex], selected: true };
        this.setState({ barberServices: items });
        this.state.selectedService.push(items[objIndex]);
        console.log(JSON.stringify(this.state.selectedService))


    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    _renderItems = (item) => {
        return (
            <>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', flex: 0.8 }}>
                        <View style={{ marginHorizontal: 8 }}>
                            <Text style={styles.idTextLabel}>{item.id}.</Text>
                        </View>
                        <View>
                            <Text style={styles.textStyle}>{item.serviceName}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.2, justifyContent: "center", alignItems: 'flex-end' }}>
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
                    <View style={styles.footerContainer}>
                        <View style={styles.lineStyle}></View>
                        <View style={styles.gapHeight}></View>
                        <View style={styles.buttonContainer}>
                            <Button title='Next' onPress={onNext} />
                        </View>
                    </View>
                </View>

            </>
        );
    }
}