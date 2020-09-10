

import React, { Component } from 'react';
import {
    View,
    Alert,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Geolocation from '@react-native-community/geolocation';
import styles from './style';
import THEME from '../../assets/styles/theme.style';
import Geocoder from 'react-native-geocoder';
import { Icon } from '..';
import Config from '../../config/config.json';
const screenHeight = Dimensions.get('window').height;

class SearchandMapView extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            },
            modalView: false,
            name: '',
            currentLocation: {
                lat: 0,
                lng: 0
            }
        }
    }

    goMap(data, details) {
        let searchObj = {
            searchData: data,
            searchDetails: details
        }
        this.setState({
            region: {
                latitude: searchObj.searchDetails.geometry.location.lat,
                longitude: searchObj.searchDetails.geometry.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            },
            modalView: false,
            name: searchObj.searchDetails.formatted_address
        })
        this.props.address(this.state.name);
        this.props.onChange();
    }

    componentDidMount = () => {
        const { booking, region, accept } = this.props;
        if (booking || accept) {
            this.setState({ region: region })
        }
        else {
            this.findCoordinates();
        }
    }

    findCoordinates = () => {
        Geolocation.getCurrentPosition(
            position => {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                this.setState({
                    region: {
                        latitude: pos.lat,
                        longitude: pos.lng,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    },
                    currentLocation: {
                        lat: pos.lat,
                        lng: pos.lng,
                    }
                })
                Geocoder.geocodePosition(pos).then(res => {
                    this.setState({ name: res[0].formattedAddress }, () => this.props.address(this.state.name))
                })
                    .catch(error => alert(error));
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 50000, maximumAge: 1000 }
        );
    };

    onRegionChange = (region) => {
        this.setState({ region });
    }

    render() {
        let { updateProfile, booking, accept, change } = this.props;
        const { modalView, name } = this.state;
        return (
            <>{
                booking || accept || !change ?
                    null
                    :
                    <TouchableOpacity onPress={() => this.setState({ modalView: true })}>
                        <View style={styles.searchBarStyle} >
                            <Text style={styles.barTextStyle}>{name != '' ? name : "Search"}</Text>
                        </View>
                    </TouchableOpacity>}
                <MapView

                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    loadingEnabled
                    followUserLocation={true}
                    zoomEnabled={true}
                    showsMyLocationButton={true}
                    style={[styles.mapStyle, updateProfile ?
                        { height: screenHeight < 600 ? screenHeight * 0.6 : screenHeight * 0.69, }
                        :
                        booking ? { height: screenHeight < 600 ? screenHeight * 0.25 : screenHeight * 0.3, }
                            :
                            accept ?
                                { height: screenHeight < 600 ? screenHeight * 0.65 : screenHeight * 0.7, }
                                :
                                {}]}
                    customMapStyle={THEME.mapStyle}
                    ref={ref => (this.mapView = ref)}
                    region={this.state.region}
                    // onRegionChangeComplete={updateProfile ? this.onRegionChange : () => { }}
                    // onRegionChange={onRegionChange}
                    // onPanDrag={onPanDrag}
                    onMapReady={() => {
                        this.mapView.animateToRegion(this.state.region, 2000);
                    }}
                >
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
                        coordinate={new AnimatedRegion({
                            latitude: this.state.region.latitude,
                            longitude: this.state.region.longitude,
                            latitudeDelta: this.state.region.latitudeDelta,
                            longitudeDelta: this.state.region.longitudeDelta,
                        })}
                    ></Marker.Animated>
                </MapView>
                <Modal visible={change ? change : modalView}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={() => this.props.change ? this.props.onChange() : this.setState({ modalView: false })} style={{ marginTop: "15%" }}>
                            <Icon.Feather name="arrow-left" size={THEME.ICON_SIZE} color={THEME.COLOR_WHITE} />
                        </TouchableOpacity>
                    </View>
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        textInputProps={{
                            onFocus: () => this.setState({ isFocus: true }),
                            onBlur: () => this.setState({ isFocus: false })
                        }}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed='auto'  // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        textInputProps={{ clearButtonMode: 'while-editing' }}
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            this.setState({ isFocus: false })
                            this.goMap(data, details);
                        }}
                        getDefaultValue={() => ''}
                        query={Config.googleMaps}
                        styles={{
                            container: { backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR, },
                            textInput: { marginHorizontal: "5%", height: 54, color: 'black', },
                            textInputContainer: {
                                width: '100%',
                                height: 54,
                                borderBottomWidth: 0,
                                borderTopWidth: 0,
                                backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR, borderWidth: 0
                            },
                            description: { fontWeight: 'bold', color: THEME.COLOR_WHITE },
                        }}
                        renderDescription={(row) => row.description || row.formatted_address || row.name}
                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={Config.googleMaps}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            types: 'establishment'
                        }}
                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    />
                </Modal>
            </>
        );
    }
};



export default SearchandMapView;
