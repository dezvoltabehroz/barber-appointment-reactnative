
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationScreen from '../BarberNavigation/NotificationScreen';
import ServiceDetailsScreen from '../BarberNavigation/ServiceDetailsScreen';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();


function BarberNotificationRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Notificaton" component={NotificationScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Notification</Text></View>),
            }} />
             <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>List of Services & Details</Text></View>),
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