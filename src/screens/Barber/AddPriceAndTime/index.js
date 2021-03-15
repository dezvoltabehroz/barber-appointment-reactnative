import React, { Component } from 'react';
import { View, Text, FlatList, Alert, Modal, TouchableOpacity } from 'react-native';
import { FooterButton, FloatingInput, Button, DateTimeModal, Icon, } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import COMMON_STYLE from '../../../assets/styles/common.style';
import { Barbers } from '../../../services';
import { connect } from 'react-redux';
import { Input } from "react-native-elements";
import Trash from '../../../assets/svg/deleteblack.svg'
import TrashColor from '../../../assets/svg/deletecolor.svg'
import Edit from '../../../assets/svg/editBlack.svg'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ModalS from 'react-native-modal';
import moment from 'moment';
import Space from '../../../assets/svg/_.svg';
var swipeableRef = {}

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
            showEditService: false,
            time: '',
            price: '',
            showAddPrice: false,
            lastIndex: -1,
            presentAlertModal: false
        }
    }
    componentDidMount = () => {
        let serviceArray = [...this.props.data];
        this.setState({ selectedArray: serviceArray })

    }

    componentWillUnmount = () => {
        let data = []
        this.setState({ selectedArray: data })
    }

    setTime = (index, item) => {
        console.log(index, item)
        this.setState({ showTimePicker: true, indexValue: index, item: item })
    }

    setTimeChange = (data) => {
        const { item } = this.state;
        const objIndex = this.state.selectedArray.findIndex((obj => obj.id == item.id));
        let items = [...this.state.selectedArray];
        items[objIndex] = { ...items[objIndex], time: data };
        this.setState({ showTimePicker: false, selectedArray: items });
        this.is_filled_check(items, objIndex)
    }

    addPrice = ({ index, item }) => {
        const { selectedArray, price } = this.state;
        const objIndex = selectedArray.findIndex((obj => obj.id == item.id));
        let items = [...selectedArray];
        items[objIndex] = { ...items[objIndex], price: price };

        this.setState({ selectedArray: items, showAddPrice: false, price: "", item: null, index: null, showEditService: false });
        this.is_filled_check(items, objIndex)
    }

    addPriceUpdate = ({ index, item }) => {
        const { selectedArray } = this.state;
        const objIndex = selectedArray.findIndex((obj => obj.id == item.id));
        let items = [...selectedArray];
        items[objIndex] = { ...items[objIndex], price: this.state.price };
        items[objIndex] = { ...items[objIndex], time: this.state.time };
        swipeableRef[this.state.lastIndex].close()
        this.setState({ selectedArray: items, showEditService: false, time: '', price: '' });
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

    on_Press_Delete = (itemData) => {
        let selectedArray = [...this.state.selectedArray];
        let newServiceCounter = selectedArray[selectedArray.length - 1].serviceCounter - 1;
        selectedArray[selectedArray.length - 1] = { ...selectedArray[selectedArray.length - 1], serviceCounter: newServiceCounter };
        this.setState({ selectedArray: selectedArray.filter((obj => obj.id != itemData.id)),presentAlertModal:false })
    }

    on_Press_Edit = (item) => {
        const objIndex = this.state.selectedArray.findIndex((obj => obj.id == item.id));
        let selectedArray = [...this.state.selectedArray];
        this.setState({ item, index: objIndex })
        let newServiceCounter = selectedArray[selectedArray.length - 1].serviceCounter - 1;
        selectedArray[selectedArray.length - 1] = { ...selectedArray[selectedArray.length - 1], serviceCounter: newServiceCounter };
        this.setState({ selectedArray });
        setTimeout(() => {
            console.log(this.state.item)
            console.log(this.state.index)
            console.log(this.state.selectedArray[objIndex].price)
            this.setState({ showEditService: true, price: this.state.selectedArray[objIndex].price, time: this.state.selectedArray[objIndex].time })
        }, 1);
    }

    renderLeftActions = (progress, dragX, item) => {
        // console.log("item:", item)
        return (
            <View style={{ flexDirection: 'row', backgroundColor: THEME.PRIMARY_COLOR }}>
                <TouchableOpacity
                    onPress={() => this.on_Press_Edit(item, this.state.index)}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingRight: 10
                    }}>

                    <Edit height={50} width={50} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({ presentAlertModal: true, item: item })
                    }}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingRight: 10
                    }}>
                    <Trash height={40} width={40} />
                </TouchableOpacity>
            </View>
        );
    };

    _renderItems = ({ item, index }) => {
        const { selectedArray, submit } = this.state;
        var h = parseInt(moment.duration(item.time).asMinutes()) / 60 | 0;
        var m = parseInt(moment.duration(item.time).asMinutes()) % 60 | 0;
        const timeInHour = moment.utc().hours(h).minutes(m).format("HH:mm")
        return (
            <>
                {
                    item.id ?
                        <View style={styles.contentContainer}>
                            <View style={styles.row}>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.textStyle}>{item.service_name}</Text>
                                </View>
                                <View style={[styles.priceContainer, { alignItems: "center" }]} >
                                    {item.price != '' ?
                                        <View style={styles.priceAndTimeContainer}>
                                            <Text style={styles.timeTextStyle}>${item.price}</Text>
                                        </View>
                                        :
                                        null
                                    }
                                    {item.price == '' ?
                                        <TouchableOpacity onPress={() => this.setState({ index: index, item: item, showAddPrice: true })} >
                                            <Space width={60} height={30} />
                                        </TouchableOpacity>
                                        : null}
                                </View>
                                <View style={styles.viewDatePlaceHolder}></View>
                                <View style={[styles.timeContainer, { alignItems: "center" }]}>
                                    {item.time != '' ?
                                        <View style={styles.priceAndTimeContainer}>
                                            <Text style={styles.timeTextStyle}>
                                                {timeInHour[0] == 0 && timeInHour[1] == 0 ? "" : timeInHour[0] + timeInHour[1]}
                                                {
                                                    timeInHour[0] == 0 && timeInHour[1] == 0 ?
                                                        null
                                                        :
                                                        <Text style={styles.timeTextStyle}> hr</Text>
                                                }
                                                {timeInHour[3] == 0 && timeInHour[4] == 0 ? "" : ` ${timeInHour[3]}${timeInHour[4]}`}
                                                {
                                                    timeInHour[3] == 0 && timeInHour[4] == 0 ?
                                                        null
                                                        :
                                                        <Text style={styles.timeTextStyle}> m</Text>
                                                }
                                            </Text>
                                        </View>
                                        :
                                        null
                                    }
                                    {item.time == '' ? <TouchableOpacity onPress={() => this.setTime(index, item)} >
                                        <Space width={60} height={30} />
                                    </TouchableOpacity>
                                        :
                                        null
                                    }
                                </View>

                            </View>

                        </View>

                        :
                        null
                }
            </>
        )
    }

    // on_Press_Edit = (item) => {
    //     const objIndex = this.state.selectedArray.findIndex((obj => obj.id == item.id));
    //     let selectedArray = [...this.state.selectedArray];
    //     this.setState({ item, index: objIndex })
    //     let newServiceCounter = selectedArray[selectedArray.length - 1].serviceCounter - 1;
    //     selectedArray[selectedArray.length - 1] = { ...selectedArray[selectedArray.length - 1], serviceCounter: newServiceCounter };
    //     this.setState({ selectedArray });
    //     setTimeout(() => {
    //         console.log(this.state.item)
    //         console.log(this.state.index)
    //         console.log(this.state.selectedArray[objIndex].price)
    //         this.setState({ showEditService: true, price: this.state.selectedArray[objIndex].price, time: this.state.selectedArray[objIndex].time })
    //     }, 1);
    // }


    on_Press_Next = () => {
        this.setState({ submit: true, buttonLoading: true })
        const { onNext } = this.props;
        const { selectedArray } = this.state;
        if ((selectedArray.length - 1) == 0) {
            Alert.alert('Attention', 'Please go back and select service that you want to add! ')
            this.setState({ submit: false, buttonLoading: false })
        } else {
            let counter = (selectedArray[(selectedArray.length - 1)].serviceCounter);
            let length = (selectedArray.length - 1);
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
            if (counter === length) {
                Barbers.addServiceAcrossBarber(userData)
                    .then((res) => {
                        if (res.data.status) {
                            this.props.addService()
                        }
                    })
                    .catch((err) => { console.log(err) })
                this.setState({ submit: false })
            }
            else {
                Alert.alert('Attention', 'All required field should be filled ')
                this.setState({ submit: false, buttonLoading: false })
            }
        }

    }

    render() {
        const { onNext } = this.props;
        const { selectedArray, showTimePicker, lastIndex, loading, showEditService, item, index, submit, time, price, showAddPrice } = this.state;

        return (
            <>
                <View style={styles.container}>
                    {
                        loading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator />
                            </View>
                            :
                            (selectedArray.length - 1) == 0 ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.headingTextStyle1}>Please go back and select more services to add!</Text>
                                </View>
                                :
                                <View style={styles.upperContainer}>

                                    <View style={styles.headingContainer}>
                                        <View style={styles.nameContainer}>
                                            <Text style={styles.headingTextStyle1}>Services</Text>
                                        </View>
                                        <View style={styles.priceContainer} >
                                            <Text style={styles.headingTextStyle2}>Price</Text>
                                        </View>
                                        <View style={styles.viewDatePlaceHolder}></View>
                                        <View style={styles.timeContainer}>
                                            <Text style={styles.headingTextStyle2}>Est. Duration</Text>
                                        </View>
                                        {/* <View style={styles.priceContainer}>
                                </View> */}
                                    </View>

                                    <FlatList
                                        contentContainerStyle={{ paddingBottom: '5%' }}
                                        data={selectedArray}
                                        showsVerticalScrollIndicator={false}
                                        ItemSeparatorComponent={this._renderSeparator}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <Swipeable
                                                    enabled={item.price != "" && item.time != "" ? true : false}
                                                    useNativeAnimations={true}
                                                    overshootRight={false}
                                                    ref={(Swipeable) => swipeableRef[index] = Swipeable}
                                                    onSwipeableWillOpen={() => {
                                                        this.setState({ item, index })
                                                        if (lastIndex == -1) {
                                                            this.setState({ lastIndex: index });
                                                        }
                                                        else {
                                                            if (index != lastIndex) {
                                                                if (index != lastIndex) {
                                                                    swipeableRef[lastIndex]?.close()
                                                                }
                                                            }
                                                            this.setState({ lastIndex: index });
                                                        }
                                                    }}
                                                    renderRightActions={(progress, dragX) => this.renderLeftActions(progress, dragX, item)}
                                                >
                                                    {   this._renderItems({ item, index })}
                                                </Swipeable>
                                            )
                                        }}
                                        keyExtractor={item => item} />
                                </View>
                    }

                    <FooterButton loading={this.state.buttonLoading} title='Add' onPress={this.on_Press_Next} />
                </View>
                <DateTimeModal showTimePicker={showTimePicker}
                    onCancel={() => this.setState({ showTimePicker: false })}
                    onSet={(time) => { this.state.time != '' ? this.setState({ time, showTimePicker: false }) : this.setTimeChange(time) }} />
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
                                            <Button title="Cancel" onPress={() => {
                                                let selectedArray = [...this.state.selectedArray];
                                                let newServiceCounter = selectedArray[selectedArray.length - 1].serviceCounter + 1;
                                                selectedArray[selectedArray.length - 1] = { ...selectedArray[selectedArray.length - 1], serviceCounter: newServiceCounter };
                                                this.setState({ selectedArray });
                                                this.setState({ showEditService: false })
                                            }} />
                                        </View>
                                        <View style={styles.rowButtonContainer}>
                                            <Button title="Update" onPress={() => this.addPriceUpdate({ item, index })} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                    }
                </Modal>
                <Modal visible={showAddPrice}
                    animationType="slide">
                    {
                        item == null || index == null ?
                            null
                            :
                            <View style={styles.modalContainer}  >
                                <View style={styles.modalInputContainer}>
                                    <View style={{ marginBottom: '10%' }}>
                                        <Text style={styles.headingTextStyle}>Price</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", height: 70, paddingLeft: "35%", width: "100%", alignItems: "center", backgroundColor: "#171717" }}>
                                        <View>
                                            <Icon.FontAwesome name="dollar" size={25} color={THEME.PRIMARY_COLOR} />
                                        </View>
                                        <View style={{ marginTop: 5 }}>
                                            <Input
                                                value={price}
                                                keyboardType="number-pad"
                                                leftIconContainerStyle={{ paddingLeft: 10 }}
                                                inputStyle={styles.inputStyle}
                                                containerStyle={styles.containerStyle}
                                                placeholderTextColor={THEME.PRIMARY_COLOR}
                                                inputContainerStyle={styles.inputContainerStyle}
                                                // onBlur={() => this.addPrice(item, index)}
                                                onChangeText={(price) => this.setState({ price })} />
                                            {
                                                submit && !price ? <Text style={COMMON_STYLE.errorText1}>Please fill this field</Text> : null
                                            }
                                        </View>
                                    </View>


                                    {/* <View>
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
                                </View> */}

                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: "25%" }}>
                                        <View style={styles.rowButtonContainer}>
                                            <Button title="Cancel" onPress={() => {
                                                let selectedArray = [...this.state.selectedArray];
                                                let newServiceCounter = selectedArray[selectedArray.length - 1].serviceCounter + 1;
                                                selectedArray[selectedArray.length - 1] = { ...selectedArray[selectedArray.length - 1], serviceCounter: newServiceCounter };
                                                this.setState({ selectedArray });
                                                this.setState({ showEditService: false })
                                            }} />
                                        </View>
                                        <View style={styles.rowButtonContainer}>
                                            <Button disabled={price != "" ? false : true} title="Set" onPress={() => this.addPrice({ item, index })} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                    }
                </Modal>
                <ModalS isVisible={this.state.presentAlertModal}>
                    <View style={{ backgroundColor: '#171717', paddingVertical: "5%" }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: "5%", marginHorizontal: '6%' }}>
                            <TrashColor />
                            <Text style={{ fontFamily: "Poppins-Medium", textAlign: "center", paddingTop: "5%", color: "white" }}>Are you sure you want to delete this service? This will delete the service permanently.</Text>
                        </View>
                        <View style={{ paddingTop: '5%', marginHorizontal: "10%", flexDirection: "row", justifyContent: "space-between", paddingBottom: '5%', }}>
                            <TouchableOpacity onPress={() => { swipeableRef[this.state.lastIndex]?.close(); this.setState({ presentAlertModal: false }) }} style={{ width: 120, backgroundColor: THEME.PRIMARY_COLOR, height: 50, justifyContent: 'center' }}>
                                <Text style={{ color: '#171717', textAlign: 'center', fontFamily: 'Poppins-Bold' }} >Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.on_Press_Delete(this.state.item)} style={{ width: 120, backgroundColor: "#FF6635", height: 50, justifyContent: 'center' }}>
                                <Text style={{ color: '#171717', textAlign: 'center', fontFamily: 'Poppins-Bold' }} >Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ModalS>
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