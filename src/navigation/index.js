import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// import SplashScreen from './SplashScreen'
import AuthScreen from './AuthScreen';
import PhoneNumberScreen from './PhoneNumberScreen';

const Stack = createStackNavigator();

function AppRoutes() {
    return (
        <Stack.Navigator initialRouteName="Auth">
            {/* <Stack.Screen name="Splash" component={SplashScreen} options={{
                headerShown: false
            }} /> */}

            <Stack.Screen name="Auth" component={AuthScreen} options={{
                headerShown: false
            }} />

            <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Enter your phone number</Text></View>),
                headerTitleAlign: 'center',
            }} />
        </Stack.Navigator>
    );
}

export default AppRoutes;
const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'Poppins-Medium'
    }
})

