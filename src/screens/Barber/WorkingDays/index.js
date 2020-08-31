import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity,Alert } from 'react-native';
import { FooterButton, Icon } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';


export default class WorkingDays extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDays: [],
            WorkingDays: [
                { id: 1, day: 'Monday', selected: false, startTime: '', endTime: '', isFilled: '' },
                { id: 2, day: 'Tuesday', selected: false, startTime: '', endTime: '', isFilled: '' },
                { id: 3, day: 'Wednesday', selected: false, startTime: '', endTime: '', isFilled: '' },
                { id: 4, day: 'Thursday', selected: false, startTime: '', endTime: '', isFilled: '' },
                { id: 5, day: 'Friday', selected: false, startTime: '', endTime: '', isFilled: '' },
                { id: 6, day: 'Saturday', selected: false, startTime: '', endTime: '', isFilled: '' },
                { id: 7, day: 'Sunday', selected: false, startTime: '', endTime: '', isFilled: '' },
            ],
        }
    }

    handleSelected = (val) => {
        const objIndex = this.state.WorkingDays.findIndex((obj => obj.id == val.id));
        let items = [...this.state.WorkingDays];
        if (items[objIndex].selected) {
            items[objIndex] = { ...items[objIndex], selected: false };
            this.setState({ WorkingDays: items });
            if (!items[objIndex].selected) {
                for (var i = 0; i < this.state.selectedDays.length; i++) {
                    if (!this.state.selectedDays[i].id) {
                        this.state.selectedDays.splice(i, 1);
                    }
                }
                this.setState({ selectedDays: this.state.selectedDays.filter(item => item.id != val.id) })
            }
        } else {
            for (var i = 0; i < this.state.selectedDays.length; i++) {
                if (!this.state.selectedDays[i].id) {
                    this.state.selectedDays.splice(i, 1);
                }
            }
            items[objIndex] = { ...items[objIndex], selected: true };
            this.setState({ WorkingDays: items });
            this.state.selectedDays.push(items[objIndex]);
        }
    }

    on_Next_press = () => {
        const { onNext } = this.props;
        let selectedArray = this.state.selectedDays;
        if (selectedArray.length == 0) {
            Alert.alert('Attention', 'Please select atleast one service')
        }
        else {
            if (selectedArray[selectedArray.length - 1].dayCounter == 0) {
                this.setState({ selectedDays: selectedArray })
                onNext(this.state.selectedDays)
            }
            else {
                selectedArray.push({ dayCounter: 0 })
                this.setState({ selectedDays: selectedArray })
                onNext(this.state.selectedDays)
            }
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
                        <Text style={styles.textStyle}>{item.day}</Text>
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
        const { WorkingDays } = this.state;
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <FlatList
                            data={WorkingDays}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this._renderSeparator}
                            renderItem={({ item }) => this._renderItems(item)}
                            keyExtractor={item => item} />
                    </View>
                    <FooterButton title='Next' onPress={this.on_Next_press} />
                </View>
            </>
        );
    }
}