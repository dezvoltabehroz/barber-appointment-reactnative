import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from './AuthScreen';
// import PhoneNumberScreen from './PhoneNumberScreen';
// import PhoneVerificatinScreen from './PhoneVerificationScreen'
// import PhoneVerifiedScreen from './PhoneVerifiedScreen';
// import UpdateProfileScreen from './UpdateProfileScreen';
// import HomeScreen from './HomeScreen';
// import CustomerRoutes from '../CustomerNavigation';
// import BarberRoutes from '../BarberNavigation';

const Stack = createStackNavigator();

function AuthRoutes() {
    return (
        <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen name="Auth" component={AuthScreen} options={{
                headerShown: false
            }} />
             {/* <Stack.Screen name="PhoneVerified" component={PhoneVerifiedScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Enter your phone number</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="PhoneVerification" component={PhoneVerificatinScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Phone Verification</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} options={{
                headerShown: false
            }} /> */}
             {/* <Stack.Screen name="CustomerHome" component={CustomerRoutes} options={{
                headerShown: false
            }} />
             <Stack.Screen name="BarberHome" component={BarberRoutes} options={{
                headerShown: false
            }} /> */}
        </Stack.Navigator>
    );
}

export default AuthRoutes;
const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'Poppins-Medium'
    }
})

