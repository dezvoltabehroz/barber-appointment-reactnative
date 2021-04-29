import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import EmailandPasswordScreen from './EmailandPasswordScreen';
import PhoneNumberScreen from './PhoneNumberScreen';
import PhoneVerificatinScreen from './PhoneVerificationScreen'
import PhoneVerifiedScreen from './PhoneVerifiedScreen';
import UpdateProfileScreen from './UpdateProfileScreen';
import HomeScreen from './HomeScreen';
import ResumeScreen from './ResumeScreen';
import PortfolioScreen from './PortfolioScreen';
import ServicesScreen from './ServicesScreen';
import WorkingDaysScreen from './WorkingDaysScreen';
import ScheduleTimeScreen from './ScheduleTimeScreen';
import BarberServiceAcceptScreen from './BarberServiceAcceptScreeen';
import BarberStartServiceScreen from './BarberStartServiceScreen';
import BarberEndServiceScreen from './BarberEndServiceScreen';
import ServiceDetailsScreen from './ServiceDetailsScreen';
import BarberServiceCompleteScreen from './BarberServiceCompleteScreen';
import BarberChatScreen from './BarberChatScreen';
import EditProfileScreen from './EditProfileScreen';
import BarberBookingHistoryScreen from './BarberBookingHistoryScreen';
import BarberEditServicesScreen from './BarberEditServicesScreen';
import BarberProfileRoutes from '../BarberBottomTabNavigation/barberUpdateProfileNavigation';
import { Icon } from '../../components';
const Stack = createStackNavigator();

function BarberRoutes() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Home" component={HomeScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="PhoneVerified" component={PhoneVerifiedScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Phone Verified</Text></View>),
            }} />
            <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Enter your phone number</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="BarberBookingHistory" component={BarberBookingHistoryScreen} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerLeft: props => (<TouchableOpacity onPress={() => navigation.replace('EditProfile')} style={{ marginLeft: 10 }}><Icon.Ionicons name={Platform.OS == 'ios' ? "ios-arrow-back" : "md-arrow-back"} size={25} color="white" /></TouchableOpacity>),
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Appointment History</Text></View>),
                headerTitleAlign: 'center',
            })} />
            <Stack.Screen name="PhoneVerification" component={PhoneVerificatinScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Phone Verification</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="BarberServiceAccept" component={BarberServiceAcceptScreen} options={{
                headerBackTitleVisible: false,
                headerBackImage: () => (<View><Text style={[styles.headerBackTitle, { marginLeft: Platform.OS == 'ios' ? 10 : 0 }]}>Cancel</Text></View>),
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Customer Location</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Profile</Text></View>),
            }} />
            <Stack.Screen name="BarberStartService" component={BarberStartServiceScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Start Service</Text></View>),
            }} />
            <Stack.Screen name="BarberEndService" component={BarberEndServiceScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>End Service</Text></View>),
            }} />
            <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerLeft: props => (<TouchableOpacity onPress={() => navigation.replace('BarberBookingHistory')} style={{ marginLeft: 10 }}><Icon.Ionicons name={Platform.OS == 'ios' ? "ios-arrow-back" : "md-arrow-back"} size={25} color="white" /></TouchableOpacity>),
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>List of Services & Details</Text></View>),
            })} />
            <Stack.Screen name="EditProfile" component={BarberProfileRoutes} options={{
                headerShown: false
            }} />
            <Stack.Screen name="BarberServiceComplete" component={BarberServiceCompleteScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Review and Rate</Text></View>),
            }} />
            <Stack.Screen name="BarberChat" component={BarberChatScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Chat</Text></View>),
            }} />
            <Stack.Screen name="EmailandPassword" component={EmailandPasswordScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Email and Password</Text></View>),
            }} />
            <Stack.Screen name="Resume" component={ResumeScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Resume</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="Portfolio" component={PortfolioScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Portfolio</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="Services" component={ServicesScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Add Services</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="BarberEditServices" component={BarberEditServicesScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Services</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="WorkingDays" component={WorkingDaysScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Schedule</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="ScheduleTime" component={ScheduleTimeScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Schedule Time</Text></View>),
                headerTitleAlign: 'center',
            }} />
        </Stack.Navigator>
    );
}

export default BarberRoutes;
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

