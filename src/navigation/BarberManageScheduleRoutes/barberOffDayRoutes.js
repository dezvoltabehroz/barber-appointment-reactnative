
import React from 'react';
import { StyleSheet, Dimensions, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BarberOffDaysScreen from '../BarberNavigation/BarberOffDaysScreen';
import BarberAddLeaveScreen from '../BarberNavigation/BarberAddLeaveScreen';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();


function BarberOffDaysRoutes() {
    return (
        <Stack.Navigator initialRouteName="OffDays">

            <Stack.Screen name="OffDays" component={BarberOffDaysScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="AddLeave" component={BarberAddLeaveScreen} options={{
                headerShown: false,
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

export default BarberOffDaysRoutes;