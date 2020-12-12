import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ResumeScreen from '../BarberNavigation/ResumeScreen';
import THEME from '../../assets/styles/theme.style'
import { Text } from 'react-native';
import BarberOffDaysScreen from '../BarberNavigation/BarberOffDaysScreen';
import BarberBreaksScreen from '../BarberNavigation/BarberBreaksScreen';
import BarberWorkingDaysRoutes from './barberManageScheduleRoutes';
const Tab = createMaterialTopTabNavigator();

function BarberManageScheduleRoutes() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarLabel: ({ focused, color }) => {
                let tabName;

                if (route.name === 'Working Days') {
                    tabName = "Working Days"
                } else if (route.name === `BreakTime`) {
                    tabName = "BreakTime";
                } else if (route.name === 'OFFDay') {
                    tabName = "OFFDay";
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
            <Tab.Screen name="BreakTime" component={BarberBreaksScreen} />
            <Tab.Screen name="OFFDay" component={BarberOffDaysScreen} />
        </Tab.Navigator>
    );
}
export default BarberManageScheduleRoutes;