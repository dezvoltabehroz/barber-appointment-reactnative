import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from './AuthScreen';
const Stack = createStackNavigator();

function AuthRoutes() {
    return (
        <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen name="Auth" component={AuthScreen} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    );
}

export default AuthRoutes;

