import React, { Component } from 'react';
import { View, Text, FlatList, Alert, } from 'react-native';
import { FooterButton, FloatingInput, DateTimeModal, Icon, } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import COMMON_STYLE from '../../../assets/styles/common.style';

export default class PriceAndTime extends Component {

    constructor(props) {
        super(props);

        this.num2 = React.createRef();
        this.num3 = React.createRef();
        this.num4 = React.createRef();
        this.state = {
            selectedArray: [],
            submit: false,
            showAddService: false,
            serviceName: '',
            serviceDescription: '',
            isServiceNameFocus: false,
            isServiceDescriptionFocus: false,
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
        let serviceArray = this.props.data;
        this.setState({ selectedArray: serviceArray })

    }
    componentWillUnmount = () => {
        let data = []
        this.setState({ selectedArray: data })
    }

    setTime = (index, item) => {
        this.setState({ showTimePicker: true, indexValue: index, item: item })
    }

    setTimeChange = (data) => {
        const { item } = this.state;
        const objIndex = this.state.selectedArray.findIndex((obj => obj.id == item.id));
        let items = [...this.state.selectedArray];
        items[objIndex] = { ...items[objIndex], time: data };
        this.setState({ showTimePicker: false, selectedArray: items, item: null });
        this.is_filled_check(items, objIndex)
    }

    addPrice = ({ index, item }) => {
        const { selectedArray } = this.state;
        const objIndex = selectedArray.findIndex((obj => obj.id == item.id));
        let items = [...selectedArray];
        items[objIndex] = { ...items[objIndex], price: selectedArray[index].price };
        this.setState({ selectedArray: items });
        this.is_filled_check(items, objIndex)
    }

    is_filled_check(serviceArray, index) {
        if (serviceArray[index].price != '' && serviceArray[index].time != '') {
            let newServiceCounter = serviceArray[serviceArray.length - 1].serviceCounter + 1;
            serviceArray[serviceArray.length - 1] = { ...serviceArray[serviceArray.length - 1], serviceCounter: newServiceCounter };
            serviceArray[index] = { ...serviceArray[index], isFilled: '1' };
            this.setState({ selectedArray: serviceArray });
        }
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    on_Press_Delete = (itemData, index) => {
        let selectedArray = [...this.state.selectedArray];
        let item = { ...selectedArray[index], price: '', time: '', isFilled: '' };
        selectedArray[index] = item;
        let newServiceCounter = selectedArray[selectedArray.length - 1].serviceCounter - 1;
        selectedArray[selectedArray.length - 1] = { ...selectedArray[selectedArray.length - 1], serviceCounter: newServiceCounter };
        this.setState({ selectedArray: selectedArray.filter((obj => obj.id != itemData.id)) })
    }

    on_Press_Edit = (index) => {
        let selectedArray = [...this.state.selectedArray];
        let item = { ...selectedArray[index], price: '', time: '', isFilled: '' };
        selectedArray[index] = item;
        let newServiceCounter = selectedArray[selectedArray.length - 1].serviceCounter - 1;
        selectedArray[selectedArray.length - 1] = { ...selectedArray[selectedArray.length - 1], serviceCounter: newServiceCounter };
        this.setState({ selectedArray });
    }

    _renderItems = ({ item, index }) => {
        const { selectedArray, submit } = this.state;
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
                    <View style={[styles.priceContainer, { alignItems: "flex-end" }]}>
                        {
                            item.isFilled == '1' ?
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.on_Press_Edit(index)} >
                                        <Icon.MaterialIcons name='edit' size={25} color={THEME.COLOR_WHITE} />
                                    </TouchableOpacity>
                                    <View style={styles.seperatorStyle}></View>
                                    <TouchableOpacity onPress={() => this.on_Press_Delete(item, index)}>
                                        <Icon.MaterialIcons name='delete' size={25} color={THEME.COLOR_WHITE} />
                                    </TouchableOpacity>
                                </View>
                                : null
                        }
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    {item.price == '' ?
                        <View style={[styles.inputContainerStyle,
                            selectedArray[index].price == '' ? THEME.inputBorder : {}]}>
                            <FloatingInput
                               val={selectedArray[index].price}
                                keyboardtype="number-pad"
                                onInActive={() => this.addPrice({ item, index })}
                                label='Price' updateText={(val) => selectedArray[index].price = `$${val}`}  />
                            {
                               submit && !selectedArray[index].price ? <Text style={COMMON_STYLE.errorText1}>Please fill this field</Text> : null
                            }
                        </View>
                        :
                        null
                    }
                    {item.time == '' ?
                        <>
                            <View>
                                <TouchableOpacity onPress={() => this.setTime(index, item)} style={[styles.inputDateContainerStyle,
                                selectedArray[index].time == '' ? THEME.inputBorder : {}]}>
                                    <Text style={styles.titleStyle}>Time</Text>
                                </TouchableOpacity>
                                {
                                    submit && !selectedArray[index].time ? <Text style={COMMON_STYLE.errorText1}>Please select time</Text> : null
                                }
                            </View>

                        </> : null}

                </View>
            </View>
        )
    }
    
    on_Press_Next = () => {
        this.setState({ submit: true })
        const { onNext } = this.props;
        const { selectedArray } = this.state;
        let counter = (selectedArray[(selectedArray.length - 1)].serviceCounter);
        let length = (selectedArray.length - 1);
        if (counter === length) {
            onNext();
            this.setState({ submit: false })
        }
        else {
            Alert.alert('Attention', 'All required field should be filled ')
        }
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
                                    <View style={styles.priceContainer}>
                                         {/* <Text style={styles.headingTextStyle1}>Est.Time</Text> */}
                                        {/* <TouchableOpacity onPress={() => { }} style={{ alignItems: 'center' }}>
                                            <Icon.Ionicons name="ios-add-circle" size={35} color={THEME.COLOR_WHITE} />
                                        </TouchableOpacity> */}
                                    </View>
                                </View>
                                :
                                null
                        }
                        <FlatList
                            contentContainerStyle={{ paddingBottom: '5%' }}
                            data={selectedArray}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this._renderSeparator}
                            renderItem={({ item, index }) => this._renderItems({ item, index })}
                            keyExtractor={item => item} />
                    </View>
                    <FooterButton title='Update'  onPress={this.on_Press_Next} />
                </View>
                <DateTimeModal showTimePicker={showTimePicker}
                    onCancel={() => this.setState({ showTimePicker: false })}
                    onSet={(time) => this.setTimeChange(time)} />
            </>
        );
    }
}