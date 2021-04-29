
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
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import { Icon } from '../../components';
import BarberEditWalletScreen from '../BarberNavigation/BarberEditWalletScreen';
import AddPaymentDetailsScreen from '../BarberNavigation/AddPaymentDetailsScreen';
import AddBankDetailsScreen from '../BarberNavigation/AddBankDetailsScreen';
const Stack = createStackNavigator();


function BarberProfileRoutes() {
    return (
        <Stack.Navigator initialRouteName="EditProfile">
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerLeft: props => (<TouchableOpacity onPress={() => navigation.replace('Home')} style={{ marginLeft: 10 }}><Icon.Ionicons name={Platform.OS == 'ios' ? "ios-arrow-back" : "md-arrow-back"} size={25} color="white" /></TouchableOpacity>),
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Edit Account</Text></View>),
            })} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Profile</Text></View>),
            }} />
            <Stack.Screen name="Resume" component={ResumeScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Resume</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="Portfolio" component={PortfolioScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Portfolio</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="Services" component={ServicesScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Services</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="BarberEditServices" component={BarberEditServicesScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Barber Edit Services</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="WorkingDays" component={WorkingDaysScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Schedule</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="ScheduleTime" component={ScheduleTimeScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Schedule Time</Text></View>),
                headerTitleAlign: 'center',
            }} />
            <Stack.Screen name="LicenceAndCertificate" component={LicenceAndCertificateScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Licence/Certificate</Text></View>),
            }} />
            <Stack.Screen name="ManageSchedule" component={BaberManageScheduleScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Manage Schedule</Text></View>),
            }} />
            <Stack.Screen name="ManageScheduleTime" component={BaberManageScheduleScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Manage Schedule Time</Text></View>),
            }} />
            <Stack.Screen name="AddServices" component={AddServicesScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Add Services</Text></View>),
            }} />
            <Stack.Screen name="AddPriceandTime" component={AddPriceAndTimeScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Price and Duration</Text></View>),
            }} />
            <Stack.Screen name="EditWallet" component={BarberEditWalletScreen} options={({ navigation, route }) => ({
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>{route.params.title}</Text></View>),
            })} />
            <Stack.Screen name="AddBankDetails" component={AddBankDetailsScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                unmountOnBlur:true,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Add Bank Details</Text></View>),
            }} />
            <Stack.Screen name="AddPaymentDetails" component={AddPaymentDetailsScreen} options={{
                headerBackTitleVisible: false,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Add Payment Details</Text></View>),
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

export default BarberProfileRoutes;