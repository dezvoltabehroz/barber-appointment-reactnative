
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationScreen from '../BarberNavigation/NotificationScreen';
import ServiceDetailsScreen from '../BarberNavigation/ServiceDetailsScreen';
import BarberServiceAcceptScreen from '../BarberNavigation/BarberServiceAcceptScreeen';
import BarberStartServiceScreen from '../BarberNavigation/BarberStartServiceScreen';
import BarberEndServiceScreen from '../BarberNavigation/BarberEndServiceScreen';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();


function BarberNotificationRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Notificatons" component={NotificationScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={[styles.headerTitleStyle,{paddingBottom:'2.5%'}]}>Notification</Text></View>),
            }} />
            <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>List of Services & Details</Text></View>),
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
            <Stack.Screen name="BarberServiceAccept" component={BarberServiceAcceptScreen} options={{
                headerBackTitleVisible: false,
                headerBackImage: () => (<View><Text style={styles.headerBackTitle}>Cancel</Text></View>),
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Customer Location</Text></View>),
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

export default BarberNotificationRoutes;