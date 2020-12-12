
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import UpdateProfileScreen from '../BarberNavigation/UpdateProfileScreen';
import ResumeScreen from '../BarberNavigation/ResumeScreen';
import PortfolioScreen from '../BarberNavigation/PortfolioScreen';
import ServicesScreen from '../BarberNavigation/ServicesScreen';
import BarberEditServicesScreen from '../BarberNavigation/BarberEditServicesScreen';
import WorkingDaysScreen from '../BarberNavigation/WorkingDaysScreen';
import ScheduleTimeScreen from '../BarberNavigation/ScheduleTimeScreen';
import EditProfileScreen from '../BarberNavigation/EditProfileScreen';
import LicenceAndCertificateScreen from '../BarberNavigation/LicenceAndCertificateScreen';
import AddServicesScreen from '../BarberNavigation/AddServicesScreen';
import AddPriceAndTimeScreen from '../BarberNavigation/AddPriceAndTimeScreen';
import BaberManageScheduleScreen from '../BarberNavigation/BarberManageScheduleScreen';
import BarberManageWorkingDaysScreen from '../BarberNavigation/BarberManageWorkingDaysScreen';
import BarberManageScheduleTimeScreen from '../BarberNavigation/BarberManageScheduleTimeScreen';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();


function BarberWorkingDaysRoutes() {
    return (
        <Stack.Navigator initialRouteName="ManageWorkingDays">

            <Stack.Screen name="ManageWorkingDays" component={BarberManageWorkingDaysScreen} options={{
                headerShown: false,
                // headerBackTitleVisible: false,
                // headerTintColor: 'white',
                // headerTransparent: true,
                // headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Working Days</Text></View>),
                // headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="ManageScheduleTime" component={BarberManageScheduleTimeScreen} options={{
                headerShown: false,
                // headerBackTitleVisible: false,
                // headerTintColor: 'white',
                // headerTransparent: true,
                // headerTitleAlign: 'center',
                // headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Manage Schedule Time</Text></View>),
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