import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import SubCategoryScreen from './SubCategoryScreen';
import SubCategoryServicesScreen from './SubCategoryServicesScreen';
import BarberListScreen from './BarberListScreen';
import BarberProfileScreen from './BarberProfileScreen';
import BookingScreen from './BookingScreen';
import AppointmentsScreen from './AppointmentsScreen';
import CustomerServicesScreen from './CustomerServicesScreen';
import ServiceCompleteScreen from './ServiceCompleteScreen';
import AddYourAddressScreen from './AddYourAddressScreen';
import EditYourAddressScreen from './EditYourAddressScreen';
import MyAddressesScreen from './MyAddressesScreen';
import EditAddressScreen from './EditAddressScreen';
import RescheduleBookingScreen from './ReScheduleBookingScreen';
import AddAddress from './AddAddress';
import { Icon } from '../../components';
import CustomerChatScreen from './CustomerChatscreen';
import EditProfileScreen from './EditProfileScreen';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();

function CustomerRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
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
            <Stack.Screen name="Appointments" component={AppointmentsScreen} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerLeft: props => (<TouchableOpacity onPress={() => navigation.replace('Customer', { screen: 'Home' })} style={{ marginLeft: 10 }}><Icon.Ionicons name={Platform.OS == 'ios' ? "ios-arrow-back" : "md-arrow-back"} size={25} color="white" /></TouchableOpacity>),
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Appointments</Text></View>),
                headerTitleAlign: 'center',
            })} />
            <Stack.Screen name="EditBooking" component={RescheduleBookingScreen} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerLeft: props => (<TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}><Icon.Ionicons name={Platform.OS == 'ios' ? "ios-arrow-back" : "md-arrow-back"} size={25} color="white" /></TouchableOpacity>),
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Reschedule Booking</Text></View>),
                headerTitleAlign: 'center',
            })} />
            <Stack.Screen name="Chat" component={CustomerChatScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Chat</Text></View>),
            }} />
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
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Stylist List</Text></View>),
                headerTitleAlign: 'center',
            }} />
             <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Edit Profile</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="BarberProfile" component={BarberProfileScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Barber Profile</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="Booking" component={BookingScreen}
                options={({ navigation, route }) => ({
                    headerBackTitleVisible: false,
                    headerTintColor: 'white',
                    headerTransparent: true,
                    headerRight: () => (<TouchableOpacity onPress={() => navigation.replace('Home')} style={{ marginRight: 10 }}><Text style={styles.headerRightTitleStyle}>Cancel</Text></TouchableOpacity>),
                    headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Book an appointment</Text></View>),
                    headerTitleAlign: 'center',
                })}
            />
        </Stack.Navigator>
    );
}

export default CustomerRoutes;


const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'Poppins-Bold'
    },
    headerRightTitleStyle: {
        fontSize: 10,
        color: "#fff",
        fontFamily: 'Poppins-Bold'
    }
})

