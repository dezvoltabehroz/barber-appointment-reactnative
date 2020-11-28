
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationScreen from '../CustomerNavigation/NotificationScreen';
import CustomerServicesScreen from '../CustomerNavigation/CustomerServicesScreen'
import ServiceCompleteScreen from '../CustomerNavigation/ServiceCompleteScreen';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();


function CustomerNotificationRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Notificaton" component={NotificationScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Notification</Text></View>),
            }} />
            <Stack.Screen name="CustomerServices" component={CustomerServicesScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>List of Customer Services</Text></View>),
            }} />
              <Stack.Screen name="ServiceComplete" component={ServiceCompleteScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Review and Rate</Text></View>),
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

export default CustomerNotificationRoutes;