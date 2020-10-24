
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerRoutes from '../CustomerNavigation';
import { Icon } from '../../components';
import NotificationScreen from '../CustomerNavigation/NotificationScreen';
import EditProfileScreen from '../CustomerNavigation/EditProfileScreen';
import THEME from '../../assets/styles/theme.style'
import UpdateProfileScreen from '../CustomerNavigation/UpdateProfileScreen';
import EditProfile from '../../screens/Customer/EditProfile';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Bottom = createBottomTabNavigator();


function CustomerBottomNavigationRoutes() {
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
            <Bottom.Screen name="Home" component={CustomerRoutes} />
            <Bottom.Screen name="Profile" component={EditProfile} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerLeft: null,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Profile</Text></View>),
            }} />
            <Bottom.Screen name="Notification" component={NotificationScreen} />
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

export default CustomerBottomNavigationRoutes;