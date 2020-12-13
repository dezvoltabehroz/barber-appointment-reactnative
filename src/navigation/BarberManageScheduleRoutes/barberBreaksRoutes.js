
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
import BarberBreaksScreen from '../BarberNavigation/BarberBreaksScreen';
import BarberAddBreakTimeScreen from '../BarberNavigation/BarberAddBreakTimeScreen';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();


function BarberBreaksRoutes() {
    return (
        <Stack.Navigator initialRouteName="BreakTime">

            <Stack.Screen name="BreakTime" component={BarberBreaksScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="AddBreakTime" component={BarberAddBreakTimeScreen} options={{
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

export default BarberBreaksRoutes;