
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '../../../components';
import PhoneNumberScreen from '../PhoneNumberScreen';
import PhoneVerificatinScreen from '../PhoneVerificationScreen'
import PhoneVerifiedScreen from '../PhoneVerifiedScreen';
import UpdateProfileScreen from '../UpdateProfileScreen';
import EmailandPasswordScreen from '../EmailandPasswordScreen';
import AddYourAddressScreen from '../AddYourAddressScreen';
import EditYourAddressScreen from '../EditYourAddressScreen';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();


function RegistrationRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PhoneVerified" component={PhoneVerifiedScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Phone Verified</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen}
                options={({ navigation, route }) => ({
                    headerBackTitleVisible: false,
                    headerTintColor: 'white',
                    headerTransparent: true,
                    headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Enter your phone number</Text></View>),
                    headerTitleAlign: 'center',
                    headerLeft: props => (<TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}><Icon.Ionicons name={Platform.OS == 'ios' ? "ios-arrow-back" : "md-arrow-back"} size={25} color="white" /></TouchableOpacity>),
                })} />
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
            <Stack.Screen name="AddYourAddress" component={AddYourAddressScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Add your address</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="EditYourAddress" component={EditYourAddressScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Edit your address</Text></View>),
                headerTitleAlign: 'center',
            }} />
        </Stack.Navigator>
    )

}

const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'Poppins-Bold'
    }
})

export default RegistrationRoutes;