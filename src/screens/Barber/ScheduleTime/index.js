import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Button, FloatingInput } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import DateTimePicker from '@react-native-community/datetimepicker';


export default class ScheduleTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDays: [],
            startTime: [], endTime: [], showStartTimePicker: false, showEndTimePicker: false, dateValue: new Date(),
            // isTime: false, val: ''
        }
    }

    componentDidMount = () => {
        if (this.props.data != []) {
            this.setState({ selectedDays: this.props.data })
            console.log(this.state.selectedDays);
        }

    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    _renderItems = ({ item, index }) => {
        const { startTime, endTime, showStartTimePicker, dateValue, showEndTimePicker } = this.state;
        return (
            <>
                <View style={styles.contentContainer}>
                    <View style={styles.headingContainer}>
                        <View style={styles.dayContainer}>
                            <Text style={styles.textStyle}>{item.day}</Text>
                        </View>
                        <View style={styles.startTimeContainer} >
                            {item.startTime != '' ?
                                <View style={styles.priceAndTimeContainer}>
                                    <Text style={styles.textStyle}>{item.startTime}</Text>
                                </View>
                                : null
                            }
                        </View>
                        <View style={styles.endTimeContainer}>
                            {item.endTime != '' ?
                                <View style={styles.priceAndTimeContainer}>
                                    <Text style={styles.textStyle}>{item.endTime}</Text>
                                </View>
                                : null
                            }
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        {item.startTime == '' ?
                            <>
                                <TouchableOpacity onPress={() => this.setState({ showStartTimePicker: true })}>
                                    <View style={[styles.dateContainer, showStartTimePicker || endTime[index] != '' ? {
                                        borderWidth: 2,
                                        borderColor: THEME.PRIMARY_COLOR,
                                    } : {}]}>
                                        <Text style={styles.dateTextStyle}>{startTime[index] && startTime[index] != "" ? startTime[index] : "Start Time"}</Text>
                                    </View>
                                </TouchableOpacity>
                                
                            </> : null}

                        {item.endTime == '' ?
                            <>
                                <TouchableOpacity onPress={() => this.setState({ showEndTimePicker: true })}>
                                    <View style={[styles.dateContainer, showEndTimePicker || endTime[index] != '' ? {
                                        borderWidth: 2,
                                        borderColor: THEME.PRIMARY_COLOR,
                                    } : {}]}>
                                        <Text style={styles.dateTextStyle}>{endTime[index] && endTime[index] != "" ? endTime[index] : "End Time"}</Text>
                                    </View>
                                </TouchableOpacity>

                            </> : null}
                    </View>
                    <View>
                        {showEndTimePicker ?
                            <DateTimePicker
                                value={dateValue}
                                mode={'time'}
                                textColor={THEME.COLOR_WHITE}
                                is24Hour={false}
                                display="spinner"
                                onChange={(event, selectedDate) => {
                                    var timeValue = selectedDate.getHours() < 10 ? ('0' + selectedDate.getHours()) : (selectedDate.getHours());
                                    timeValue += ":";
                                    timeValue += selectedDate.getMinutes() < 10 ? ('0' + selectedDate.getMinutes()) : (JSON.stringify(selectedDate.getMinutes()));
                                    this.setState({ showEndTimePicker: false });
                                    endTime[index] = timeValue;
                                    console.log(endTime[index])
                                    this.setState({ endTime });
                                    const objIndex = this.state.selectedDays.findIndex((obj => obj.id == item.id));
                                    let items = [...this.state.selectedDays];
                                    items[objIndex] = { ...items[objIndex], endTime: endTime[index] };
                                    this.setState({ selectedDays: items });
                                }}
                            />
                            : null}
                    </View>
                    <View>
                                    {showStartTimePicker ?
                                        <DateTimePicker
                                            value={dateValue}
                                            mode={'time'}
                                            textColor={THEME.COLOR_WHITE}
                                            is24Hour={false}
                                            display="spinner"
                                            onChange={(event, selectedDate) => {
                                                var timeValue = selectedDate.getHours() < 10 ? ('0' + selectedDate.getHours()) : (selectedDate.getHours());
                                                timeValue += ":";
                                                timeValue += selectedDate.getMinutes() < 10 ? ('0' + selectedDate.getMinutes()) : (JSON.stringify(selectedDate.getMinutes()));
                                                this.setState({ showStartTimePicker: false });
                                                startTime[index] = timeValue;
                                                console.log(startTime[index])
                                                this.setState({ startTime });
                                                const objIndex = this.state.selectedDays.findIndex((obj => obj.id == item.id));
                                                let items = [...this.state.selectedDays];
                                                items[objIndex] = { ...items[objIndex], startTime: startTime[index] };
                                                this.setState({ selectedDays: items });
                                            }}
                                        />
                                        : null}
                                </View>
                </View>
            </>
        )
    }



    render() {
        const { onNext, data } = this.props;
        const { selectedDays } = this.state;
        let emptyArray = [];
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
                        <View style={styles.seperatorStyle}></View>
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

            </>
        );
    }
}