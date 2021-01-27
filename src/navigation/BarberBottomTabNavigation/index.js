
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BarberRoutes from '../BarberNavigation';
import { Icon } from '../../components';
import THEME from '../../assets/styles/theme.style'
import BarberProfileRoutes from './barberUpdateProfileNavigation';
import BarberNotificationRoutes from './barberNotificationNavigation';
import { connect } from 'react-redux';
import { notificationActions } from '../../redux/actions/notification';
import { bindActionCreators } from "redux";
import BarberBookingHistoryRoutes from './barberBookingHistoryNavigation';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Bottom = createBottomTabNavigator();


function BarberBottomNavigationRoutes(props) {
    const Placeholder = () => {
        return (

            <View style={{ flex: 1, backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR, }}></View>
        )
    }
    const CreatePlaceholder = () => (

        <View style={{ flex: 1, backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR, paddingTop: '5%' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: '6%' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={[{ marginTop: '10%', textAlign: 'center' }, styles.headerTitleStyle]}>
                        Health and Safety Commitment
                    </Text>
                    <Text style={[{ marginTop: '5%' }, styles.modalTextStyle]}>
                        We will require clients & providers to sanitize their hands before undergoing any services.
                        Customers experiencing flu-like symptoms will be required to reschedule until they are symptom-free. Providers have the right to refuse services for his or her own safety.
                        Customers and/or providers may be asked to take a temperature reading before beginning the service to ensure your safety.
                        If you or someone you are in close contact with are sick within 24 hours of your appointment, please reschedule immediately.
                        ALL appointments must be rescheduled via the Fleek App along with submitting a medical Doctor’s note as confirmation to waive fees.
                        We will help you reschedule your appointment at a later date.
                        </Text>
                    <Text style={[{ marginTop: '5%' }, styles.modalMainHeading]}>
                        Face Coverings
                        </Text>
                    <Text style={styles.modalTextStyle}>
                        You must have your mask or face covering on AT ALL TIMES during the appointment. Please be sure to have a well fitted mask that covers both your whole mouth and nose. This must be worn throughout the entire appointment.
                        </Text>
                    <Text style={[{ marginTop: '5%', }, styles.modalMainHeading]}>
                        Fleek Provider Duty
                        </Text>
                    <Text style={styles.modalTextStyle} >
                        As a safety percaution, all Fleek providers are required to:
                        </Text>
                    <Text style={styles.modalTextStyle}>
                        "Wear a face covering throughout the entire appointment."
                        </Text>
                    <Text style={styles.modalTextStyle}>
                        "Wear rubber gloves while conducting the service."
                        </Text>
                    <Text style={styles.modalTextStyle}>
                        "Maintain sanitary equipment for the health and safety of our customers"
                        </Text>
                </ScrollView>
            </View>
            {/* <View style={{ paddingTop: '5%' }}>
                <TouchableOpacity onPress={() => { props.authActions.healthAndSafety(false) }} style={{ backgroundColor: THEME.PRIMARY_COLOR, height: 50, borderRadius: 10, justifyContent: 'center' }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'Poppins-Medium' }} >Accept</Text>
                </TouchableOpacity>

            </View> */}
        </View>
    );
    return (
        <Bottom.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let icon;

                    if (route.name === 'Home') {
                        icon = <Icon.SimpleLineIcons name={"home"} size={size} color={color} />;

                    } else if (route.name === 'Mask') {
                        icon = focused
                            ? <Image source={require('../../assets/images/colorfulmask.png')} resizeMode='contain' style={{ height: 35, width: 35 }} />
                            : <Image source={require('../../assets/images/mask.png')} resizeMode='contain' style={{ height: 35, width: 35 }} />;

                    } else if (route.name === 'Booking') {
                        icon = <Icon.Ionicons name={"ios-calendar-sharp"} size={size} color={color} />;
                    } else if (route.name === 'Info') {
                        icon = <Icon.MaterialCommunityIcons name={"information-outline"} size={30} color={color} />;

                    } else if (route.name === 'Notification') {
                        icon = <Icon.FontAwesome name={"bell-o"} size={size} color={color} />;
                    }
                    return icon;
                },
            })}
            tabBarOptions={{
                showLabel: false,
                activeTintColor: THEME.PRIMARY_COLOR,
                inactiveTintColor: 'gray',
                style: {
                    borderTopWidth: 0,
                    backgroundColor: '#171717'
                }
            }}
        >
            <Bottom.Screen name="Home" component={BarberRoutes} options={({ navigation }) => {
                const { routes, index } = navigation.dangerouslyGetState();
                const { state: exploreState } = routes[index];
                let tabBarVisible = true;
                if (exploreState) {
                    const { routes: exploreRoutes, index: exploreIndex } = exploreState;
                    const exploreActiveRoute = exploreRoutes[exploreIndex];
                    if (exploreActiveRoute.name === "BarberChat") { tabBarVisible = false };
                }
                return {
                    tabBarVisible,
                };
            }} />
            <Bottom.Screen name="Mask" component={CreatePlaceholder} />
            <Bottom.Screen name="Booking" component={BarberBookingHistoryRoutes} options={({ navigation }) => {
                const { routes, index } = navigation.dangerouslyGetState();
                const { state: exploreState } = routes[index];
                let tabBarVisible = true;
                if (exploreState) {
                    const { routes: exploreRoutes, index: exploreIndex } = exploreState;
                    const exploreActiveRoute = exploreRoutes[exploreIndex];
                    if (exploreActiveRoute.name === "BarberChat") { tabBarVisible = false };
                }
                return {
                    tabBarVisible,
                };
            }} />
            <Bottom.Screen name="Notification" component={BarberNotificationRoutes} options={{
                tabBarBadge: props.notification.notificationCount == 0 ? null : props.notification.notificationCount,
                unmountOnBlur: true,
            }} />
            <Bottom.Screen name="Info" component={Placeholder} />
        </Bottom.Navigator>
    )

}

const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'Poppins-Bold'
    },
    modalMainHeading: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14, color: 'white'
    },
    modalTextStyle: {
        fontSize: 10,
        textAlign: 'justify', color: 'white',
        fontFamily: 'Poppins-Regular'
    }
})
const mapStateToProps = ({ notificationReducer, authReducer }) => {
    return {
        notification: notificationReducer || {},
        user: authReducer.userData || {}
    };
};


const mapDispatchToProps = dispatch => {
    return {
        notificationActions: bindActionCreators(notificationActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarberBottomNavigationRoutes);