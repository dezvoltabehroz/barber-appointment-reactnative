import React, { Component } from 'react';
import { View, ActivityIndicator, Text, FlatList, LayoutAnimation, RefreshControl, UIManager, ImageBackground, Alert, TouchableOpacity, Dimensions, ScrollView, Platform } from "react-native";
import styles from './style';
import { Button, Icon } from '../../../components'
import { connect } from 'react-redux'
import themeStyle from '../../../assets/styles/theme.style';
import { bindActionCreators } from "redux";
import { authActions } from '../../../redux/actions/auth';
import { userAddressActions } from '../../../redux/actions/addresses';
import { categoryActions } from '../../../redux/actions/category';
import { UserAddresses } from '../../../services';
import Image from 'react-native-fast-image';
import messaging from '@react-native-firebase/messaging';
import Modal from 'react-native-modal';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width
class Home extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            loading: false,
            expandAddresses: false,
            servicelist1: [
                {
                    name: 'My Fleek',
                    imageUrl: require('../../../assets/images/Rectangle.png')
                },
                {
                    name: 'My Addresses',
                    imageUrl: require('../../../assets/images/Rectangle.png')
                },
                {
                    name: 'Payment Method',
                    imageUrl: require('../../../assets/images/Rectangle.png')
                },
                {
                    name: 'About Us',
                    imageUrl: require('../../../assets/images/Rectangle.png')
                },
                {
                    name: 'Contact Us',
                    imageUrl: require('../../../assets/images/Rectangle.png')
                },
                {
                    name: 'PPE (Formerly About US)',
                    imageUrl: require('../../../assets/images/Rectangle.png')
                },
            ],
            servicelist: [
                {
                    name: 'About Us',
                    imageUrl: require('../../../assets/images/Rectangle.png')
                },
                {
                    name: 'Contact Us',
                    imageUrl:  require('../../../assets/images/Rectangle.png')
                },
            ],
            addresses: [],
            address: ''

        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }


    componentDidMount = async () => {
        messaging().onMessage(async remoteMessage => { });
        let { isUserLogedIn, userData } = this.props.user;
        let data = {
            id: userData.id,
            token: userData.token
        }
        if (isUserLogedIn) {
            UserAddresses.viewAllAddresses(data)
                .then((res) => {
                    res.data.addresses.forEach(element => {
                        if (element.is_selected == '1') {
                            this.setState({ address: element.address, addresses: res.data.addresses })
                        }
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }



    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }

    _renderItems = (item) => {
        const { onAboutUs, onContactUs, onAppointments, myAddresses } = this.props;
        return (
            <>
                <TouchableOpacity
                    onPress={() => { (item.name == "About Us") ? onAboutUs() : item.name == "Contact Us" ? onContactUs() : item.name == "My Addresses" ? myAddresses() : item.name == "My Fleek" ? onAppointments():item.name=='Payment Method'?Alert.alert("Attension","This screen is Under Development") : this.props.authActions.healthAndSafety(true) }} style={styles.upperListItemContainer}>
                    <ImageBackground source={item.imageUrl}
                        style={styles.upperListImageStyle} imageStyle={{ borderRadius: 10 }} >
                        <View style={styles.upperListTitleContainer}>
                            <Text style={styles.upperListTitleStyle} >{item.name}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </>
        )
    }

    _renderAppointmentItems = (item) => {
        const image_url = require('../../../assets/images/Salon-Category.jpg');
        const { onItemPress } = this.props;
        return (
            <>
                <TouchableOpacity onPress={() => onItemPress(item)} style={styles.lowerListItemContainer}>
                    <Image source={item.picture ? { uri: item.picture } : image_url}
                        style={styles.lowerListImageStyle}>
                        <View style={styles.lowerListTitleContainer}>
                            <Text style={styles.lowerListTitleStyle} >{item.category_name}</Text>
                            <View style={styles.line}></View>
                        </View>
                    </Image>
                </TouchableOpacity>
            </>
        )
    }

    handleAddressPress = async (item) => {
        const { user } = this.props;
        item = { ...item, token: user.userData.token };
        await this.props.userAddressActions.defaultAddress(item);
        this.setState({ address: '' });
        let data = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token
        }
        setTimeout(() => {
            UserAddresses.viewAllAddresses(data)
                .then((res) => {
                    res.data.addresses.forEach(element => {
                        if (element.is_selected == '1') {
                            this.setState({ address: element.address, addresses: res.data.addresses })
                        }
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }, 2000);
        this.setState({ expandAddresses: !this.state.expandAddresses })
    }

    changeAddressLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expandAddresses: !this.state.expandAddresses })
    }

    handleAddress = () => {
        const { userAddresses } = this.props;
        let data;
        userAddresses.addresses.forEach(element => {
            if (element.is_selected == '1') {
                data = element.address
            }
        })
        return data;
    }

    truncateString = (str, num) => {
        if (str.length <= num) {
            return str
        }
        return str.slice(0, num) + '...'
    }

    render() {
        let { onExit, searchBarber, goBack } = this.props
        let { isUserLogedIn } = this.props.user;
        const { servicelist, servicelist1, address, addresses } = this.state;
        // const { user } = this.props;
        return (
            <>
                <View style={styles.container}>
                    <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={this.props.loading}
                            onRefresh={async () => await this.props.userAddressActions.allAddresses(user.userData)}
                            tintColor={themeStyle.COLOR_WHITE}
                            colors={[themeStyle.PRIMARY_COLOR]}
                        />
                    }>
                        <View style={styles.nameContainer}>
                            {/* <Text style={styles.appNameTextStyle}>Fleek</Text> */}
                            {
                                isUserLogedIn ?
                                    <Image source={require('../../../assets/images/logo.png')} resizeMode='contain' style={styles.logoStyle} />
                                    :
                                    <TouchableOpacity onPress={() => goBack()}>
                                        <Image source={require('../../../assets/images/logo.png')} resizeMode='contain' style={styles.logoStyle} />
                                    </TouchableOpacity>
                            }
                            {
                                isUserLogedIn ?
                                    <>
                                        <TouchableOpacity style={styles.headingContainer}
                                            onPress={this.changeAddressLayout} >
                                            {
                                                address ?
                                                    <Text style={[styles.upperListTitleStyle, { fontSize: 12, textAlign: 'center' }]}>{this.truncateString(address, 28)}</Text>
                                                    :
                                                    <ActivityIndicator size={20} color={themeStyle.COLOR_WHITE} />
                                            }

                                        </TouchableOpacity>
                                        <TouchableOpacity disabled={address ? false : true} style={styles.exitContainer} onPress={() => onExit()}>
                                            <View style={{ paddingRight: '5%' }}>
                                                <Icon.Feather name="log-out" color="#fff" size={25} />
                                            </View>
                                        </TouchableOpacity>
                                    </> :
                                    null
                            }
                        </View>
                        <View style={{ marginTop: 0 }}>
                            {
                                this.state.expandAddresses ?
                                    <>
                                        <View style={{ height: this.state.expandAddresses ? null : 0, marginTop: "5%" }}>
                                            {
                                                addresses ?
                                                    addresses.map((item, index) => {
                                                        return (
                                                            <View style={styles.addressesContainer}>
                                                                <TouchableOpacity onPress={() => this.handleAddressPress(item)} style={{ flexDirection: 'row' }}>
                                                                    <View style={{ justifyContent: 'center' }}>
                                                                        <Icon.MaterialCommunityIcons name={item.is_selected == '1' ? 'radiobox-marked' : 'radiobox-blank'} size={themeStyle.ICON_SIZE} color={themeStyle.PRIMARY_COLOR} />
                                                                    </View>
                                                                    <View style={{ marginLeft: '5%' }}>
                                                                        <Text style={[styles.upperListTitleStyle]}> {item.label_as} </Text>
                                                                        <Text style={[styles.upperListTitleStyle, { fontSize: 12, }]}> {item.address} </Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </View>
                                                        )
                                                    })
                                                    :
                                                    <ActivityIndicator size={40} color={themeStyle.COLOR_WHITE} />
                                            }
                                        </View>
                                        <TouchableOpacity onPress={() => this.props.addNewAddress()} style={styles.addNewAddressContainer}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <Icon.AntDesign name='plus' size={themeStyle.ICON_SIZE} color={themeStyle.PRIMARY_COLOR} />
                                            </View>
                                            <View style={{ marginLeft: '5%', justifyContent: 'center' }}>
                                                <Text style={[styles.upperListTitleStyle, { fontSize: 12, }]}> Add new Address </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </> : null
                            }
                        </View>

                        <View style={[styles.upperListContainer]}>
                            <FlatList
                                data={isUserLogedIn ? servicelist1 : servicelist}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => this._renderItems(item)}
                                keyExtractor={item => item} />
                        </View>
                        <View style={[styles.nameContainer, { alignItems: 'center' }]}>
                            <Text style={styles.appointmentTextStyle}></Text>
                            <TouchableOpacity style={[styles.searchBarberContainer,]} onPress={searchBarber}>
                                <Text style={styles.appointmentTextStyle}>Search Fleek </Text>
                                <Icon.Feather name="search" color="#fff" size={15} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lowerListContainer}>
                            {
                                this.props.category.loading ?
                                    <ActivityIndicator />
                                    :
                                    <FlatList
                                        data={this.props.category.categories}
                                        showsVerticalScrollIndicator={false}
                                        ItemSeparatorComponent={this._renderSeparator}
                                        renderItem={({ item }) => this._renderAppointmentItems(item)}
                                        keyExtractor={item => item.id} />}
                        </View>
                    </ScrollView>
                </View>
                <Modal isVisible={this.props.user.modal}>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: '6%' }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={[{ marginTop: '10%', textAlign: 'center' }, styles.modalMainHeading]}>
                                    Health and Safety Commitment
                                </Text>
                                <Text style={[{ marginTop: '5%' }, styles.modalTextStyle]}>
                                    We will require clients & providers to sanitize their hands before undergoing any services.
                                    Customers experiencing flu-like symptoms will be required to reschedule until they are symptom-free. Providers have the right to refuse services for his or her own safety.
                                    Customers and/or providers may be asked to take a temperature reading before beginning the service to ensure your safety.
                                    If you or someone you are in close contact with are sick within 24 hours of your appointment, please reschedule immediately.
                                    ALL appointments must be rescheduled via the Fleek App along with submitting a medical Doctor’s note as confirmation to waive fees.
                                    We will help you reschedule your appointment at a later date.
                                    </Text>
                                <Text style={[{ marginTop: '5%' }, styles.modalMainHeading]}>
                                    Face Coverings
                                    </Text>
                                <Text style={styles.modalTextStyle}>
                                    You must have your mask or face covering on AT ALL TIMES during the appointment. Please be sure to have a well fitted mask that covers both your whole mouth and nose. This must be worn throughout the entire appointment.
                                    </Text>
                                <Text style={[{ marginTop: '5%', }, styles.modalMainHeading]}>
                                    Fleek Provider Duty
                                    </Text>
                                <Text style={styles.modalTextStyle} >
                                    As a safety percaution, all Fleek providers are required to:
                                    </Text>
                                <Text style={styles.modalTextStyle}>
                                    "Wear a face covering throughout the entire appointment."
                                    </Text>
                                <Text style={styles.modalTextStyle}>
                                    "Wear rubber gloves while conducting the service."
                                    </Text>
                                <Text style={styles.modalTextStyle}>
                                    "Maintain sanitary equipment for the health and safety of our customers"
                                    </Text>
                            </ScrollView>
                        </View>
                        <View style={{ paddingTop: '5%' }}>
                            <TouchableOpacity onPress={() => { this.props.authActions.healthAndSafety(false) }} style={{ backgroundColor: themeStyle.PRIMARY_COLOR, height: 50, borderRadius: 10, justifyContent: 'center' }}>
                                <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'Poppins-Medium' }} >Accept</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </Modal >
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {},
        userAddresses: state.userAddresses || {},
        category: state.categoryReducer || {}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        userAddressActions: bindActionCreators(userAddressActions, dispatch),
        categoryActions: bindActionCreators(categoryActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);