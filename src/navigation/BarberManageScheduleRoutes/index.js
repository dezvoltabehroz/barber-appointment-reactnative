import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ResumeScreen from '../BarberNavigation/ResumeScreen';
import THEME from '../../assets/styles/theme.style'
import { Text } from 'react-native';
import BaberBreaksRoutes from './barberBreaksRoutes';
import BarberWorkingDaysRoutes from './barberManageScheduleRoutes';
import BarberOffDaysRoutes from './barberOffDayRoutes';
const Tab = createMaterialTopTabNavigator();

function BarberManageScheduleRoutes() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarLabel: ({ focused, color }) => {
                let tabName;

                if (route.name === 'Working Days') {
                    tabName = "Working Days"
                } else if (route.name === `Break Time`) {
                    tabName = "Break Time";
                } else if (route.name === 'OFF Day') {
                    tabName = "OFF Day";
                }
                return <Text style={{ color: focused ? THEME.PRIMARY_COLOR : THEME.COLOR_GREY, fontFamily: 'Poppins-Medium' }} >{tabName}</Text>;
            },
        })}
            tabBarOptions={{
                activeTintColor: THEME.PRIMARY_COLOR,
                inactiveTintColor: 'gray',
                indicatorContainerStyle: {
                    backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR
                },
                indicatorStyle: {
                    backgroundColor: THEME.PRIMARY_COLOR
                }
            }}>
            <Tab.Screen name="Working Days" component={BarberWorkingDaysRoutes} />
            <Tab.Screen name="Break Time" component={BaberBreaksRoutes} />
            <Tab.Screen name="OFF Day" component={BarberOffDaysRoutes} />
        </Tab.Navigator>
    );
}
export default BarberManageScheduleRoutes;