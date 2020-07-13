import React from 'react';
import { View, Text, StyleSheet, Image,Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// import { MainScreenPaths } from '../../screens';
import PhoneNumberScreen from './PhoneNumberScreen';
import PhoneVerificatinScreen from './PhoneVerificationScreen'
import PhoneVerifiedScreen from './PhoneVerifiedScreen';
import UpdateProfileScreen from './UpdateProfileScreen';
import HomeScreen from './HomeScreen';
import EmailandPasswordScreen from './EmailandPasswordScreen';
import HairCareScreen from './HairCareScreen';
import BarberListScreen from './BarberListScreen';
import BarberProfileScreen from './BarberProfileScreen';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();

function CustomerRoutes() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Home" component={HomeScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="PhoneVerified" component={PhoneVerifiedScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Phone Verified</Text></View>),
                headerTitleAlign: 'center',
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
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Profile</Text></View>),
            }} />
            <Stack.Screen name="EmailandPassword" component={EmailandPasswordScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Enter Email and Password </Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="HairCare" component={HairCareScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Hair Care</Text></View>),
                headerTitleAlign: 'center',
            }} />
             <Stack.Screen name="BarberList" component={BarberListScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Barber List</Text></View>),
                headerTitleAlign: 'center',
            }} />
             <Stack.Screen name="BarberProfile" component={BarberProfileScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Barber Profile</Text></View>),
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
        fontFamily: 'Poppins-Bold'
    }
})

