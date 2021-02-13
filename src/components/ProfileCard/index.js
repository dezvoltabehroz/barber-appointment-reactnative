import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from '../'
import THEME from '../../assets/styles/theme.style'
import User from '../../assets/svg/user.svg';
import Calender from '../../assets/svg/calendar.svg';
import Wallet from '../../assets/svg/services.svg';
import Portfolio from '../../assets/svg/cv.svg';
import Chat from '../../assets/svg/chat.svg';
import Licence from '../../assets/svg/diploma.svg';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const ProfileCard = ({ heading, description, icon, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.dashboardCard}>
            {/* <View style={[styles.dashboardCardIconBackground, { backgroundColor: icon == "calendar-alt" ? null : THEME.PRIMARY_COLOR }]}>
                
            </View> */}
            {
                heading == 'Profile' ?
                    <User height={61} width={61} />
                    : heading == 'Portfolio' ?
                        <Portfolio height={61} width={61} />
                        : heading == 'History' ?
                            <Calender height={61} width={61} />
                            : heading == 'Licence' ?
                                <Licence height={61} width={61} />
                                : heading == 'Wallet' ?
                                    <Wallet height={61} width={61} />
                                    : heading == 'Chat' ?
                                        <Chat height={61} width={61} />
                                        : heading == 'Call' ?
                                            <View style={{ height: 71, width: 71, justifyContent: "center", alignItems: "center", backgroundColor: THEME.PRIMARY_COLOR, borderRadius: 40 }}>
                                                <Icon.Feather name="phone-call" size={30} />
                                            </View>
                                            : null
            }
            <View style={{ marginTop: '5%' }}>
                <Text
                    style={styles.dashboardCardHeading}
                >
                    {heading}
                </Text>
                {/* <Text style={styles.dashboardCardDesc}>
                    {description}
                </Text> */}
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({

    dashboardCard: {
        marginHorizontal: 20,
        height: screenWidth * 0.35,
        width: screenWidth * 0.35,
        justifyContent: "center",
        alignItems: 'center',
        // borderColor: '#888',
        backgroundColor: '#171717',
        // borderRadius: 10,
        // borderWidth: 1,
        // paddingHorizontal: 12,
        // paddingVertical: 16,
        // alignSelf: 'center',
        marginTop: '5%',

        // shadowOffset: { width: 2, height: 2 },
        // shadowColor: "rgba(14, 14, 14, 0.66)",
        // shadowOpacity: 0.5,
        // shadowRadius: 2,
        // elevation: 5,
    },
    dashboardCardHeading: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        lineHeight: 20,
        color: THEME.PRIMARY_COLOR,
        letterSpacing: 0.04,
    },
    dashboardCardDesc: {
        fontFamily: 'Poppins-Medium',
        fontSize: 10,
        lineHeight: 12,
        color: 'lightgray',
        letterSpacing: 0.04,
        marginRight: 17
    },
    dashboardCardIconBackground: {
        backgroundColor: THEME.PRIMARY_COLOR,
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProfileCard