import React, { Component } from 'react';
import { View, Text, FlatList, Alert, Modal } from 'react-native';
import { Button, FooterButton, FloatingInput, DateTimeModal, Icon, } from '../../../components';
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
            barberServices: [
                { id: 1, serviceName: 'Hair Cuttuing', serviceDescription: '', selected: false, price: '$30', time: '15', isFilled: '1' },
                { id: 2, serviceName: 'Hair Trimming', serviceDescription: '', selected: false, price: '$30', time: '15', isFilled: '1' },
                { id: 3, serviceName: 'Blowout', serviceDescription: '', selected: false, price: '$30', time: '15', isFilled: '1' },
                { id: 4, serviceName: 'Hair Color', serviceDescription: '', selected: false, price: '$30', time: '15', isFilled: '1' },
                { id: 5, serviceName: 'Double process hair color', serviceDescription: '', selected: false, price: '$30', time: '15', isFilled: '1' },
                { id: 6, serviceName: 'Shave', serviceDescription: '', selected: false, price: '$30', time: '15', isFilled: '1' },
                { id: 7, serviceName: 'Beard Trim', serviceDescription: '', selected: false, price: '$30', time: '15', isFilled: '1' },
                { id: 8, serviceName: 'Braids & Twist', serviceDescription: '', selected: false, price: '$30', time: '15', isFilled: '1' },
                { id: 9, serviceName: 'Hair color touch ups', serviceDescription: '', selected: false, price: '$30', time: '15', isFilled: '1' },
                { id: 10, serviceName: 'Scalp Conditioning Treatment', serviceDescription: '', selected: false, price: '$30', time: '15', isFilled: '1' },
                { id: 11, serviceName: 'Permanent Hair Retexturizing', serviceDescription: '', selected: false, price: '$30', time: '15', isFilled: '1' },
            ],
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
        // let serviceArray = this.props.data;
        // this.setState({ selectedArray: serviceArray })

    }
    componentWillUnmount = () => {
        // let data = []
        // this.setState({ selectedArray: data })
    }

    setTime = (index, item) => {
        this.setState({ showTimePicker: true, indexValue: index, item: item })
    }

    setTimeChange = (data) => {
        const { item } = this.state;
        const objIndex = this.state.barberServices.findIndex((obj => obj.id == item.id));
        let items = [...this.state.barberServices];
        items[objIndex] = { ...items[objIndex], time: data };
        this.setState({ showTimePicker: false, barberServices: items, item: null });
        this.is_filled_check(items, objIndex)
    }

    addPrice = ({ index, item }) => {
        const { barberServices } = this.state;
        const objIndex = barberServices.findIndex((obj => obj.id == item.id));
        let items = [...barberServices];
        items[objIndex] = { ...items[objIndex], price: barberServices[index].price };
        this.setState({ barberServices: items });
        this.is_filled_check(items, objIndex)
    }

    is_filled_check(serviceArray, index) {
        if (serviceArray[index].price != '' && serviceArray[index].time != '') {
            let newServiceCounter = serviceArray[serviceArray.length - 1].serviceCounter + 1;
            serviceArray[serviceArray.length - 1] = { ...serviceArray[serviceArray.length - 1], serviceCounter: newServiceCounter };
            serviceArray[index] = { ...serviceArray[index], isFilled: '1' };
            this.setState({ barberServices: serviceArray });
        }
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    on_Press_Delete = (itemData, index) => {
        let selectedArray = [...this.state.barberServices];
        let item = { ...selectedArray[index], price: '', time: '', isFilled: '' };
        selectedArray[index] = item;
        let newServiceCounter = selectedArray[selectedArray.length - 1].serviceCounter - 1;
        selectedArray[selectedArray.length - 1] = { ...selectedArray[selectedArray.length - 1], serviceCounter: newServiceCounter };
        this.setState({ barberServices: selectedArray.filter((obj => obj.id != itemData.id)) })
    }

    on_Press_Edit = (index) => {
        let selectedArray = [...this.state.barberServices];
        let item = { ...selectedArray[index], price: '', time: '', isFilled: '' };
        selectedArray[index] = item;
        let newServiceCounter = selectedArray[selectedArray.length - 1].serviceCounter - 1;
        selectedArray[selectedArray.length - 1] = { ...selectedArray[selectedArray.length - 1], serviceCounter: newServiceCounter };
        this.setState({ barberServices: selectedArray });
    }

    _renderItems = ({ item, index }) => {
        const { barberServices, submit } = this.state;
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
                        barberServices[index].price == '' ? THEME.inputBorder : {}]}>
                            <FloatingInput
                                val={barberServices[index].price}
                                keyboardtype="number-pad"
                                onInActive={() => this.addPrice({ item, index })}
                                label='Price' updateText={(val) => barberServices[index].price = `$${val}`} />
                            {
                                submit && !barberServices[index].price ? <Text style={COMMON_STYLE.errorText1}>Please fill this field</Text> : null
                            }
                        </View>
                        :
                        null
                    }
                    {item.time == '' ?
                        <>
                            <View>
                                <TouchableOpacity onPress={() => this.setTime(index, item)} style={[styles.inputDateContainerStyle,
                                barberServices[index].time == '' ? THEME.inputBorder : {}]}>
                                    <Text style={styles.titleStyle}>Time</Text>
                                </TouchableOpacity>
                                {
                                    submit && !barberServices[index].time ? <Text style={COMMON_STYLE.errorText1}>Please select time</Text> : null
                                }
                            </View>

                        </> : null}

                </View>
            </View>
        )
    }
    handleAddService = () => {
        const { barberServices, serviceName, serviceDescription } = this.state;
        this.setState({ submit: true })
        if (serviceName && serviceDescription) {
            let userService = {
                id: barberServices.length + 1,
                serviceName: serviceName,
                serviceDescription: serviceDescription,
                selected: false,
                price: '',
                time: '',
                isFilled: ''
            };
            this.state.barberServices.push(userService);
            this.setState({ showAddService: false, serviceDescription: '', serviceName: '', submit: false })
        }
    }

    handleCancel = () => {

        this.setState({ showAddService: false, submit: false })
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
        const { barberServices, showTimePicker, showAddService, serviceName, serviceDescription, isServiceNameFocus, submit, isServiceDescriptionFocus } = this.state;

        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        {
                            barberServices.length == 0 || barberServices[0].price != '' || barberServices[0].time != '' ?
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
                            data={barberServices}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this._renderSeparator}
                            renderItem={({ item, index }) => this._renderItems({ item, index })}
                            keyExtractor={item => item} />
                    </View>
                    <FooterButton title='Update' addservice onPressAddService={() => this.setState({ showAddService: true })} onPress={()=>this.props.onNext()} />
                </View>
                <DateTimeModal showTimePicker={showTimePicker}
                    onCancel={() => this.setState({ showTimePicker: false })}
                    onSet={(time) => this.setTimeChange(time)} />
                <Modal visible={showAddService}
                    animationType="slide">
                    <View style={styles.modalContainer}  >
                        <View style={styles.modalInputContainer}>
                            <View style={styles.headingContainer}>
                                <Text style={styles.headingTextStyle}>Add a Service</Text>
                            </View>

                            <View style={[styles.inputModalContainerStyle,
                            serviceName != '' || isServiceNameFocus ? THEME.inputBorder : {}]}>
                                <FloatingInput
                                    val={serviceName}
                                    onActive={() => this.setState({ isServiceNameFocus: true })}
                                    onInActive={() => this.setState({ isServiceNameFocus: false })}
                                    label='Service Name'
                                    updateText={(serviceName) => this.setState({ serviceName })} />
                                {
                                    submit && !serviceName ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                                }
                            </View>
                            <View style={[styles.inputModalContainerStyle,
                            serviceDescription != '' || isServiceDescriptionFocus ? THEME.inputBorder : {}]}>
                                <FloatingInput
                                    val={serviceDescription}
                                    onActive={() => this.setState({ isServiceDescriptionFocus: true })}
                                    onInActive={() => this.setState({ isServiceDescriptionFocus: false })}
                                    label='Service Description'
                                    updateText={(serviceDescription) => this.setState({ serviceDescription })} />
                                {
                                    submit && !serviceDescription ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                                }
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={styles.rowButtonContainer}>
                                    <Button title="Cancel" onPress={this.handleCancel} />
                                </View>
                                <View style={styles.rowButtonContainer}>
                                    <Button title="Submit" onPress={this.handleAddService} />
                                </View>
                            </View>
                        </View>


                    </View>
                </Modal>
            </>
        );
    }
}