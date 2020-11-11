
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import UpdateProfileScreen from '../BarberNavigation/UpdateProfileScreen';
import ResumeScreen from '../BarberNavigation/ResumeScreen';
import PortfolioScreen from '../BarberNavigation/PortfolioScreen';
import ServicesScreen from '../BarberNavigation/ServicesScreen';
import PriceAndTimeScreen from '../BarberNavigation/PriceAndTimeScreen';
import WorkingDaysScreen from '../BarberNavigation/WorkingDaysScreen';
import ScheduleTimeScreen from '../BarberNavigation/ScheduleTimeScreen';
import EditProfileScreen from '../BarberNavigation/EditProfileScreen';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();


function BarberProfileRoutes() {
    return (
        <Stack.Navigator initialRouteName="EditProfile">
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Edit Your Profile</Text></View>),
            }} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Profile</Text></View>),
            }} />
            <Stack.Screen name="Resume" component={ResumeScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Resume</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="Portfolio" component={PortfolioScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Portfolio</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="Services" component={ServicesScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Services</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="PriceandTime" component={PriceAndTimeScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Services</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="WorkingDays" component={WorkingDaysScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Working Days</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="ScheduleTime" component={ScheduleTimeScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Schedule Time</Text></View>),
                headerTitleAlign: 'center',
            }} />
        </Stack.Navigator>
    )

}

const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'Poppins-Bold'
    }
})

export default BarberProfileRoutes;