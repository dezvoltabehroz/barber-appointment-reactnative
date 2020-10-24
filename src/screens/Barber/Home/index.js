import React, { Component } from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, Alert, Image } from "react-native";
import styles from './style';
import { Button, Icon, SearchandMapView } from '../../../components'
import { connect } from 'react-redux';
import Geocoder from 'react-native-geocoder';
import THEME from '../../../assets/styles/theme.style'
class BarberHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servicelist: [
                {
                    name: 'Bookings History',
                    imageUrl: 'https://images.unsplash.com/photo-1580561650691-6562b4787600?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
                },
                {
                    name: 'Edit Profile',
                    imageUrl: 'https://images.unsplash.com/photo-1580561650691-6562b4787600?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
                },
                {
                    name: 'About Us',
                    imageUrl: 'https://images.unsplash.com/photo-1580561650691-6562b4787600?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
                },
                {
                    name: 'Contact Us',
                    imageUrl: 'https://images.unsplash.com/photo-1580561650691-6562b4787600?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
                },
            ],
            bookingList: [
                {
                    region: {
                        latitude: 32.1877,
                        longitude: 74.1945,
                        latitudeDelta: 0.9922,
                        longitudeDelta: 0.9421,
                    },
                    services: [
                        {
                            serviceName: 'Hair Cut',
                        },
                        {
                            serviceName: 'Hair Styling',
                        },
                        {
                            serviceName: 'Bread & Cut',
                        },
                        {
                            serviceName: 'Braiding',
                        },
                    ],
                    location: 'Gujranwala, Punjab, Pakistan',
                    serviceTime: {
                        date: '13/8/2020',
                        serviceBookedstartTime: '04:00',
                        serviceBookedendTime: '06:00',
                        day: 'Thursday'
                    }

                },
                {
                    region: {
                        latitude: 32.1877,
                        longitude: 74.1945,
                        latitudeDelta: 0.9922,
                        longitudeDelta: 0.9421,
                    },
                    services: [
                        {
                            serviceName: 'Hair Cut',
                        },
                        {
                            serviceName: 'Hair Styling',
                        },
                        {
                            serviceName: 'Bread & Cut',
                        },
                        {
                            serviceName: 'Braiding',
                        },
                    ],
                    location: 'Gujranwala, Punjab, Pakistan',
                    serviceTime: {
                        date: '13/8/2020',
                        serviceBookedstartTime: '04:00',
                        serviceBookedendTime: '06:00',
                        day: 'Thursday'
                    }

                },
                {
                    region: {
                        latitude: 32.1877,
                        longitude: 74.1945,
                        latitudeDelta: 0.9922,
                        longitudeDelta: 0.9421,
                    },
                    location: 'Gujranwala, Punjab, Pakistan',
                    services: [
                        {
                            serviceName: 'Hair Cut',
                        },
                        {
                            serviceName: 'Hair Styling',
                        },
                        {
                            serviceName: 'Bread & Cut',
                        },
                        {
                            serviceName: 'Braiding',
                        },
                    ],
                    serviceTime: {
                        date: '13/8/2020',
                        serviceBookedstartTime: '04:00',
                        serviceBookedendTime: '06:00',
                        day: 'Thursday'
                    }

                },

            ]


        }
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }

    _renderItems = (item) => {
        const { onItemPress, onAboutUs, onContactUs,onEditProfile } = this.props;
        return (
            <>
                <TouchableOpacity
                    onPress={() => { (item.name == "About Us") ? onAboutUs() : item.name == "Contact Us" ? onContactUs() : item.name == "Edit Profile" ? onEditProfile() : Alert.alert("Atention", "This screen is under Development") }} style={styles.upperListItemContainer}>
                    <ImageBackground source={{ uri: `${item.imageUrl}` }}
                        style={styles.upperListImageStyle} imageStyle={{ borderRadius: 10 }}>
                        <View style={styles.upperListTitleContainer}>
                            <Text style={[styles.upperListTitleStyle,{color:THEME.COLOR_WHITE}]} >{item.name}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </>
        )
    }

    handleFormatedText = (region, index) => {
        let pos = {
            lat: region.latitude,
            lng: region.longitude
        }
        var textLocation;
        Geocoder.geocodePosition(pos).then(res => {
            textLocation = res[0].formattedAddress
            let dataArr = [...this.state.bookingList];
            dataArr[index].location = textLocation;
            this.setState({ bookingList: dataArr });
        })
            .catch(error => alert(error));
    }
    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }
    _renderBookingItems = (item, index) => {
        const { onAccept } = this.props;
        return (
            <TouchableOpacity onPress={() => onAccept(item.region)} style={{backgroundColor:THEME.COLOR_WHITE,borderRadius:7, marginHorizontal: '5%',}}>
                {/* <View>
                    <SearchandMapView booking region={(item.region)} />
                </View> */}
                <View style={styles.locationContainer}>
                    <Icon.Entypo name='dot-single' color={THEME.COLOR_BLACK} size={20} />
                    <Text style={styles.upperListTitleStyle}>{item.location}</Text>
                </View>
                <View style={styles.serviceTimeContainer}>
                    <Icon.Entypo name='dot-single' color={THEME.COLOR_BLACK} size={20} />
                    <Text style={styles.upperListTitleStyle}>{item.serviceTime.day} {item.serviceTime.date} at {item.serviceTime.serviceBookedstartTime} to {item.serviceTime.serviceBookedendTime} </Text>
                </View>
                <View style={styles.serviceTimeContainer}>
                    <Icon.Entypo name='dot-single' color={THEME.COLOR_BLACK} size={20} />
                    <Text style={styles.upperListTitleStyle}>
                        {item.services.map((data) => {
                            return (<Text style={[styles.upperListTitleStyle]}>{data.serviceName}, </Text>)
                        })}....
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <View>
                        <TouchableOpacity style={styles.cancelContainer}>
                            <Text style={[styles.upperListTitleStyle,{color:THEME.COLOR_WHITE}]}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => onAccept(item.region)} style={styles.acceptContainer}>
                            <Text style={[styles.upperListTitleStyle,{color:THEME.COLOR_WHITE}]}>Accept</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        let { onExit } = this.props
        const { servicelist, bookingList } = this.state
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.nameContainer}>
                        {/* <Text style={styles.appNameTextStyle} >Fleek</Text> */}
                        <Image source={require('../../../assets/images/logo.png')} resizeMode='contain' style={styles.logoStyle} />
                        {<TouchableOpacity style={styles.exitContainer} onPress={onExit}>
                            <Icon.Feather name="log-out" color="#fff" size={25} />
                        </TouchableOpacity>}
                    </View>
                    <View style={styles.upperListContainer}>
                        <FlatList
                            data={servicelist}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => this._renderItems(item)}
                            keyExtractor={item => item} />
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.appointmentTextStyle}>My Bookings</Text>
                    </View>
                    <View style={styles.lowerListContainer}>
                        <FlatList
                            data={bookingList}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this._renderSeparator}
                            renderItem={({ item, index }) => this._renderBookingItems(item, index)}
                            keyExtractor={item => item} />
                    </View>
                </View>
            </>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(BarberHome)