import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator, } from 'react-native';
import THEME from '../../../assets/styles/theme.style'
import styles from './style'
import Image from 'react-native-fast-image';
import { Avatar, Header } from 'react-native-elements';
import moment from 'moment';
import { connect } from 'react-redux';
import { notificationActions } from '../../../redux/actions/notification';
import { Notifications } from '../../../services';
import { bindActionCreators } from "redux";


class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    UNSAFE_componentWillMount = async () => {

        await this.props.notificationActions.loading();
        Notifications.readAllNotifications(this.props.user)
            .then(async (res) => {
                if (res.data.status) {
                    console.log('Calling component did mount')
                    await this.props.notificationActions.getNotification(this.props.user)
                }
            })
    }
    componentDidMount = async () => {
        // await this.props.notificationActions.getNotification(this.props.user)
    }

    _renderItems = (item) => {
        const { onItemPress } = this.props;


        let difference = moment.duration(moment().diff(item.created_at)).as("hours");
        // console.log(moment('2020-11-21 12:00').calendar({
        //     lastDay: '[Yesterday at] hh:mm A',
        //     sameDay: difference > 20 ? '[Today at] hh:mm A' : moment('2020-11-21 16:00').fromNow(),
        //     lastWeek: '[last] dddd',
        //     sameElse: 'MMM DD, YYYY | hh:mm A',

        // }))
        const time = difference > 20 ? moment(item.created_at).format('MMM DD, YYYY | hh:mm A') : moment(item.created_at).fromNow()
        return (
            <>
                <View style={{ backgroundColor: item.is_read == '1' ? THEME.COLOR_WHITE : 'rgb(224, 250, 255)' }}>
                    <TouchableOpacity onPress={async () => {
                        await this.props.notificationActions.loading();
                        Notifications.readAllNotifications(this.props.user)
                            .then(async (res) => {
                                if (res.data.status) {
                                    await this.props.notificationActions.getNotification(this.props.user)
                                }
                            })
                    }} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: '8%', borderRadius: 7, paddingVertical: '1%' }}>
                        <View style={{ flex: 0.1, justifyContent: "center", alignItems: 'center', }}>
                            <View style={{ height: 40, width: 40, borderRadius: 30, borderWidth: 1, overflow: 'hidden', }}>
                                <Image source={{ uri: item.profile_picture }} resizeMode='cover' style={{ height: 40, width: 40, }} />
                            </View>
                        </View>
                        <View style={{ flex: 0.9, marginLeft: '5%' }}>
                            <Text style={[styles.upperListTitleStyle, { paddingTop: '2%' }]} >{item.message}</Text>
                            <Text style={styles.upperListTimeStyle}>{time}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        )
    }
    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }
    render() {
        const { loading, notifications } = this.props.notification;
        return (
            <>
                <View style={[styles.container, { paddingBottom: '1%' }]}>

                    {
                        loading ?
                            <View style={{ flex: 1, backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator />
                            </View>
                            :
                            <View style={{ flex: 1, backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR, paddingBottom: '1%' }}>
                                {notifications.length == 0 ?
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={styles.headerTitleStyle}>No Record Found</Text></View>
                                    :
                                    <FlatList
                                        data={notifications}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={loading}
                                                onRefresh={() => this.props.notificationActions.getNotification(this.props.user)}
                                                tintColor={THEME.COLOR_WHITE}
                                                colors={[THEME.PRIMARY_COLOR]}
                                            />
                                        }
                                        showsVerticalScrollIndicator={false}
                                        ItemSeparatorComponent={this._renderSeparator}
                                        renderItem={({ item }) => this._renderItems(item)}
                                        keyExtractor={item => item.id} />}
                            </View>
                    }
                </View>
            </>
        )
    }
}
const mapStateToProps = ({ notificationReducer, authReducer }) => {
    return {
        notification: notificationReducer || {},
        user: authReducer.userData || {}
    };
};
const mapDispatchToProps = dispatch => {
    return {
        notificationActions: bindActionCreators(notificationActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification)