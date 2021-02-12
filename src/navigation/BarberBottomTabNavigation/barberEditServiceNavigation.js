import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import BarberEditServicesScreen from '../BarberNavigation/BarberEditServicesScreen';
import AddServicesScreen from '../BarberNavigation/AddServicesScreen';
import AddPriceAndTimeScreen from '../BarberNavigation/AddPriceAndTimeScreen';

const Stack = createStackNavigator();

function BarberEditServiceRoutes() {
    return (
        <Stack.Navigator initialRouteName={"BarberEditServices"} >
              <Stack.Screen name="BarberEditServices" component={BarberEditServicesScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Barber Edit Services</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="AddServices" component={AddServicesScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Add Services</Text></View>),
            }} />
            <Stack.Screen name="AddPriceandTime" component={AddPriceAndTimeScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Price and Duration</Text></View>),
            }} />
        </Stack.Navigator>
    );
}

export default BarberEditServiceRoutes;
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

