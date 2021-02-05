
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BarberManageWorkingDaysScreen from '../BarberNavigation/BarberManageWorkingDaysScreen';
import BarberManageScheduleTimeScreen from '../BarberNavigation/BarberManageScheduleTimeScreen';
import BarberManageSchedulerScreen from '../BarberNavigation/BarberManageSchedulerScreen';
import BarberManageSchedulerDetailScreen from '../BarberNavigation/BarberManageSchedulerDetailScreen'
import BarberManageEditSchedulerScreen from '../BarberNavigation/BarberManageEditSchedulerScreen';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();


function BarberWorkingDaysRoutes() {
    return (
        <Stack.Navigator initialRouteName="ManageScheduler">
            <Stack.Screen name="ManageScheduler" component={BarberManageSchedulerScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="ManageSchedulerDetail" component={BarberManageSchedulerDetailScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="ManageEditScheduler" component={BarberManageEditSchedulerScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="ManageWorkingDays" component={BarberManageWorkingDaysScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="ManageScheduleTime" component={BarberManageScheduleTimeScreen} options={{
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

export default BarberWorkingDaysRoutes;