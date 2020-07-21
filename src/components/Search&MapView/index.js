

import React, { Component } from 'react';
import {
    StyleSheet,
    StatusBar,
    View,
    Dimensions,
    Alert,
    ScrollView
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Heatmap } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Geolocation from '@react-native-community/geolocation';
import styles from './style';
import THEME from '../../assets/styles/theme.style';

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
    }

    render() {
        return (
            <>
                <ScrollView>

                    <View style={styles.searchBarContainer}>
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
                                    // marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 44,
                                    backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR
                                },
                                textInput: {
                                    marginTop: '4%',
                                    height: 54,
                                },
                                textInputContainer: {
                                    width: '100%',
                                    height: 80,
                                    backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR
                                },
                                description: {
                                    fontWeight: 'bold',
                                    color: '#fff'
                                },
                                powered: {
                                    backgroundColor: THEME.COLOR_WHITE,
                                }

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
                            debounce={400} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        />
                    </View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation={true}
                        loadingEnabled
                        needsOffscreenAlphaCompositing={true}
                        showsMyLocationButton={true}
                        style={styles.mapStyle}
                        region={this.state.region}
                    // onRegionChangeComplete={this.onRegionChange}
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
                </ScrollView>



            </>
        );
    }
};



export default SearchandMapView;
