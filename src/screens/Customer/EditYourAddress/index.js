import React, { Component } from 'react';
import {
    View, Image, Text, ScrollView, TouchableOpacity,
} from 'react-native';
import THEME from '../../../assets/styles/theme.style';
import styles from './style';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import { Button, FloatingInput, MessageInput, FooterButton } from "../../../components";
class EditYourAddress extends Component {
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
            subject: '',
            message: '',
            isSubjectFocus: false,
            isMessageFocus: false,
            labels: [
                { label: 'Home', selected: false },
                { label: 'Work', selected: false },
                { label: 'Other', selected: false }
            ],
            label: ''
        }
    }

    componentDidMount = () => {
        console.log(this.props.address)
        console.log(this.props.region)
        this.setState({
            address: this.props.address,
            region: this.props.region
        })
    }

    handlePressLabel = (index) => {
        let items = [...this.state.labels];
        items.forEach(val => {
            val.selected = false
        })
        items[index] = { ...items[index], selected: true };
        this.setState({ labels: items, label: items[index].label })
    }

    render() {
        const { name, email, subject, labels, isEmailFocus, isNameFocus, isSubjectFocus, isMessageFocus, message, submit } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <ScrollView>
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
                                onDragEnd={(e) => this.setState({
                                    region: {
                                        latitude: e.nativeEvent.coordinate.latitude,
                                        longitude: e.nativeEvent.coordinate.longitude,
                                        latitudeDelta: 0.005,
                                        longitudeDelta: 0.005,
                                    }
                                })}
                                draggable
                                opacity={0.5}
                                style={{ width: 20, height: 20 }}
                                coordinate={new AnimatedRegion({
                                    latitude: this.state.region.latitude,
                                    longitude: this.state.region.longitude,
                                    latitudeDelta: this.state.region.latitudeDelta,
                                    longitudeDelta: this.state.region.longitudeDelta,
                                })}
                            ></Marker.Animated>
                        </MapView>
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
                            <View style={[styles.inputContainerStyle,
                            isSubjectFocus || subject != '' ? THEME.inputBorder : {}]}>
                                <FloatingInput
                                    label={"Floor/Unit"}
                                    val={subject}
                                    onActive={() => this.setState({ isSubjectFocus: true })}
                                    onInActive={() => this.setState({ isSubjectFocus: false })}
                                    updateText={(subject) => this.setState({ subject })} />
                            </View>
                            <View style={[styles.messageContainerStyle,
                            isMessageFocus || message != '' ? THEME.inputBorder : {}]}>
                                <MessageInput
                                    label={"(Optional)"}
                                    val={message}
                                    multiline={true}
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
                    </ScrollView>
                </View>
                <View style={styles.footerStyle}>
                    <View style={styles.lineStyle}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={styles.buttonContainerStyle}>
                        <Button title="Save & Continue" onPress={()=>this.props.onNext()} />
                    </View>
                </View>
                {/* <FooterButton title="Save & Continue" onPress={()=>this.props.onNext()} /> */}
            </View>
        )
    }
}
export default EditYourAddress;
