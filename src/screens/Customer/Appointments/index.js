import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from "react-native";
import styles from './style';
import { Avatar } from "react-native-elements";
import { Button, Icon, Tabs } from "../../../components";
import StarRating from 'react-native-star-rating';
import THEME from '../../../assets/styles/theme.style';
import { BookingServices } from "../../../services";
import { connect } from "react-redux";
import moment from 'moment'
class Appointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingList: [],
            bookingCompletedList: [],
            loading: false,
            activeTab: 0
        }
    }

    componentDidMount = () => {
        this.setState({ loading: true })
        let userData = {
            id: this.props.user.id,
            token: this.props.user.token
        }
        BookingServices.getAllBooking(userData)
            .then((response) => {
                if (response.data.status) {
                    this.setState({ bookingList: response.data.booking_list })
                }
            })
            .catch((err) => { console.log(err) })
        BookingServices.getAllCompletedBooking(userData)
            .then((res) => {
                if (res.data.status) {
                    this.setState({ bookingCompletedList: res.data.booking_list })
                }
            })
            .catch((err) => { console.log(err) })
        this.setState({ loading: false })
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }



    _renderItems = (item) => {
        const { onView } = this.props;
        let difference = moment.duration(moment(item.booking_date).diff()).as("hours");
        console.log(difference)
        return (
            <TouchableOpacity onPress={() => onView(item.booking_id, item.barber_id, item.booking_date)} style={styles.listItemContainer}>
                <View style={styles.cardStyle} >
                    <View style={styles.avatarContainer}>
                        <Avatar source={{ uri: item.profile_picture }} rounded={true} size={70} />
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTextStyle} >{item.full_name}</Text>
                        <Text style={styles.dateTextStyle} >Age: {item.age}</Text>
                        <Text style={styles.dateTextStyle} >{moment(item.booking_date).format('Do MMM YYYY')} </Text>
                    </View>
                    {
                        difference > 24 ?
                            <View style={styles.iconContainer}>
                                <Icon.Ionicons name="ios-pencil" size={25} />
                                <Icon.Ionicons name="ios-trash-outline" size={25} />
                                {/* <Text style={styles.dateTextStyle} > {item.rating==null?'':'Rating: '+item.rating+' / 5'} </Text> */}
                            </View>
                            : null
                    }
                </View>
                {/* <View style={styles.buttonContainer}>
                    <Button title='View' onPress={() => onView(item.booking_id)} />
                </View> */}
            </TouchableOpacity>
        )
    }
    _renderBookingItems = (item) => {
        const { onView } = this.props;

        return (
            <TouchableOpacity onPress={() => onView(item.booking_id, item.barber_id, item.booking_date)} style={styles.listItemContainer}>
                <View style={styles.cardStyle} >
                    <View style={styles.avatarContainer}>
                        <Avatar source={{ uri: item.profile_picture }} rounded={true} size={70} />
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTextStyle} >{item.full_name}</Text>
                        <Text style={styles.dateTextStyle} >Age: {item.age}</Text>
                        <Text style={styles.dateTextStyle} >{moment(item.booking_date).format('Do MMM YYYY')} </Text>
                    </View>

                    {/* difference > 24 ?
                            <View style={styles.iconContainer}>
                                <Icon.Ionicons name="ios-pencil" size={25} />
                                <Icon.Ionicons name="ios-trash-outline" size={25} />
                                <Text style={styles.dateTextStyle} > {item.rating==null?'':'Rating: '+item.rating+' / 5'} </Text> 
                            </View> */}
                </View>
                {/* <View style={styles.buttonContainer}>
                    <Button title='View' onPress={() => onView(item.booking_id)} />
                </View> */}
            </TouchableOpacity>
        )
    }




    render() {
        const { loading, bookingList, activeTab, bookingCompletedList } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.tabContainer}>
                    <Tabs active={activeTab} tabs={['SCHEDULED', 'PENDING', 'COMPLETED']} onTabChange={(activeTab) => { this.setState({ activeTab }); console.log(activeTab) }} />
                </View>
                {
                    activeTab == 0 ?

                        loading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator />
                            </View>
                            :
                            bookingList.length == 0 ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: THEME.COLOR_WHITE, fontSize: 18, fontFamily: 'Poppin-Regular' }} >No Appointments Found</Text>
                                </View>
                                :
                                <FlatList
                                    refreshControl={<RefreshControl tintColor={THEME.COLOR_WHITE}
                                        colors={[THEME.PRIMARY_COLOR]} onRefresh={() => this.componentDidMount()} />}
                                    data={bookingList}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={this._renderSeparator}
                                    renderItem={({ item }) => this._renderItems(item)}
                                    keyExtractor={item => item} />
                        : null
                }
                {
                    activeTab == 2 ?

                        loading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator />
                            </View>
                            :
                            bookingCompletedList.length == 0 ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: THEME.COLOR_WHITE, fontSize: 18, fontFamily: 'Poppin-Regular' }} >No Bookings Were Found</Text>
                                </View>
                                :
                                <FlatList
                                    refreshControl={<RefreshControl tintColor={THEME.COLOR_WHITE}
                                        colors={[THEME.PRIMARY_COLOR]} onRefresh={() => this.componentDidMount()} />}
                                    data={bookingCompletedList}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={this._renderSeparator}
                                    renderItem={({ item }) => this._renderBookingItems(item)}
                                    keyExtractor={item => item} />
                        :
                        null
                }
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer.userData || {}
    };
};


export default connect(mapStateToProps)(Appointments)