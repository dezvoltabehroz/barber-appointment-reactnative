import React, { Component } from 'react';
import { View, Text, FlatList, } from 'react-native';
import { Button, FloatingInput, DateTimeModal, } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';


export default class PriceAndTime extends Component {

    constructor(props) {
        super(props);

        this.num2 = React.createRef();
        this.num3 = React.createRef();
        this.num4 = React.createRef();
        this.state = {
            selectedArray: [],
            price: [],
            time: [],
            showTimePicker: false,
            isTime: false,
            val: '',
            hours: '',
            minutes: '',
            indexValue: null,
            item: null,
        }
    }
    componentDidMount = () => {
        this.setState({ selectedArray: this.props.data })
    }


    setTime = (index, item) => {
        this.setState({ showTimePicker: true, indexValue: index, item: item })
    }
    handleMinutes = (val) => {
        if (val < 60) {
            this.setState({ minutes: val })
        }
        else {
            alert(`Invalid Minutes ${val} `)
        }
    }
    handleHours = (val) => {
        if (val <= 12) {
            this.setState({ hours: val })

        }
        else {
            alert(`Invalid Hours ${val} `)
        }

    }

    setTimeChange = (data) => {
        const { time, hours, minutes, indexValue, item } = this.state;
        // this.setState({ time[]: data })
        console.log(data);
        var timeValue = hours == '00' || hours == '' || hours == '0' ? '' : hours + ' hr ';
        timeValue += minutes == '' || minutes == '0' || minutes == '00' ? '' : minutes + " min"
        time[indexValue] = timeValue;
        const objIndex = this.state.selectedArray.findIndex((obj => obj.id == item.id));
        let items = [...this.state.selectedArray];
        items[objIndex] = { ...items[objIndex], time: time[indexValue] };
        this.setState({ showTimePicker: false, selectedArray: items, hours: '', minutes: '', indexValue: null, item: null });
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
        const { price, time, showTimePicker, } = this.state;
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
                                <View style={[styles.inputDateContainerStyle, time[index] == null ? {
                                    borderWidth: 2,
                                    borderColor: THEME.PRIMARY_COLOR,
                                } : {}]}>
                                    <FloatingInput
                                        val={time[index]}
                                        onActive={() => this.setTime(index, item)}
                                        label='Time' />
                                </View>
                            </> : null}
                    </View>


                </View>
            </>
        )
    }

    render() {
        const { onNext } = this.props;
        const { selectedArray, showTimePicker, hours, minutes, val } = this.state;

        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        {
                            selectedArray.length == 0 || selectedArray[0].price != '' || selectedArray[0].time != '' ?
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
                                </View> : null}
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
                <DateTimeModal showTimePicker={showTimePicker}
                    onCancel={() => this.setState({ showTimePicker: false })}
                    onSet={(time) => {console.log(time)}} />
            </>
        );
    }
}