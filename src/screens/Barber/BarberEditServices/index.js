import React, { Component } from 'react';
import { View, Text, FlatList, Alert, Modal, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity, RefreshControl } from 'react-native';
import { Button, FooterButton, FloatingInput, DateTimeModal, Icon, Input, } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import COMMON_STYLE from '../../../assets/styles/common.style';
import { Barbers, Categories } from '../../../services';
import { connect } from 'react-redux';
import moment from 'moment';
import Edit from '../../../assets/svg/edit.svg';
import Delete from '../../../assets/svg/delete.svg';
class BarberEditServices extends Component {

    constructor(props) {
        super(props);

        this.num2 = React.createRef();
        this.num3 = React.createRef();
        this.num4 = React.createRef();
        this.state = {
            barberServices: [],
            selectedArray: [],
            selectedService: [],
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
            showEditService: false,
            showAddNewService: false,
            services: []
        }
    }
    componentDidMount = () => {
        this.setState({ loading: true, showEditService: false })
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token
        }
        Barbers.getBarberAllServices(userData)
            .then((res) => {
                if (res.data.status) {
                    let array = [];
                    array = [...res.data.data];
                    array.map((item, index) => {
                        array[index] = { ...array[index], isFilled: '1', selected: false, }
                    });
                    this.setState({ barberServices: array, loading: false, services: array });
                }
            })
            .catch((err) => console.log(err))


    }

    componentWillUnmount = () => {
        let data = []
        this.setState({ selectedArray: data })
    }

    setTime = (index, item) => {
        this.setState({ showTimePicker: true, indexValue: index, item: item })
    }

    setTimeChange = (data) => {
        this.setState({ time: data, showTimePicker: false })

    }

    addPrice = ({ index, item }) => {
        // const { barberServices } = this.state;
        // const objIndex = barberServices.findIndex((obj => obj.id == item.id));
        // let items = [...barberServices];
        // items[objIndex] = { ...items[objIndex], price: barberServices[index].price };
        // this.setState({ barberServices: items });
        // this.is_filled_check(items, objIndex)
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
        Alert.alert('Attension', 'Are you sure you want to delete service',
            [
                {
                    text: "Cancel",
                    // onPress: () => this.handleCancel(),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.handleDeleteService(itemData) }
            ],

        );
    }

    handleDeleteService = (itemData) => {

        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            service_id: itemData.id
        }
        Barbers.deleteBarberService(userData)
            .then((res) => {
                if (res.data.status) {
                    let selectedArray = [...this.state.barberServices];
                    this.setState({ barberServices: selectedArray.filter((obj => obj.id != itemData.id)) })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    on_Press_Edit = (item, index) => {
        this.setState({ item, index, })
        var time = `${moment.duration(this.state.barberServices[index].time_duration).asMinutes()}`;
        var h = time / 60 | 0;
        var m = time % 60 | 0;
        let timeInHour = moment.utc().hours(h).minutes(m).format("HH:mm");
        setTimeout(() => {
            console.log(this.state.item)
            console.log(this.state.index)
            console.log(this.state.barberServices[index].price)
            this.setState({ showEditService: true, price: this.state.barberServices[index].price, time: timeInHour })
        }, 1);

    }

    _renderItems = ({ item, index }) => {
        const { barberServices, submit, showEditService, services } = this.state;
        var time = `${moment.duration(item.time_duration).asMinutes()}`;
        var h = time / 60 | 0;
        var m = time % 60 | 0;
        let timeInHour = moment.utc().hours(h).minutes(m).format("HH:mm");
        return (
            <>
                <View style={styles.contentContainer}>
                    <View style={[styles.row, { flex: 1 }]}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.textStyle}><Text style={{ fontFamily: "Poppins-Bold", color: THEME.PRIMARY_COLOR }}>Services: </Text>{item.service_name}</Text>
                            {item.price != '' ?
                                <View style={{ marginTop: '5%' }}>
                                    <Text style={styles.timeTextStyle}><Text style={{ fontFamily: "Poppins-Bold", color: THEME.PRIMARY_COLOR }}>Cost:</Text> USD {item.price}</Text>
                                </View>
                                : null
                            }
                            {item.time != '' ?
                                <View style={{ marginTop: '5%' }}>
                                    <Text style={styles.timeTextStyle}><Text style={{ fontFamily: "Poppins-Bold", color: THEME.PRIMARY_COLOR }}>Duration:</Text>
                                        {timeInHour[0] == '0' && timeInHour[1] == '0' ? "" : "  " + timeInHour[1]}
                                        {
                                            timeInHour[0] == '0' && timeInHour[1] == '0' ?
                                                null
                                                :
                                                <Text style={styles.textStyles}> Hour</Text>
                                        }
                                        {timeInHour[3] == 0 && timeInHour[4] == 0 ? "" : ` ${timeInHour[3]}${timeInHour[4]}`}
                                        {
                                            timeInHour[3] == 0 && timeInHour[4] == 0 ?
                                                null
                                                :
                                                <Text style={styles.textStyles}> Minutes</Text>
                                        }</Text>
                                </View>
                                : null
                            }
                        </View>
                        {/* <View style={styles.priceContainer} >
                            {item.price != '' ?
                                <View style={styles.priceAndTimeContainer}>
                                    <Text style={styles.timeTextStyle}>Cost: USD {item.price}</Text>
                                </View>
                                : null
                            }
                        </View>
                        <View style={styles.timeContainer}>
                            {item.time != '' ?
                                <View style={styles.priceAndTimeContainer}>
                                    <Text style={styles.timeTextStyle}>
                                        {timeInHour[0] == '0' && timeInHour[1] == '0' ? "" : "  " + timeInHour[1]}
                                        {
                                            timeInHour[0] == '0' && timeInHour[1] == '0' ?
                                                null
                                                :
                                                <Text style={styles.textStyles}> hr</Text>
                                        }
                                        {timeInHour[3] == 0 && timeInHour[4] == 0 ? "" : ` ${timeInHour[3]}${timeInHour[4]}`}
                                        {
                                            timeInHour[3] == 0 && timeInHour[4] == 0 ?
                                                null
                                                :
                                                <Text style={styles.textStyles}> mins</Text>
                                        }</Text>
                                </View>
                                : null
                            }
                        </View> */}
                        <View style={[styles.priceContainer, { alignItems: "flex-end" }]}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>
                                <TouchableOpacity onPress={() => this.on_Press_Edit(item, index)} >
                                    <Edit height={40} width={40} />
                                    {/* <Icon.MaterialIcons name='edit' size={25} color={THEME.COLOR_WHITE} /> */}
                                </TouchableOpacity>
                                <View style={styles.seperatorStyle}></View>
                                <TouchableOpacity onPress={() => this.on_Press_Delete(item, index)}>
                                    <Delete height={40} width={40} />
                                    {/* <Icon.MaterialIcons name='delete' size={25} color={THEME.COLOR_WHITE} /> */}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </>)
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
    _renderAddServiceItems = (item) => {
        return (
            <>
                <View style={styles.contentContainer}>
                    <View style={styles.nameContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginHorizontal: 8 }}>
                                <Text style={styles.idTextLabel}>{item.id}.</Text>
                            </View>
                            <View>
                                <Text style={styles.textStyle}>{item.service_name}</Text>
                            </View>
                        </View>
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
            onNext(this.state.notSelectedServices);
            this.setState({ submit: false })
        }
        else {
            Alert.alert('Attention', 'All required field should be filled ')
        }
    }
    on_Update_Press = () => {
        const { item, price, time } = this.state;
        const objIndex = this.state.barberServices.findIndex((obj => obj.id == item.id));
        let items = [...this.state.barberServices];
        let userData = {
            id: this.props.user.userData.id,
            service_id: items[objIndex].id,
            price: price,
            time_duration: time,
            token: this.props.user.userData.token
        }
        Barbers.updateBarberService(userData)
            .then((res) => {
                if (res.data.status) {
                    this.componentDidMount()
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleSelected = (val) => {
        const objIndex = this.state.services.findIndex((obj => obj.id == val.id));
        let items = [...this.state.services];
        if (items[objIndex].selected) {
            items[objIndex] = { ...items[objIndex], selected: false };
            this.setState({ services: items });
            if (!items[objIndex].selected) {
                for (var i = 0; i < this.state.selectedService.length; i++) {
                    if (!this.state.selectedService[i].id) {
                        this.state.selectedService.splice(i, 1);
                    }
                }
                this.setState({ selectedService: this.state.selectedService.filter(item => item.id != val.id) })
            }
        } else {
            for (var i = 0; i < this.state.selectedService.length; i++) {
                if (!this.state.selectedService[i].id) {
                    this.state.selectedService.splice(i, 1);
                }
            }
            items[objIndex] = { ...items[objIndex], selected: true };
            this.setState({ services: items });
            this.state.selectedService.push(items[objIndex]);
        }
    }
    render() {
        const { onNext } = this.props;
        const { barberServices, index, item, loading, services, showAddNewService, showTimePicker, showEditService, showAddService, serviceName, serviceDescription, isServiceNameFocus, submit, isServiceDescriptionFocus } = this.state;

        return (
            <View style={styles.container}>
                {
                    loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator />
                        </View>
                        :
                        <>
                            <View style={styles.upperContainer}>
                                {/* {
                                    barberServices.length == 0 || barberServices[0].price != '' || barberServices[0].time != '' ?
                                        // <View style={styles.headingContainer}>
                                        //     <View style={styles.nameContainer}>
                                        //         <Text style={styles.headingTextStyle}>Services</Text>
                                        //     </View>
                                        //     <View style={styles.priceContainer} >
                                        //         <Text style={styles.headingTextStyle1}>Price</Text>
                                        //     </View>
                                        //     <View style={styles.timeContainer}>
                                        //         <Text style={styles.headingTextStyle1}>Est. Duration</Text>
                                        //     </View>
                                        //     <View style={styles.priceContainer}>
                                        //     </View>
                                        // </View>
                                        <>
                                        </>
                                        :
                                        null
                                } */}
                                <FlatList
                                    contentContainerStyle={{ paddingBottom: '5%' }}
                                    refreshControl={<RefreshControl tintColor={THEME.COLOR_WHITE}
                                        colors={[THEME.PRIMARY_COLOR]} onRefresh={() => this.componentDidMount()} />}
                                    data={barberServices}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={this._renderSeparator}
                                    renderItem={({ item, index }) => this._renderItems({ item, index })}
                                    keyExtractor={item => item} />
                            </View>
                            <View style={{ flex: 0.2, justifyContent: "center" }}>
                                <TouchableOpacity stye={{ backgroundColor: "#171717" }} onPress={() => this.props.onNext(() => this.componentDidMount())}>
                                    <View style={{ height: 60, width: '100%', backgroundColor: "#171717", justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, color: THEME.PRIMARY_COLOR }}>Add Service</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {/* <FooterButton title="Add Service" onPress={() => this.props.onNext(() => this.componentDidMount())}  /*addservice onPressAddNewService={() => this.props.onNext(this.componentDidMount())} onPressAddService={() => this.setState({ showAddService: true })} /> */}

                        </>

                }
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
                                    <View style={{ marginTop: '15%' }}>
                                        <Input
                                            placeholder="Price:"
                                            keyboardtype="number-pad"
                                            onBlur={() => this.addPrice({ item, index })}
                                            onChangeText={(price) => { this.setState({ price: price }) }}
                                            value={`Price: USD ${this.state.price}`} />
                                        {/* <View style={[styles.inputModalContainerStyle,
                                        barberServices[index].price != '' ? THEME.inputBorder : {}]}>

                                            <FloatingInput
                                                val={`${this.state.price}`}
                                                keyboardtype="number-pad"
                                                onInActive={() => this.addPrice({ item, index })}
                                                label='Price' updateText={(price) => {
                                                    this.setState({ price: price })
                                                }} />
                                            {
                                                submit && !this.state.price ? <Text style={COMMON_STYLE.errorText1}>Please fill this field</Text> : null
                                            }
                                        </View> */}
                                        <TouchableOpacity onPress={() => this.setTime(index, item)} style={[styles.inputModalContainerStyle]}>
                                            <View style={{ marginLeft: '5%', justifyContent: 'center' }}>
                                                <Text style={{ fontFamily: 'Poppins-Medium', color: THEME.PRIMARY_COLOR, fontSize: 16 }}> Time: {moment(moment(this.state.time, 'H:mm')).format('HH:mm')}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        {
                                            submit && !this.state.time ? <Text style={COMMON_STYLE.errorText1}>Please select time</Text> : null
                                        }
                                    </View>


                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <TouchableOpacity style={styles.rowButtonContainer}>
                                            <View style={{ backgroundColor: THEME.PRIMARY_COLOR, height: 54, justifyContent: "center", alignItems: "center" }}>
                                                <Text style={{ fontFamily: 'Poppins-Bold' }}>Cancel</Text>
                                            </View>
                                            {/* <Button title="Cancel" onPress={() => this.setState({ showEditService: false })} /> */}
                                        </TouchableOpacity>
                                        <View style={styles.rowButtonContainer}>
                                            <View style={{ backgroundColor: THEME.PRIMARY_COLOR, height: 54, justifyContent: "center", alignItems: "center" }}>
                                                <Text style={{ fontFamily: 'Poppins-Bold' }}>Update</Text>
                                            </View>
                                            {/* <Button title="Update" onPress={this.on_Update_Press} /> */}
                                        </View>
                                    </View>
                                </View>

                            </View>
                    }
                </Modal>
            </View>);
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {},
        category: state.categoryReducer || {}
    };
};

export default connect(mapStateToProps)(BarberEditServices)