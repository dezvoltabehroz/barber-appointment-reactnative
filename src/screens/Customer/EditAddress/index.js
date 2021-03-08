import React, { Component } from 'react';
import {
    View, Image, Text, ScrollView, TouchableOpacity,
} from 'react-native';
import THEME from '../../../assets/styles/theme.style';
import styles from './style';
import Geocoder from 'react-native-geocoder';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import { Button, FloatingInput, MessageInput, FooterButton, Input, MessageTextInput } from "../../../components";
import COMMON_STYLE from '../../../assets/styles/common.style';
import Edit from '../../../assets/svg/edit.svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
class EditAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            },
            floor_unit: '',
            message: '',
            isSubjectFocus: false,
            isMessageFocus: false,
            labels: [
                { label: 'Home', is_selected: '0' },
                { label: 'Work', is_selected: '0' },
                { label: 'Other', is_selected: '0' }
            ],
            label: '',
            submit: false,
            address_id: '',
            user_id: '',

        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.componentDidMount();
        }
    }

    componentDidMount = () => {
        const { data, isUserLogged, address, region } = this.props
        if (isUserLogged) {
            if (data != undefined) {
                this.setState({
                    address: data.address != undefined ? data.address : address,
                    region: {
                        latitude: parseFloat(data.latitude),
                        longitude: parseFloat(data.longitude),
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    },
                    floor_unit: data.floor_unit,
                    message: data.additional_info,
                    address_id: data.id,
                    user_id: data.user_id
                })
            }
            else {
                this.setState({
                    address: address, region: region, floor_unit: '',
                    message: '',
                })
            }
        }
    }

    handlePressLabel = (index) => {
        let items = [...this.state.labels];
        items.forEach(val => {
            val.selected = false
        })
        items[index] = { ...items[index], selected: true };
        this.setState({ labels: items, label: items[index].label, submit: true })
    }

    handleSaveAndContinue = () => {
        // this.setState({ submit: true })
        const { region, address, label, floor_unit, message, submit } = this.state;
        if (region && address && label && submit) {
            if (this.props.isUserLogged) {
                let userdata = {
                    lat: region.latitude,
                    lng: region.longitude,
                    address: address,
                    floor_unit: floor_unit,
                    additional_info: message,
                    label_as: label,
                    id: this.state.user_id,
                    address_id: this.state.address_id
                }
                this.props.updateAddress(userdata)
            }
            else { }
        }
        this.setState({ submit: false })
    }

    handleDragFuntion = (e) => {
        this.setState({
            region: {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }
        })

        let pos = {
            lat: this.state.region.latitude,
            lng: this.state.region.longitude,
        }
        Geocoder.geocodePosition(pos).then(res => {
            this.setState({
                address: res[0].formattedAddress,
            })
        })
            .catch(error => alert(error));

    }


    render() {
        const { name, label, floor_unit, labels, isSubjectFocus, isMessageFocus, message, submit } = this.state;

        return (
            <View style={styles.container}>

                <View style={styles.upperContainer}>
                    <KeyboardAwareScrollView>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            showsUserLocation={true}
                            loadingEnabled
                            followUserLocation={true}
                            zoomEnabled={true}
                            showsMyLocationButton={true}
                            style={styles.mapStyle}
                            customMapStyle={THEME.mapStyle}
                            ref={ref => (this.mapView = ref)}
                            region={this.state.region}
                            // onRegionChangeComplete={updateProfile ? this.onRegionChange : () => { }}
                            // onRegionChange={onRegionChange}
                            // onPanDrag={onPanDrag}
                            onMapReady={() => {
                                this.mapView.animateToRegion(this.state.region, 2000);
                            }}>
                            <Marker.Animated
                                ref={marker => {
                                    this.marker = marker;
                                }}
                                onDragEnd={(e) => this.handleDragFuntion(e)}
                                draggable
                                opacity={0.5}
                                style={{ width: 20, height: 20 }}
                                coordinate={new AnimatedRegion({
                                    latitude: parseFloat(this.state.region.latitude),
                                    longitude: parseFloat(this.state.region.longitude),
                                    latitudeDelta: this.state.region.latitudeDelta,
                                    longitudeDelta: this.state.region.longitudeDelta,
                                })}
                            ></Marker.Animated>
                        </MapView>

                        <View style={styles.addressContainer}>
                            <View style={styles.rowContainer}>
                                <View style={styles.imageContainer}>
                                    {/* <Image source={require('../../../assets/images/avatar.png')} style={{ height: 35, width: 35 }} /> */}
                                    <View style={styles.addressTextContainer}>
                                        <Text style={[styles.addressTextStyle, { textTransform: "capitalize", color: THEME.PRIMARY_COLOR }]}>{this.state.address}</Text>
                                        {/* <Text style={styles.addressTextStyle1}>{this.state.address}</Text> */}
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => this.props.onEdit(true)} style={styles.editContainer}>
                                    {/* <Text style={styles.addressTextStyle}>Edit</Text> */}
                                    <Edit height={30} width={30} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            {/* <View style={[styles.inputContainerStyle, submit ? { marginBottom: "6%" } : styles.inputContainerStyle,
                            isSubjectFocus || floor_unit != '' ? THEME.inputBorder : {}]}> */}
                            <Input
                                placeholder={"Floor/Unit"}
                                value={floor_unit}
                                // onActive={() => this.setState({ isSubjectFocus: true, })}
                                // onInActive={() => this.setState({ isSubjectFocus: false, submit: true })}
                                onChangeText={(floor_unit) => this.setState({ floor_unit })} />
                            {/* {
                                    submit && !floor_unit ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                                } */}
                            {/* </View> */}

                            {/* <View style={[styles.inputContainerStyle, { height: 74 },
                            isMessageFocus || message != '' ? THEME.inputBorder : {}]}> */}
                            <MessageTextInput
                                placeholder={"(Optional Note)"}
                                value={message}
                                // multiline={true}
                                // onActive={() => this.setState({ isMessageFocus: true })}
                                // onInActive={() => this.setState({ isMessageFocus: false })}
                                onChangeText={(message) => this.setState({ message })} />
                            {/* </View> */}
                        </View>
                        {/* <View style={{ marginHorizontal: '5%' }}>
                            <Text style={styles.labelHeading}>Label as</Text>
                        </View> */}
                        <View style={styles.labelRowContainer}>
                            {
                                labels.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => this.handlePressLabel(index)} style={[styles.labelButtonContainer,
                                        item.selected ? styles.selectedButton : styles.nonSelectedButton]}>
                                            <Text style={{ fontFamily: 'Poppins-Bold', color: item.selected ? '#171717' : THEME.PRIMARY_COLOR }}>{item.label}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <View style={{ marginHorizontal: '5%' }}>
                            {
                                submit && !label ? <Text style={COMMON_STYLE.errorText}>Please select the label</Text> : null
                            }
                        </View>
                    </KeyboardAwareScrollView>
                    {/* </ScrollView> */}
                </View>
                <View style={styles.footerStyle}>
                    {/* <View style={styles.lineStyle}></View> */}
                    <View style={styles.gapHeight}></View>
                    <View style={styles.buttonContainerStyle}>
                        <Button disabled={label ? false : true} loading={this.props.loading} title="Save & Continue" onPress={this.handleSaveAndContinue} />
                    </View>
                </View>


            </View>
        )
    }
}
export default EditAddress;
