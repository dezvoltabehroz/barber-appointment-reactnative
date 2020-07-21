/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import React, { Component } from 'react';
import {
    StyleSheet,
    StatusBar,
    View,
    Dimensions,
    Alert
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Geolocation from '@react-native-community/geolocation';

class SearchandMapView extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.9922,
                longitudeDelta: 0.9421,
            },
        }
    }

    goMap(data, details) {
        let searchObj = {
            searchData: data,
            searchDetails: details
        }
        console.log(searchObj.searchData)
        this.setState({
            region: {
                latitude: searchObj.searchDetails.geometry.location.lat,
                longitude: searchObj.searchDetails.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        })
    }

    componentDidMount = () => {
        this.findCoordinates();
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
                        latitudeDelta: this.state.region.latitudeDelta,
                        longitudeDelta: this.state.region.longitudeDelta,
                    }
                })
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 50000, maximumAge: 1000 }
        );
    };

    onRegionChange = (region) => {
        this.setState({ region });
        console.log(region)
    }

    render() {
        return (
            <>
                <View style={styles.map1}>
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed='auto'  // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        textInputProps={{ clearButtonMode: 'while-editing' }}
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            this.goMap(data, details);
                        }}
                        getDefaultValue={() => ''}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyCpNZMa_0hP9txbsGZVu2gNMqcZqHHRCbY',
                            language: 'en', // language of the results
                            // types: '(cities)' // default: 'geocode'
                            // components: "country:ng", // country name
                        }}

                        styles={{
                            container: {
                                marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 44,
                                backgroundColor: '#aaaaaa'
                            },
                            textInputContainer: {
                                width: '100%',
                            },
                            description: {
                                fontWeight: 'bold'
                            },
                            description: {
                                color: '#fff'
                            },
                            predefinedPlacesDescription: {
                                color: '#000'
                            },
                        }}
                        renderDescription={(row) => row.description || row.formatted_address || row.name}
                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                            key: 'AIzaSyCpNZMa_0hP9txbsGZVu2gNMqcZqHHRCbY',
                            language: 'en',
                        }}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            types: 'establishment'
                        }}
                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    />
                </View>

                <MapView
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    loadingEnabled
                    showsMyLocationButton={true}
                    style={styles.map}
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChange}
                // onRegionChange={onRegionChange}
                //onPanDrag={onPanDrag}
                // onMapReady={() => this.setState({ marginBottom: 1 })}
                >
                    <Marker.Animated
                        ref={marker => { this.marker = marker; }}
                        image={require('../../assets/images/green_pin.png')}
                        coordinate={new AnimatedRegion({
                            latitude: this.state.region.latitude,
                            longitude: this.state.region.longitude,
                            latitudeDelta: this.state.region.latitudeDelta,
                            longitudeDelta: this.state.region.longitudeDelta,
                        })}
                    ></Marker.Animated>
                </MapView>
            </>
        );
    }
};

const styles = StyleSheet.create({
    map: {
        height: screenHeight * 0.48, width: screenWidth,
        position: 'relative'
    },
    map1: {
        height: screenHeight * 0.2, width: screenWidth,
        position: 'relative'
    },
})

export default SearchandMapView;
