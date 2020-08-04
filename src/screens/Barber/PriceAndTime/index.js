import React, { Component } from 'react';
import { View, Text, FlatList, } from 'react-native';
import { FooterButton, FloatingInput, DateTimeModal, } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import { TouchableOpacity } from 'react-native-gesture-handler';


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


    setTimeChange = (data) => {
        const { time, indexValue, item } = this.state;
        time[indexValue] = data;
        const objIndex = this.state.selectedArray.findIndex((obj => obj.id == item.id));
        let items = [...this.state.selectedArray];
        items[objIndex] = { ...items[objIndex], time: time[indexValue] };
        this.setState({ showTimePicker: false, selectedArray: items, indexValue: null, item: null });
    }


    addPrice = ({ index, item }) => {
        const { price, val } = this.state;
        const priceValue = val;
        price[index] = `$${priceValue}`;
        const objIndex = this.state.selectedArray.findIndex((obj => obj.id == item.id));
        let items = [...this.state.selectedArray];
        items[objIndex] = { ...items[objIndex], price: price[index] };
        this.setState({ selectedArray: items });
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    _renderItems = ({ item, index }) => {
        const { price, time } = this.state;
        return (
            <View style={styles.contentContainer}>
                <View style={styles.row}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.textStyle}>{item.serviceName}</Text>
                    </View>
                    <View style={styles.priceContainer} >
                        {item.price != '' ?
                            <View style={styles.priceAndTimeContainer}>
                                <Text style={styles.timeTextStyle}>{item.price}</Text>
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
                        <View style={[styles.inputContainerStyle,
                        price[index] == null ? THEME.inputBorder : {}]}>
                            <FloatingInput
                                val={price[index]}
                                keyboardtype="number-pad"
                                onInActive={() => this.addPrice({ item, index })}
                                label='Price' updateText={(val) => this.setState({ val })} />
                        </View>
                        :
                        null
                    }
                    {item.time == '' ?
                        <>
                            <TouchableOpacity onPress={() => this.setTime(index, item)} style={[styles.inputDateContainerStyle,
                            time[index] == null ? THEME.inputBorder : {}]}>
                                <Text style={styles.titleStyle}>Time</Text>
                            </TouchableOpacity>
                        </> : null}
                </View>
            </View>
        )
    }

    render() {
        const { onNext } = this.props;
        const { selectedArray, showTimePicker } = this.state;

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
                                        <Text style={styles.headingTextStyle1}>Price</Text>
                                    </View>
                                    <View style={styles.timeContainer}>
                                        <Text style={styles.headingTextStyle1}>Est.Time</Text>
                                    </View>
                                </View>
                                :
                                null
                        }
                        <FlatList
                            data={selectedArray}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this._renderSeparator}
                            renderItem={({ item, index }) => this._renderItems({ item, index })}
                            keyExtractor={item => item} />
                    </View>
                    <FooterButton title='Next' onPress={onNext} />
                </View>
                <DateTimeModal showTimePicker={showTimePicker}
                    onCancel={() => this.setState({ showTimePicker: false })}
                    onSet={(time) => this.setTimeChange(time)} />
            </>
        );
    }
}