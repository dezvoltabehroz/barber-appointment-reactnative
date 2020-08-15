import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// import { MainScreenPaths } from '../../screens';
import PhoneNumberScreen from './PhoneNumberScreen';
import PhoneVerificatinScreen from './PhoneVerificationScreen'
import PhoneVerifiedScreen from './PhoneVerifiedScreen';
import UpdateProfileScreen from './UpdateProfileScreen';
import HomeScreen from './HomeScreen';
import EmailandPasswordScreen from './EmailandPasswordScreen';
import SubCategoryScreen from './SubCategoryScreen';
import SubCategoryServicesScreen from './SubCategoryServicesScreen';
import BarberListScreen from './BarberListScreen';
import BarberProfileScreen from './BarberProfileScreen';
import BookingScreen from './BookingScreen';
import AppointmentsScreen from './AppointmentsScreen';
import CustomerServicesScreen from './CustomerServicesScreen';
import ServiceCompleteScreen from './ServiceCompleteScreen';

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
            <Stack.Screen name="EmailandPassword" component={EmailandPasswordScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Enter Email and Password </Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="Appointments" component={AppointmentsScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Appointments</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="SubCategory" component={SubCategoryScreen}
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerTintColor: 'white',
                    headerTransparent: true,
                    headerTitle: () => (<View><Text style={styles.headerTitleStyle}>{route.params.name}</Text></View>),
                    headerTitleAlign: 'center',
                })}
            />
            <Stack.Screen name="SubCategoryServices" component={SubCategoryServicesScreen}
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerTintColor: 'white',
                    headerTransparent: true,
                    headerTitle: () => (<View><Text style={styles.headerTitleStyle}>{route.params.name}</Text></View>),
                    headerTitleAlign: 'center',
                })}
            />
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
            <Stack.Screen name="Booking" component={BookingScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Book an appointment</Text></View>),
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

