
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerRoutes from '../CustomerNavigation';
import { Icon } from '../../components';
import EditProfileScreen from '../CustomerNavigation/EditProfileScreen';
import THEME from '../../assets/styles/theme.style';
import CustomerNotificationRoutes from './CustomerNotificationNavigation';
import { connect } from 'react-redux';
import { notificationActions } from '../../redux/actions/notification';
import { bindActionCreators } from "redux";
import { Notifications } from '../../services';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Bottom = createBottomTabNavigator();



function CustomerBottomNavigationRoutes(props) {
    return (
        <Bottom.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-home'
                            : 'ios-home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'ios-person' : 'ios-person-outline';
                    } else if (route.name === 'Notification') {
                        iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
                    }
                    return <Icon.Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: THEME.PRIMARY_COLOR,
                inactiveTintColor: 'gray',
            }}
        >
            <Bottom.Screen name="Home" component={CustomerRoutes} options={({ navigation }) => {
                const { routes, index } = navigation.dangerouslyGetState();
                const { state: exploreState } = routes[index];
                let tabBarVisible = true;
                if (exploreState) {
                    const { routes: exploreRoutes, index: exploreIndex } = exploreState;
                    const exploreActiveRoute = exploreRoutes[exploreIndex];
                    if (exploreActiveRoute.name === "Chat") { tabBarVisible = false };
                }
                return {
                    tabBarVisible,
                };
            }} />
            <Bottom.Screen name="Profile" component={EditProfileScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerLeft: null,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Profile</Text></View>),
            }} />
            <Bottom.Screen name="Notification" component={CustomerNotificationRoutes} options={{
                tabBarBadge: props.notification.notificationCount == 0 ? null : props.notification.notificationCount,
                unmountOnBlur: true,
            }} />
        </Bottom.Navigator>
    )

}

const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'Poppins-Bold'
    }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerBottomNavigationRoutes)