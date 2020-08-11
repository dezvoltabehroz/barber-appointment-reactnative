import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
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
                this.setState({ selectedDays: this.state.selectedDays.filter(item => item.id != val.id) })
            }
        } else {
            items[objIndex] = { ...items[objIndex], selected: true };
            this.setState({ WorkingDays: items });
            this.state.selectedDays.push(items[objIndex]);
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
                    <FooterButton title='Next' onPress={() => onNext(this.state.selectedDays)} />
                </View>
            </>
        );
    }
}