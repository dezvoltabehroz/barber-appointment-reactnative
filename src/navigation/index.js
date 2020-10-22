import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';

import BarberRoutes from './BarberNavigation';
import CustomerRoutes from './CustomerNavigation';
import RegistrationRoutes from './CustomerNavigation/CustomerRegistration'
import AuthScreen from './AuthScreen/AuthScreen';
import AboutUsScreen from './AboutUsScreen';
import ContactUsScreen from './ContactUsScreen';
import AuthLoading from './AuthLoading';
import BottomNavigationRoutes from './BottomTabNavigation';

const Stack = createStackNavigator();

function AppRoutes() {
    return (
        <Stack.Navigator initialRouteName="AuthLoading" >
             <Stack.Screen name="AuthLoading" component={AuthLoading} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Auth" component={AuthScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Register" component={RegistrationRoutes} options={{
                headerShown: false
            }} />
            <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>About Us</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="ContactUs" component={ContactUsScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Contact Us</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="Barber" component={BarberRoutes} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Customer" component={BottomNavigationRoutes} options={{
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


