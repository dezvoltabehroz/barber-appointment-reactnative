import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import { FooterButton, Icon, Button, FloatingInput } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import COMMON_STYLE from '../../../assets/styles/common.style';
import { Barbers, Categories } from '../../../services';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

class AddServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: false,
            selectedService: [],
            showAddService: false,
            serviceName: '',
            serviceDescription: '',
            isServiceNameFocus: false,
            isServiceDescriptionFocus: false,
            submit: false,
            loading: false,
            barberServices: [],
            value: ''
        }
        this.arrayHolder = this.state.barberServices
    }

    componentDidMount = () => {
        this.setState({ loading: true })
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token
        }
        Barbers.getBarberAllServices(userData)
            .then((res) => {
                if (res.data.status) {
                    var myArray = [...this.props.category.vendorServices];
                    var toRemove = [...res.data.data];
                    let ids = toRemove.map(c => c.id);
                    myArray = myArray.filter(({ id }) => !ids.includes(id))
                    myArray.map((item, index) => {
                        myArray[index] = { ...myArray[index], isFilled: '0', selected: false, price: '', time: '', }
                    });
                    this.setState({ barberServices: myArray, loading: false });
                    this.arrayHolder = myArray;
                }
            })
            .catch((err) => console.log(err))
    }

    handleSelected = (val) => {
        const objIndex = this.state.barberServices.findIndex((obj => obj.id == val.id));
        let items = [...this.state.barberServices];
        if (items[objIndex].selected) {
            items[objIndex] = { ...items[objIndex], selected: false };
            this.setState({ barberServices: items });
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
            this.setState({ barberServices: items });
            this.state.selectedService.push(items[objIndex]);
        }
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    _renderItems = (item, index) => {
        return (
            <>
                <View style={styles.contentContainer}>
                    <View style={styles.nameContainer}>
                        <View style={{ marginHorizontal: 8 }}>
                            <Text style={styles.idTextLabel}>{index + 1}.</Text>
                        </View>
                        <View>
                            <Text style={[styles.textStyle, { color: THEME.COLOR_WHITE }]}>{item.service_name}</Text>
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

    on_Next_press = async () => {
        const { onNext } = this.props;
        let selectedArray = [...this.state.selectedService];
        if (selectedArray.length == 0) {
            Alert.alert('Attention', 'Please select atleast one service');
        }
        else {
            if (selectedArray[selectedArray.length - 1].serviceCounter != '') {
                selectedArray.push({ serviceCounter: 0 })
                await this.setState({ selectedService: selectedArray })
                onNext(this.state.selectedService)
            }
            else {
                this.setState({ selectedService: selectedArray })
                onNext(this.state.selectedService)
            }

        }

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

    searchFilterBarber = text => {
        this.setState({ value: text });
        const newData = this.arrayHolder.filter(item => {
            const itemData = `${item.service_name.toUpperCase()} ${item.service_name.toUpperCase()} ${item.service_name.toUpperCase()} `;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        if (newData.length != 0) {
            this.setState({ barberServices: newData });
        }
    };

    render() {
        const { barberServices, loading, selectedService } = this.state;
        return (
            <>
                <View style={styles.container}>
                    {
                        loading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator />
                            </View>
                            :
                            <>
                                <SearchBar
                                    placeholder='Search...'
                                    round
                                    onChangeText={text => this.searchFilterBarber(text)}
                                    value={this.state.value}
                                    autoCorrect={false}
                                    inputStyle={{ fontSize: 14, }}
                                    leftIconContainerStyle={{ paddingLeft: 10 }}
                                    rightIconContainerStyle={{ paddingRight: 10 }}
                                    containerStyle={styles.containerStyle}
                                    inputContainerStyle={styles.inputSearchContainerStyle}
                                />
                                <View style={styles.upperContainer}>
                                    <FlatList
                                        initialNumToRender={150}
                                        data={barberServices}
                                        showsVerticalScrollIndicator={false}
                                        ItemSeparatorComponent={this._renderSeparator}
                                        renderItem={({ item, index }) => this._renderItems(item, index)}
                                        keyExtractor={item => item} />
                                </View>
                            </>}
                    <FooterButton disabled={selectedService.length == 0 ? true : false} title='Add' onPress={this.on_Next_press} />
                </View>
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

export default connect(mapStateToProps)(AddServices)