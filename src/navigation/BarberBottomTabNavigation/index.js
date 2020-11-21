
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BarberRoutes from '../BarberNavigation';
import { Icon } from '../../components';
import NotificationScreen from '../BarberNavigation/NotificationScreen';
import EditProfileScreen from '../BarberNavigation/EditProfileScreen';
import THEME from '../../assets/styles/theme.style'
import BarberProfileRoutes from './barberUpdateProfileNavigation';
import BarberNotificationRoutes from './barberNotificationNavigation';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Bottom = createBottomTabNavigator();


function BarberBottomNavigationRoutes() {
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
            <Bottom.Screen name="Home" component={BarberRoutes} />
            <Bottom.Screen name="Profile" component={BarberProfileRoutes} />
            <Bottom.Screen name="Notification" component={BarberNotificationRoutes} />
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

export default BarberBottomNavigationRoutes;