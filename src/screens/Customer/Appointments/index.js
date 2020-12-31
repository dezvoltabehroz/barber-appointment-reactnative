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
            upcomingList: [],
            completedList: [],
            loading: false,
            activeTab: 0,
            pendingList: [],

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
                    this.setState({
                        completedList: response.data.completedList,
                        pendingList: response.data.pendingList,
                        upcomingList: response.data.upcomingList
                    })
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
        const { onView, onChat } = this.props;
        let userData = {
            customer_id: item.barber_id,
            full_name: item.full_name,
            email: 'johndoe@gmail.com',
            profile_picture: item.profile_picture
        }
        let difference = moment.duration(moment(item.booking_date).diff()).as("hours");
        return (
            <TouchableOpacity onPress={() => onView(item.booking_id, item.barber_id, item.booking_date, item.stepCounter)} style={styles.listItemContainer}>
                <View style={styles.cardStyle} >
                    <View style={styles.avatarContainer}>
                        <Avatar source={{ uri: item.profile_picture }} rounded={true} size={70} />
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTextStyle} >{item.full_name}</Text>
                        <Text style={styles.dateTextStyle} >Age: {item.age}</Text>
                        <Text style={styles.dateTextStyle} >{moment(item.booking_date).format('Do MMM YYYY')} at {item.booking_time}</Text>
                    </View>
                    {
                        difference > 24 ?
                            <View style={styles.iconContainer}>
                                <Icon.Ionicons name="ios-pencil" size={25} />
                                <View style={{ paddingTop: 10, paddingBottom: 15 }}>
                                    <Icon.Ionicons onPress={() => onChat(userData)} name="chatbubbles" size={25} />
                                </View>
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
            <TouchableOpacity onPress={() => onView(item.booking_id, item.barber_id, item.booking_date, true)} style={styles.listItemContainer}>
                <View style={styles.cardStyle} >
                    <View style={styles.avatarContainer}>
                        <Avatar source={{ uri: item.profile_picture }} rounded={true} size={70} />
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTextStyle} >{item.full_name}</Text>
                        <Text style={styles.dateTextStyle} >Age: {item.age}</Text>
                        <Text style={styles.dateTextStyle} >{moment(item.booking_date).format('Do MMM YYYY')} at {item.booking_time} </Text>
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
        const { loading, activeTab, completedList, pendingList, upcomingList } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.tabContainer}>
                    <Tabs active={activeTab} tabs={['SCHEDULED', 'PENDING', 'COMPLETED']} onTabChange={(activeTab) => { this.setState({ activeTab }); }} />
                </View>
                {
                    activeTab == 0 ?

                        loading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator />
                            </View>
                            :
                            upcomingList.length == 0 ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: THEME.COLOR_WHITE, fontSize: 18, fontFamily: 'Poppins-Regular' }} >No Appointments Found</Text>
                                </View>
                                :
                                <FlatList
                                    refreshControl={<RefreshControl tintColor={THEME.COLOR_WHITE}
                                        colors={[THEME.PRIMARY_COLOR]} onRefresh={() => this.componentDidMount()} />}
                                    data={upcomingList}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={this._renderSeparator}
                                    renderItem={({ item }) => this._renderItems(item)}
                                    keyExtractor={item => item} />
                        : null
                }
                {
                    activeTab == 1 ?

                        loading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator />
                            </View>
                            :
                            pendingList.length == 0 ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: THEME.COLOR_WHITE, fontSize: 18, fontFamily: 'Poppins-Regular' }} >No Appointments Found</Text>
                                </View>
                                :
                                <FlatList
                                    refreshControl={<RefreshControl tintColor={THEME.COLOR_WHITE}
                                        colors={[THEME.PRIMARY_COLOR]} onRefresh={() => this.componentDidMount()} />}
                                    data={pendingList}
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
                            completedList.length == 0 ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: THEME.COLOR_WHITE, fontSize: 18, fontFamily: 'Poppins-Regular' }} >No Bookings Were Found</Text>
                                </View>
                                :
                                <FlatList
                                    refreshControl={<RefreshControl tintColor={THEME.COLOR_WHITE}
                                        colors={[THEME.PRIMARY_COLOR]} onRefresh={() => this.componentDidMount()} />}
                                    data={completedList}
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