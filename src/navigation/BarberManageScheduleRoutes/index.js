import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ResumeScreen from '../BarberNavigation/ResumeScreen';
import THEME from '../../assets/styles/theme.style'
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import BaberBreaksRoutes from './barberBreaksRoutes';
import BarberWorkingDaysRoutes from './barberManageScheduleRoutes';
import BarberOffDaysRoutes from './barberOffDayRoutes';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
function BarberManageSchedule() {
    return (
        <Stack.Navigator initialRouteName={"Schedule"} >
            <Stack.Screen name="Schedule" component={BarberManageScheduleRoutes} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Manage Schedule</Text></View>),
                headerTitleAlign: 'center',
            }} />
        </Stack.Navigator>
    )
}
function BarberManageScheduleRoutes() {
    return (

        <View style={styles.container}>
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
                {/* <Tab.Screen name="Working Days" component={BarberWorkingDaysRoutes} /> */}
                <Tab.Screen name="Break Time" component={BaberBreaksRoutes} />
                <Tab.Screen name="OFF Day" component={BarberOffDaysRoutes} />
            </Tab.Navigator>
        </View>

    );
}
const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'Poppins-Bold'
    },
    headerBackTitle: {
        fontSize: 12,
        color: "#fff",
        fontFamily: 'Poppins-Bold'
    },
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' ? screenHeight >= 812 ? '25%' : '18%' : '15%'
    }
})
export default BarberManageSchedule;