import React, { Component } from 'react';
import { View, ActivityIndicator, Text, FlatList, LayoutAnimation, RefreshControl, UIManager, ImageBackground, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import styles from './style';
import { Button, Icon } from '../../../components'
import { connect } from 'react-redux'
import themeStyle from '../../../assets/styles/theme.style';
import { bindActionCreators } from "redux";
import { authActions } from '../../../redux/actions/auth';
import { userAddressActions } from '../../../redux/actions/addresses';
import { categoryActions } from '../../../redux/actions/category';
import { UserAddresses } from '../../../services';

class Home extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            loading: false,
            expandAddresses: false,
            servicelist1: [
                {
                    name: 'Appointment',
                    imageUrl: 'https://images.unsplash.com/photo-1580561650691-6562b4787600?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
                },
                {
                    name: 'My Addresses',
                    imageUrl: 'https://images.unsplash.com/photo-1580561650691-6562b4787600?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
                },
                {
                    name: 'Payment Method',
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
            servicelist: [
                {
                    name: 'About Us',
                    imageUrl: 'https://images.unsplash.com/photo-1580561650691-6562b4787600?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
                },
                {
                    name: 'Contact Us',
                    imageUrl: 'https://images.unsplash.com/photo-1580561650691-6562b4787600?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
                },
            ],
            addresses: [],
            address: ''

        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }


    componentDidMount = () => {
        let data = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token
        }
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
                    onPress={() => { (item.name == "About Us") ? onAboutUs() : item.name == "Contact Us" ? onContactUs() : item.name == "My Addresses" ? myAddresses() : onAppointments() }} style={styles.upperListItemContainer}>
                    <ImageBackground source={{ uri: `${item.imageUrl}` }}
                        style={styles.upperListImageStyle} imageStyle={{ borderRadius: 10 }}>
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
                    <ImageBackground source={item.picture ? { uri: item.picture } : image_url}
                        style={styles.lowerListImageStyle} imageStyle={{ borderRadius: 10 }}>
                        <View style={styles.lowerListTitleContainer}>
                            <Text style={styles.lowerListTitleStyle} >{item.category_name}</Text>
                            <View style={styles.line}></View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </>
        )
    }

    handleAddressPress = async (item) => {
        const { user } = this.props;
        item = { ...item, token: user.userData.token };
        await this.props.userAddressActions.defaultAddress(item, this.props.navigate);
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

        // this.props.userAddressActions.allAddresses(user.userData);
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

    render() {
        let { onExit, searchBarber } = this.props
        let { isUserLogedIn } = this.props.user;
        const { ourAppointment, servicelist, servicelist1, address, addresses } = this.state;
        const { user, userAddresses } = this.props;

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
                            <Text style={styles.appNameTextStyle}>Fleek</Text>
                            {
                                isUserLogedIn ?
                                    <>
                                        <TouchableOpacity style={styles.headingContainer}
                                            onPress={this.changeAddressLayout} >
                                            {
                                                address ?
                                                    <Text style={[styles.upperListTitleStyle, { fontSize: 12, textAlign: 'center' }]}>{address}</Text>
                                                    :
                                                    <ActivityIndicator size={20} color={themeStyle.COLOR_WHITE} />
                                            }

                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.exitContainer} onPress={onExit}>
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
                            <Text style={styles.appointmentTextStyle}>Make an Appointment</Text>
                            <TouchableOpacity style={[styles.searchBarberContainer,]} onPress={searchBarber}>
                                <Text style={styles.appointmentTextStyle}>Search Barber </Text>
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