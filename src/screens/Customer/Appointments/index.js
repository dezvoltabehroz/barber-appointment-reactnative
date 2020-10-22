import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from "react-native";
import styles from './style';
import { Avatar } from "react-native-elements";
import { Button, Icon } from "../../../components";
import StarRating from 'react-native-star-rating';
import THEME from '../../../assets/styles/theme.style';
import { BookingServices } from "../../../services";
import { connect } from "react-redux";
class Appointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingList: [],
            loading: false
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
                    this.setState({ bookingList: response.data.booking_list.reverse(), loading: false })
                }
            })
            .catch((err) => { console.log(err) })
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }



    _renderItems = (item) => {
        const { onView } = this.props;
        return (
            <TouchableOpacity onPress={() => onView(item.booking_id, item.barber_id)} style={styles.listItemContainer}>
                <View style={styles.cardStyle} >
                    <View style={styles.avatarContainer}>
                        <Avatar source={{ uri: item.profile_picture }} rounded={true} size={70} />
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTextStyle} >{item.full_name}</Text>
                        <Text style={styles.dateTextStyle} >Age: {item.age}</Text>
                        {/* <Text style={styles.dateTextStyle} > {item.rating==null?'':'Rating: '+item.rating+' / 5'} </Text> */}
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon.Ionicons name="ios-pencil" size={25} />
                        <Icon.Ionicons name="ios-trash-outline" size={25} />
                        {/* <Text style={styles.dateTextStyle} > {item.rating==null?'':'Rating: '+item.rating+' / 5'} </Text> */}
                    </View>
                </View>
                {/* <View style={styles.buttonContainer}>
                    <Button title='View' onPress={()=>onView(item.booking_id)} />
                </View> */}
            </TouchableOpacity>
        )
    }

    render() {
        const { loading, bookingList } = this.state
        return (
            <View style={styles.container}>
                {
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