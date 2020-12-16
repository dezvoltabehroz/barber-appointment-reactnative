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
import CustomerBottomNavigationRoutes from './CustomerBottomTabNavigation';
import BarberBottomNavigationRoutes from './BarberBottomTabNavigation';
import ServicesScreen from './BarberNavigation/ServicesScreen';
import WorkingDaysScreen from './BarberNavigation/WorkingDaysScreen';
import ScheduleTimeScreen from './BarberNavigation/ScheduleTimeScreen';
import PriceAndTimeScreen from './BarberNavigation/PriceAndTimeScreen';
import PasswordResetRoutes from './PasswordResetNavigation';

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
            <Stack.Screen name="Forget" component={PasswordResetRoutes} options={{
                headerShown: false
            }} />
            <Stack.Screen name="ContactUs" component={ContactUsScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Contact Us</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="Barber" component={BarberBottomNavigationRoutes} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Customer" component={CustomerBottomNavigationRoutes} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Services" component={ServicesScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Add Services</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="PriceandTime" component={PriceAndTimeScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Price and Duration</Text></View>),
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
            <Stack.Screen name="CustomerWithOutSignIn" component={CustomerRoutes} options={{
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


