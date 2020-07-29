import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import { FooterButton, Icon, Button, FloatingInput } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import COMMON_STYLE from '../../../assets/styles/common.style';


export default class Services extends Component {
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
            barberServices: [
                { id: 1, serviceName: 'Hair Cuttuing', serviceDescription: '', selected: false, price: '', time: '' },
                { id: 2, serviceName: 'Hair Trimming', serviceDescription: '', selected: false, price: '', time: '' },
                { id: 3, serviceName: 'Blowout', serviceDescription: '', selected: false, price: '', time: '' },
                { id: 4, serviceName: 'Hair Color', serviceDescription: '', selected: false, price: '', time: '' },
                { id: 5, serviceName: 'Double process hair color', serviceDescription: '', selected: false, price: '', time: '' },
                { id: 6, serviceName: 'Shave', serviceDescription: '', selected: false, price: '', time: '' },
                { id: 7, serviceName: 'Beard Trim', serviceDescription: '', selected: false, price: '', time: '' },
                { id: 8, serviceName: 'Braids & Twist', serviceDescription: '', selected: false, price: '', time: '' },
                { id: 9, serviceName: 'Hair color touch ups', serviceDescription: '', selected: false, price: '', time: '' },
                { id: 10, serviceName: 'Scalp Conditioning Treatment', serviceDescription: '', selected: false, price: '', time: '' },
                { id: 11, serviceName: 'Permanent Hair Retexturizing', serviceDescription: '', selected: false, price: '', time: '' }
            ],
        }
    }

    handleSelected = (val) => {
        const objIndex = this.state.barberServices.findIndex((obj => obj.id == val.id));
        let items = [...this.state.barberServices];
        if (items[objIndex].selected) {
            items[objIndex] = { ...items[objIndex], selected: false };
            this.setState({ barberServices: items });
            if (!items[objIndex].selected) {
                this.setState({ selectedService: this.state.selectedService.filter(item => item.id != val.id) })
            }
        } else {
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

    _renderItems = (item) => {
        return (
            <>
                <View style={styles.contentContainer}>
                    <View style={styles.nameContainer}>
                        <View style={{ marginHorizontal: 8 }}>
                            <Text style={styles.idTextLabel}>{item.id}.</Text>
                        </View>
                        <View>
                            <Text style={styles.textStyle}>{item.serviceName}</Text>
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
                time: ''
            };
            this.state.barberServices.push(userService);
            this.setState({ showAddService: false, serviceDescription: '', serviceName: '' })
        }


    }

    render() {
        const { onNext } = this.props;
        const { barberServices, showAddService, serviceName, serviceDescription, isServiceNameFocus, submit, isServiceDescriptionFocus } = this.state;
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <FlatList
                            data={barberServices}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this._renderSeparator}
                            renderItem={({ item }) => this._renderItems(item)}
                            keyExtractor={item => item} />
                    </View>
                    <View style={styles.addServiceContainer}>
                        <View style={styles.buttonContainer}>
                            <Button title="Add Service" onPress={() => this.setState({ showAddService: true })} />
                        </View>
                    </View>

                    <FooterButton title='Next' onPress={() => onNext(this.state.selectedService)} />
                </View>
                <Modal visible={showAddService}
                    animationType="slide">
                    <View style={styles.modalContainer}  >
                        <View style={styles.modalInputContainer}>
                            <View style={styles.headingContainer}>
                                <Text style={styles.headingTextStyle}>Add a Service</Text>
                            </View>

                            <View style={[styles.inputContainerStyle,
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
                            <View style={[styles.inputContainerStyle,
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
                                    <Button title="Submit" onPress={this.handleAddService} />
                                </View>
                                <View style={styles.rowButtonContainer}>
                                    <Button title="Cancel" onPress={() => this.setState({ showAddService: false })} />
                                </View>
                            </View>
                        </View>


                    </View>
                </Modal>


            </>
        );
    }
}