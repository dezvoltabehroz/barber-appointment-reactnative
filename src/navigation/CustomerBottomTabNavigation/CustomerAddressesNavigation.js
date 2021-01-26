
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
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();


function CustomerAddressesRoutes() {
    return (
        <Stack.Navigator initialRouteName="MyAddresses">
            <Stack.Screen name="AddYourAddress" component={AddYourAddressScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Add your address</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="AddAddress" component={AddAddress} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Add your address</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="MyAddresses" component={MyAddressesScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>My Addresses</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="EditYourAddress" component={EditYourAddressScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Edit your address</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="EditAddress" component={EditAddressScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Edit your address</Text></View>),
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

export default CustomerAddressesRoutes;