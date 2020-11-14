import React, { Component } from 'react';
import {
    View, Image, Text, ScrollView, TouchableOpacity,
} from 'react-native';
import THEME from '../../../assets/styles/theme.style';
import styles from './style';
import Geocoder from 'react-native-geocoder';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import { Button, FloatingInput, MessageInput, FooterButton } from "../../../components";
import COMMON_STYLE from '../../../assets/styles/common.style';
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
        this.setState({ labels: items, label: items[index].label,submit:true })
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
            else{
                console.log('user is not login')
            }
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

                        <View>

                            <View style={styles.addressContainer}>
                                <View style={styles.rowContainer}>
                                    <View style={styles.imageContainer}>
                                        <Image source={require('../../../assets/images/avatar.png')} style={{ height: 35, width: 35 }} />
                                        <View style={styles.addressTextContainer}>
                                            <Text style={styles.addressTextStyle}>{this.state.address}</Text>
                                            <Text style={styles.addressTextStyle1}>{this.state.address}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => this.props.onEdit()} style={styles.editContainer}>
                                        <Text style={styles.addressTextStyle}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <View style={[styles.inputContainerStyle, submit ? { marginBottom: "6%" } : styles.inputContainerStyle,
                                isSubjectFocus || floor_unit != '' ? THEME.inputBorder : {}]}>
                                    <FloatingInput
                                        label={"Floor/Unit"}
                                        val={floor_unit}
                                        onActive={() => this.setState({ isSubjectFocus: true, })}
                                        onInActive={() => this.setState({ isSubjectFocus: false, submit: true })}
                                        updateText={(floor_unit) => this.setState({ floor_unit })} />
                                    {/* {
                                        submit && !floor_unit ? <Text style={COMMON_STYLE.errorText}>Please fill this field</Text> : null
                                    } */}
                                </View>

                                <View style={[styles.inputContainerStyle, { height: 74 },
                                isMessageFocus || message != '' ? THEME.inputBorder : {}]}>
                                    <FloatingInput
                                        label={"(Optional Note)"}
                                        val={message}
                                        // multiline={true}
                                        onActive={() => this.setState({ isMessageFocus: true })}
                                        onInActive={() => this.setState({ isMessageFocus: false })}
                                        updateText={(message) => this.setState({ message })} />
                                </View>
                            </View>
                            <View style={{ marginHorizontal: '5%' }}>
                                <Text style={styles.labelHeading}>Label as</Text>
                            </View>
                            <View style={styles.labelRowContainer}>
                                {
                                    labels.map((item, index) => {
                                        return (
                                            <TouchableOpacity key={index} onPress={() => this.handlePressLabel(index)} style={[styles.labelButtonContainer,
                                            item.selected ? styles.selectedButton : styles.nonSelectedButton]}>
                                                <Text style={{ fontFamily: 'Poppins-Medium', color: item.selected ? THEME.PRIMARY_COLOR : THEME.COLOR_GREY }}>{item.label}</Text>
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


                        </View>
                    </KeyboardAwareScrollView>

                </View>
                <View style={styles.footerStyle}>
                    <View style={styles.lineStyle}></View>
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
