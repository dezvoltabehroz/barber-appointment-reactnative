import React, { Component } from 'react';
import { View, Text, FlatList, Alert, Modal, TouchableOpacity } from 'react-native';
import { FooterButton, FloatingInput, Button, DateTimeModal, Icon, } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import COMMON_STYLE from '../../../assets/styles/common.style';
import { Barbers } from '../../../services';
import { connect } from 'react-redux'

class AddPriceAndTime extends Component {

    constructor(props) {
        super(props);

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
            index: null,
            item: null,
            showEditService: false
        }
    }
    componentDidMount = () => {
        let serviceArray = [...this.props.data];
        console.log('Array', serviceArray)
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
        this.setState({ showTimePicker: false, selectedArray: items, time: data });
        this.is_filled_check(items, objIndex)
    }

    addPrice = ({ index, item }) => {
        const { selectedArray } = this.state;
        const objIndex = selectedArray.findIndex((obj => obj.id == item.id));
        let items = [...selectedArray];
        items[objIndex] = { ...items[objIndex], price: selectedArray[index].price };

        this.setState({ selectedArray: items, showEditService: false });
        this.is_filled_check(items, objIndex)
    }
    addPriceUpdate = ({ index, item }) => {
        const { selectedArray } = this.state;
        const objIndex = selectedArray.findIndex((obj => obj.id == item.id));
        let items = [...selectedArray];
        items[objIndex] = { ...items[objIndex], price: this.state.price };
        items[objIndex] = { ...items[objIndex], time: this.state.time };
        this.setState({ selectedArray: items, showEditService: false });
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
        let newServiceCounter = serviceArray[serviceArray.length - 1].serviceCounter - 1;
        serviceArray[serviceArray.length - 1] = { ...serviceArray[serviceArray.length - 1], serviceCounter: newServiceCounter };
        this.setState({ selectedArray: selectedArray.filter((obj => obj.id != itemData.id)) })
    }

    on_Press_Edit = (item, index) => {
        let selectedArray = [...this.state.selectedArray];
        this.setState({ item, index, })
        let newServiceCounter = selectedArray[selectedArray.length - 1].serviceCounter - 1;
        selectedArray[selectedArray.length - 1] = { ...selectedArray[selectedArray.length - 1], serviceCounter: newServiceCounter };
        this.setState({ selectedArray });
        setTimeout(() => {
            console.log(this.state.item)
            console.log(this.state.index)
            console.log(this.state.selectedArray[index].price)
            this.setState({ showEditService: true, price: this.state.selectedArray[index].price, time: this.state.selectedArray[index].time })
        }, 1);

    }

    _renderItems = ({ item, index }) => {
        const { selectedArray, submit } = this.state;
        return (
            <View style={styles.contentContainer}>
                {
                    item.id ?
                        <>
                            <View style={styles.row}>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.textStyle}>{item.service_name}</Text>
                                </View>
                                <View style={styles.priceContainer} >
                                    {item.price != '' ?
                                        <View style={styles.priceAndTimeContainer}>
                                            <Text style={styles.timeTextStyle}>${item.price}</Text>
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
                                                <TouchableOpacity onPress={() => this.on_Press_Edit(item, index)} >
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
                                            label='Price' updateText={(val) => selectedArray[index].price = `${val}`} />
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
                        </>
                        :
                        null
                }

            </View>
        )
    }

    on_Press_Next = () => {
        this.setState({ submit: true, loading: true })
        const { onNext } = this.props;
        const { selectedArray } = this.state;
        let counter = (selectedArray[(selectedArray.length - 1)].serviceCounter);
        let length = (selectedArray.length - 1);
        console.log(length, counter)
        let array = [];
        selectedArray.forEach((item, index) => {
            if (index == (selectedArray.length - 1)) {
            }
            else {
                array.push({
                    service_id: item.id,
                    price: item.price,
                    time_duration: item.time
                })
            }
        })
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            services: array
        }
        console.log(userData)
        if (counter === length) {
            Barbers.addBarberService(userData)
                .then((res) => {
                    console.log(res.data)
                    if (res.data.status) {
                        this.props.addService()
                    }
                })
                .catch((err) => { console.log(err) })
            this.setState({ submit: false })
        }
        else {
            Alert.alert('Attention', 'All required field should be filled ')
            this.setState({ submit: false, loading: false })
        }
    }

    render() {
        const { onNext } = this.props;
        const { selectedArray, showTimePicker, loading, showEditService, item, index, submit, time, price } = this.state;

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
                    <FooterButton loading={loading} title='Add' onPress={this.on_Press_Next} />
                </View>
                <DateTimeModal showTimePicker={showTimePicker}
                    onCancel={() => this.setState({ showTimePicker: false })}
                    onSet={(time) => { this.state.time ? this.setState({ time: time, showTimePicker: false }) : this.setTimeChange(time) }} />
                <Modal visible={showEditService}
                    animationType="slide">
                    {
                        item == null || index == null ?
                            null
                            :
                            <View style={styles.modalContainer}  >
                                <View style={styles.modalInputContainer}>
                                    <View style={styles.headingContainer}>
                                        <Text style={styles.headingTextStyle}>Update a Service</Text>
                                    </View>

                                    <View style={[styles.inputModalContainerStyle,
                                    price == '' ? THEME.inputBorder : {}]}>
                                        <FloatingInput
                                            val={price}
                                            keyboardtype="number-pad"
                                            onInActive={() => this.setState({ submit: true })}
                                            label='Price' updateText={(price) => this.setState({ price: price })} />
                                        {
                                            submit && !price ? <Text style={COMMON_STYLE.errorText1}>Please fill this field</Text> : null
                                        }
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={() => this.setTime(index, item)} style={[styles.inputModalContainerStyle,
                                        time != '' ? THEME.inputBorder : {}]}>
                                            <View style={{ marginLeft: '3.5%' }}>
                                                <Text style={styles.titleStyle}>Time</Text>
                                                <Text style={{ fontFamily: 'Poppins-Medium' }}>{this.state.time}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        {
                                            submit && !time ? <Text style={COMMON_STYLE.errorText1}>Please select time</Text> : null
                                        }
                                    </View>

                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={styles.rowButtonContainer}>
                                            <Button title="Cancel" onPress={() => this.setState({ showEditService: false })} />
                                        </View>
                                        <View style={styles.rowButtonContainer}>
                                            <Button title="Update" onPress={() => this.addPriceUpdate({ item, index })} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                    }
                </Modal>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {},
        category: state.categoryReducer || {}
    };
};

export default connect(mapStateToProps)(AddPriceAndTime)