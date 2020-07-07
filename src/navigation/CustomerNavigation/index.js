import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// import { MainScreenPaths } from '../../screens';
import PhoneNumberScreen from './PhoneNumberScreen';
import PhoneVerificatinScreen from './PhoneVerificationScreen'
import PhoneVerifiedScreen from './PhoneVerifiedScreen';
import UpdateProfileScreen from './UpdateProfileScreen';
import HomeScreen from './HomeScreen';
import EmailandPasswordScreen from './EmailandPasswordScreen';

const Stack = createStackNavigator();

function CustomerRoutes() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Home" component={HomeScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="PhoneVerified" component={PhoneVerifiedScreen} options={{
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
                 headerBackTitleVisible: false,
                 headerTintColor: 'white',
                 headerTransparent: true,
                 headerTitle: () => (null),
            }} />
             <Stack.Screen name="EmailandPassword" component={EmailandPasswordScreen} options={{
                 headerBackTitleVisible: false,
                 headerTintColor: 'white',
                 headerTransparent: true,
                 headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Enter Email and Password </Text></View>),
                 headerTitleAlign: 'center',
            }} />
        </Stack.Navigator>
    );
}

export default CustomerRoutes;


const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'Poppins-Medium'
    }
})

