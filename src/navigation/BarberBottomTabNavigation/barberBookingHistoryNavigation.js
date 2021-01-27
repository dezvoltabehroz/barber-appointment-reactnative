import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import BarberServiceAcceptScreen from '../BarberNavigation/BarberServiceAcceptScreeen';
import BarberStartServiceScreen from '../BarberNavigation/BarberStartServiceScreen';
import BarberEndServiceScreen from '../BarberNavigation/BarberEndServiceScreen';
import ServiceDetailsScreen from '../BarberNavigation/ServiceDetailsScreen';
import BarberServiceCompleteScreen from '../BarberNavigation/BarberServiceCompleteScreen';
import BarberChatScreen from '../BarberNavigation/BarberChatScreen';
import BarberBookingHistoryScreen from '../BarberNavigation/BarberBookingHistoryScreen';

const Stack = createStackNavigator();

function BarberBookingHistoryRoutes() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="BarberBookingHistory" component={BarberBookingHistoryScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Appointment History</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="BarberServiceAccept" component={BarberServiceAcceptScreen} options={{
                headerBackTitleVisible: false,
                headerBackImage: () => (<View><Text style={[styles.headerBackTitle, { marginLeft: Platform.OS == 'ios' ? 10 : 0 }]}>Cancel</Text></View>),
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Customer Location</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="BarberStartService" component={BarberStartServiceScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Start Service</Text></View>),
            }} />
            <Stack.Screen name="BarberEndService" component={BarberEndServiceScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>End Service</Text></View>),
            }} />
            <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>List of Services & Details</Text></View>),
            }} />

            <Stack.Screen name="BarberServiceComplete" component={BarberServiceCompleteScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Review and Rate</Text></View>),
            }} />
            <Stack.Screen name="BarberChat" component={BarberChatScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Chat</Text></View>),
            }} />
        </Stack.Navigator>
    );
}

export default BarberBookingHistoryRoutes;
const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'Poppins-Bold'
    },
    headerBackTitle: {
        fontSize: 12,
        color: "#fff",
        fontFamily: 'Poppins-Bold'
    }
})

