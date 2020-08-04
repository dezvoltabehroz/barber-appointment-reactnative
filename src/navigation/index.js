import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';

import BarberRoutes from './BarberNavigation';
import CustomerRoutes from './CustomerNavigation';
import AuthScreen from './AuthScreen/AuthScreen';
import AboutUsScreen from './AboutUsScreen';

const Stack = createStackNavigator();

function AppRoutes() {
    return (
        <Stack.Navigator initialRouteName="Auth" >
            <Stack.Screen name="Auth" component={AuthScreen} options={{
                headerShown: false
            }} />
             <Stack.Screen name="AboutUs" component={AboutUsScreen}options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>About Us</Text></View>),
                headerTitleAlign: 'center',
            }}  />
            <Stack.Screen name="Barber" component={BarberRoutes} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Customer" component={CustomerRoutes} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'Poppins-Bold'
    }
})

export default AppRoutes;


