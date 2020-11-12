import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ResumeScreen from '../BarberNavigation/ResumeScreen';
import THEME from '../../assets/styles/theme.style'
import { Text } from 'react-native';
import CertificationScreen from '../BarberNavigation/CertificationScreen';
import PersonalInfoScreen from '../BarberNavigation/PersonalInfoScreen';

const Tab = createMaterialTopTabNavigator();

function BarberTopNavigationRoutes() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarLabel: ({ focused, color }) => {
                let tabName;

                if (route.name === 'Certificate') {
                    tabName = "Certificate"
                } else if (route.name === 'Personal') {
                    tabName = "Personal";
                } else if (route.name === 'Resume') {
                    tabName = "Resume";
                }
                return <Text style={{ color: focused ? THEME.PRIMARY_COLOR : THEME.COLOR_GREY ,fontFamily:'Poppins-Medium'}} >{tabName}</Text>;
            },
        })}
            tabBarOptions={{
                
                activeTintColor: THEME.PRIMARY_COLOR,
                inactiveTintColor: 'gray',
                indicatorContainerStyle:{
                  backgroundColor:  THEME.PRIMARY_BACKGROUND_COLOR

                },
                indicatorStyle: {
                    backgroundColor: THEME.PRIMARY_COLOR
                }
            }}>
            <Tab.Screen name="Certificate" component={CertificationScreen} />
            <Tab.Screen name="Personal" component={PersonalInfoScreen} />
            <Tab.Screen name="Resume" component={ResumeScreen} />
        </Tab.Navigator>
    );
}
export default BarberTopNavigationRoutes;