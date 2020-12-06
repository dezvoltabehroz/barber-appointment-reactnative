



import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ForgetPasswordScreen from '../ForgetPassword';
import ResetPasswordScreen from '../ResetPassword';
import NewPasswordScreen from '../NewPassword';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();


function PasswordResetRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Enter Your Email</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Enter Your Verification Code</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Enter Your New Password</Text></View>),
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

export default PasswordResetRoutes;