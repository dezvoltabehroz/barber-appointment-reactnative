import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BarberRoutes from './BarberNavigation';
import CustomerRoutes from './CustomerNavigation';
import AuthScreen from './AuthScreen/AuthScreen';

const Stack = createStackNavigator();

function AppRoutes() {
    return (
        <Stack.Navigator initialRouteName="Auth" >
            <Stack.Screen name="Auth" component={AuthScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Barber" component={BarberRoutes} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Customer" component={CustomerRoutes} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    );
}

export default AppRoutes;


