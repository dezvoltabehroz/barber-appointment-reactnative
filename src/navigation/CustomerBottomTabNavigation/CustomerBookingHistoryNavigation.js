
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationScreen from '../CustomerNavigation/NotificationScreen';
import CustomerServicesScreen from '../CustomerNavigation/CustomerServicesScreen'
import ServiceCompleteScreen from '../CustomerNavigation/ServiceCompleteScreen';
import MyAddressesScreen from '../CustomerNavigation/MyAddressesScreen';
import AddYourAddressScreen from '../CustomerNavigation/AddYourAddressScreen';
import AddAddress from '../CustomerNavigation/AddAddress';
import EditYourAddressScreen from '../CustomerNavigation/EditYourAddressScreen';
import EditAddressScreen from '../CustomerNavigation/EditAddressScreen';
import AppointmentsScreen from '../CustomerNavigation/AppointmentsScreen';
import RescheduleBookingScreen from '../CustomerNavigation/ReScheduleBookingScreen';
import CustomerChatScreen from '../CustomerNavigation/CustomerChatscreen';
import { Icon } from '../../components';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();


function CustomerBookingHistoryRoutes() {
    return (
        <Stack.Navigator initialRouteName="Appointments">
            <Stack.Screen name="Appointments" component={AppointmentsScreen} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                // headerLeft: props => (<TouchableOpacity onPress={() => navigation.replace('Customer', { screen: 'Home' })} style={{ marginLeft: 10 }}><Icon.Ionicons name={Platform.OS == 'ios' ? "ios-arrow-back" : "md-arrow-back"} size={25} color="white" /></TouchableOpacity>),
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Appointments</Text></View>),
                headerTitleAlign: 'center',
            })} />
            <Stack.Screen name="EditBooking" component={RescheduleBookingScreen} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerLeft: props => (<TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}><Icon.AntDesign name="caretleft" size={25} color="white" /></TouchableOpacity>),
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Reschedule Booking</Text></View>),
                headerTitleAlign: 'center',
            })} />
            <Stack.Screen name="Chat" component={CustomerChatScreen} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerLeft: props => (<TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}><Icon.AntDesign name="caretleft" size={25} color="white" /></TouchableOpacity>),
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Chat</Text></View>),
            })} />
             <Stack.Screen name="CustomerServices" component={CustomerServicesScreen} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerLeft: props => (<TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}><Icon.AntDesign name="caretleft" size={25} color="white" /></TouchableOpacity>),
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>List of Customer Services</Text></View>),
            })} />
            <Stack.Screen name="ServiceComplete" component={ServiceCompleteScreen} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerLeft: props => (<TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}><Icon.AntDesign name="caretleft" size={25} color="white" /></TouchableOpacity>),
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Review and Rate</Text></View>),
            })} />
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

export default CustomerBookingHistoryRoutes;