import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Button, Icon, FloatingInput } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import DateTimePicker from '@react-native-community/datetimepicker';


export default class PriceAndTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedArray: [],
            price: [], time: [], showTimePicker: false, dateValue: new Date(),
            isTime: false, val: ''
        }
    }
    componentDidMount = () => {
        this.setState({ selectedArray: this.props.data })
    }
    addPrice = ({ index, item }) => {
        const { price, val } = this.state;
        const priceValue = val;
        price[index] = `$${priceValue}`;
        const objIndex = this.state.selectedArray.findIndex((obj => obj.id == item.id));
        let items = [...this.state.selectedArray];
        items[objIndex] = { ...items[objIndex], price: price[index] };
        this.setState({ selectedArray: items });
        this.setState({ price });

    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    _renderItems = ({ item, index }) => {
        const { price, time, showTimePicker, dateValue } = this.state;
        return (
            <>
                <View style={styles.contentContainer}>

                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.textStyle}>{item.serviceName}</Text>
                        </View>
                        <View style={styles.priceContainer} >
                            {item.price != '' ?
                                <View style={styles.priceAndTimeContainer}>
                                    <Text style={styles.textStyle}>{item.price}</Text>
                                </View>
                                : null
                            }
                        </View>
                        <View style={styles.timeContainer}>
                            {item.time != '' ?
                                <View style={styles.priceAndTimeContainer}>
                                    <Text style={styles.timeTextStyle}>{item.time}</Text>
                                </View>
                                : null
                            }
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        {item.price == '' ?
                            <View style={[styles.inputContainerStyle, price[index] == null ? {
                                borderWidth: 2,
                                borderColor: THEME.PRIMARY_COLOR,
                            } : {}]}>
                                <FloatingInput
                                    val={price[index]}
                                    keyboardtype="number-pad"
                                    onInActive={() => this.addPrice({ item, index })}
                                    label='Price' updateText={(val) => this.setState({ val })} />
                            </View> : null}
                        {item.time == '' ?
                            <>
                                <View style={[styles.inputDateContainerStyle, time[index] == null && time[index] != '' ? {
                                    borderWidth: 2,
                                    borderColor: THEME.PRIMARY_COLOR,
                                } : {}]}>
                                    <FloatingInput
                                        val={time[index]}
                                        onActive={() => this.setState({ showTimePicker: true })}
                                        label='Time' />
                                    <View>
                                        {showTimePicker ?
                                            <DateTimePicker
                                                value={dateValue}
                                                mode={'time'}
                                                is24Hour={true}
                                                textColor={THEME.COLOR_WHITE}
                                                display="spinner"
                                                onChange={(event, selectedDate) => {
                                                    var timeValue = selectedDate.getHours() < 10 ? ('0' + selectedDate.getHours()) : (selectedDate.getHours());
                                                    timeValue += ":";
                                                    timeValue += selectedDate.getMinutes() < 10 ? ('0' + selectedDate.getMinutes()) : (JSON.stringify(selectedDate.getMinutes()));
                                                    this.setState({ showTimePicker: false });
                                                    time[index] = timeValue;
                                                    console.log(time[index])
                                                    this.setState({ time });
                                                    const objIndex = this.state.selectedArray.findIndex((obj => obj.id == item.id));
                                                    let items = [...this.state.selectedArray];
                                                    items[objIndex] = { ...items[objIndex], time: time[index] };
                                                    this.setState({ selectedArray: items });
                                                }}
                                            />
                                            : null}
                                    </View>

                                </View>
                            </> : null}


                    </View>


                </View>
            </>
        )
    }



    render() {
        const { onNext } = this.props;
        const { selectedArray } = this.state;
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <View style={styles.headingContainer}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.headingTextStyle}>Services</Text>
                            </View>
                            <View style={styles.priceContainer} >
                                <Text style={styles.headingTextStyle}>Price</Text>
                            </View>
                            <View style={styles.timeContainer}>
                                <Text style={styles.headingTextStyle}>Est.Time</Text>
                            </View>

                        </View>
                        <FlatList
                            data={selectedArray}
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