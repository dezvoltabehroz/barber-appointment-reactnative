import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../../components';
import { Avatar } from 'react-native-elements';
import { authActions } from '../../redux/actions/auth';
import { useDispatch, connect } from 'react-redux';
import CustomerBottomTabNavigation from '../CustomerBottomTabNavigation';
import THEME from '../../assets/styles/theme.style'
import { Linking } from 'react-native';
const Drawer = createDrawerNavigator();
function CustomerDrawerNavigationRoutes(props) {
    return (
        <Drawer.Navigator drawerContent={(data) => <CustomDrawerContent props={props} {...data} />} initialRouteName="Home" >
            <Drawer.Screen name="Home" component={CustomerBottomTabNavigation} options={{
                swipeEnabled: false
            }} />
        </Drawer.Navigator>
    );
}

function CustomDrawerContent({ navigation, props }) {
    const dispatch = useDispatch();
    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#171717' }} >
                <View style={styles.upperContainer}>
                    <TouchableOpacity onPress={() => navigation.replace('Home')} style={styles.upperContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: '10%', alignItems: 'center' }}>
                            <View>
                                <Avatar source={{ uri: props?.user?.userData?.profile_picture }} size={70} rounded={true} />
                            </View>
                            <View style={{ justifyContent: 'center', width: "70%" }}>
                                <Text style={{ color: THEME.PRIMARY_COLOR, marginLeft: "10%", fontFamily: 'Poppins-Bold', }} >{props?.user?.userData?.full_name}</Text>
                                <Text style={{ color: "white", marginLeft: "10%", width: "80%", fontFamily: 'Poppins-Medium', fontSize: 8 }} >{props?.user?.userData?.email}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.7, paddingTop: '10%' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.itemStyle}>
                        <Icon.Feather name="user" color="#fff" size={25} />
                        <Text style={{ color: THEME.PRIMARY_COLOR, marginLeft: "10%", fontFamily: 'Poppins-Medium', fontSize: 12 }}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert("This screen is Under Development Coming Soon")} style={styles.itemStyle}>
                        <Icon.MaterialIcons name="payment" color="#fff" size={25} />
                        <Text style={{ color: THEME.PRIMARY_COLOR, marginLeft: "10%", fontFamily: 'Poppins-Medium', fontSize: 12 }} >Payment Method</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://fleekservices.com/')} style={styles.itemStyle}>
                        <Icon.Ionicons name="information-circle-outline" color="#fff" size={25} />
                        <Text style={{ color: THEME.PRIMARY_COLOR, marginLeft: "10%", fontFamily: 'Poppins-Medium', fontSize: 12 }} >About Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ContactUs')} style={styles.itemStyle}>
                        <Icon.MaterialCommunityIcons name="chat-alert-outline" color="#fff" size={25} />
                        <Text style={{ color: THEME.PRIMARY_COLOR, marginLeft: "10%", fontFamily: 'Poppins-Medium', fontSize: 12 }} >Contact Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        let userData = {
                            id: props.user.userData.id,
                            token: props.user.userData.token,
                        }
                        dispatch(authActions.removeUser(navigation.replace, userData))
                    }} style={styles.itemStyle}>
                        <Icon.Feather name="log-out" color="#fff" size={25} />
                        <Text style={{ color: THEME.PRIMARY_COLOR, marginLeft: "10%", fontFamily: 'Poppins-Medium', fontSize: 12 }} >Logout</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => alert("Terms and condition will be furnished soon")} style={styles.policyStyles}>
                        <Text style={{ color: "#707070", fontFamily: 'Poppins-Medium', fontSize: 12 }} >Terms & conditions / policy</Text>
                    </TouchableOpacity> */}
                </View>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: '10%', height: 54, width: 150, justifyContent: 'space-between', }}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/dhobiuncle.pk')}>
                        <Icon.FontAwesome name="facebook" size={20} color="#707070" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/dhobiuncle.pk/")}>
                        <Icon.FontAwesome name="instagram" size={20} color="#707070" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL("https://twitter.com/dhobiuncle")}>
                        <Icon.FontAwesome name="twitter" size={20} color="#707070" />
                    </TouchableOpacity>
                </View> */}
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
    },
    upperContainer: {
        flex: 0.3,
        justifyContent: 'center',
    },
    itemStyle: { flexDirection: 'row', height: 54, alignItems: 'center', paddingLeft: '10%' },
    policyStyles: { paddingLeft: '10%', paddingVertical: '10%' }
});

const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(CustomerDrawerNavigationRoutes);