import React, { Component } from 'react';
import { View, Text, FlatList, } from 'react-native';
import { Button, FloatingInput, DateTimeModal } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';

export default class ScheduleTime extends Component {

    constructor(props) {
        super(props);
        this.num2 = React.createRef();
        this.num3 = React.createRef();
        this.num4 = React.createRef();
        this.state = {
            selectedDays: [],
            startTime: [],
            endTime: [],
            showTimePicker: false,
            hours: '',
            minutes: '',
            indexValue: null,
            item: null,
            val: ''
        }
    }

    componentDidMount = () => {
        if (this.props.data != []) {
            this.setState({ selectedDays: this.props.data })
        }
    }

    setStartTime = (index, item) => {
        this.setState({ showTimePicker: true, indexValue: index, item: item, val: '1' })
    }

    setEndTime = (index, item) => {
        this.setState({ showTimePicker: true, indexValue: index, item: item, val: '2' })
    }

    setTimeChange = (data) => {
        const { val, startTime, endTime, indexValue, item } = this.state;
        if (val == '1') {
            startTime[indexValue] = data;
        }
        else {
            endTime[indexValue] = data;
        }
        const objIndex = this.state.selectedDays.findIndex((obj => obj.id == item.id));
        let items = [...this.state.selectedDays];
        if (val == '1') {
            items[objIndex] = { ...items[objIndex], startTime: startTime[indexValue] };
        }
        else {
            items[objIndex] = { ...items[objIndex], endTime: endTime[indexValue] };
        }
        this.setState({ showTimePicker: false, selectedDays: items, val: '', indexValue: null, item: null });
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    _renderItems = ({ item, index }) => {
        const { startTime, endTime } = this.state;
        return (
            <View style={styles.contentContainer}>
                <View style={styles.headingContainer}>
                    <View style={styles.dayContainer}>
                        <Text style={styles.textStyle}>{item.day}</Text>
                    </View>
                    <View style={styles.startTimeContainer} >
                        {
                            item.startTime != '' ?
                                <View style={styles.priceAndTimeContainer}>
                                    <Text style={styles.textStyle}>{item.startTime}</Text>
                                </View>
                                :
                                null
                        }
                    </View>
                    <View style={styles.endTimeContainer}>
                        {
                            item.endTime != '' ?
                                <View style={styles.priceAndTimeContainer}>
                                    <Text style={styles.textStyle}>{item.endTime}</Text>
                                </View>
                                :
                                null
                        }
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    {
                        item.startTime == '' ?
                            <View style={[styles.inputDateContainerStyle, startTime[index] == null && startTime[index] != '' ? { borderWidth: 2, borderColor: THEME.PRIMARY_COLOR } : {}]}>
                                <FloatingInput
                                    val={startTime[index]}
                                    onActive={() => this.setStartTime(index, item)}
                                    label='Start Time' />
                            </View>
                            :
                            null
                    }
                    {
                        item.endTime == '' ?
                            <View style={[styles.inputDateContainerStyle, endTime[index] == null && endTime[index] != '' ? { borderWidth: 2, borderColor: THEME.PRIMARY_COLOR } : {}]}>
                                <FloatingInput
                                    val={endTime[index]}
                                    onActive={() => this.setEndTime(index, item)}
                                    label='End Time' />
                            </View>
                            :
                            null
                    }
                </View>
            </View>
        )
    }



    render() {
        const { onNext } = this.props;
        const { selectedDays, showTimePicker, } = this.state;
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        {selectedDays.length == 0 || selectedDays[0].startTime != '' || selectedDays[0].endTime != '' ?
                            <View style={styles.headingContainer}>
                                <View style={styles.dayContainer}>
                                    <Text style={styles.headingTextStyle}>Days</Text>
                                </View>
                                <View style={styles.startTimeContainer} >
                                    <Text style={styles.headingTextStyle}>Start Time</Text>
                                </View>
                                <View style={styles.endTimeContainer}>
                                    <Text style={styles.headingTextStyle}>End Time</Text>
                                </View>
                            </View> : null}
                        <FlatList
                            data={selectedDays}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this._renderSeparator}
                            renderItem={({ item, index }) => this._renderItems({ item, index })}
                            keyExtractor={item => item} />
                    </View>
                    <View style={styles.footerStyle}>
                        <View style={styles.lineStyle}></View>
                        <View style={styles.gapHeight}></View>
                        <View style={styles.buttonContainer}>
                            <Button title='Next' onPress={onNext} />
                        </View>
                    </View>
                </View>
                <DateTimeModal showTimePicker={showTimePicker}
                    dayNight={true}
                    onCancel={() => this.setState({ showTimePicker: false })}
                    onSet={(time) => this.setTimeChange(time)} />
            </>
        );
    }
}