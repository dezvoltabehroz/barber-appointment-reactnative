import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from '../'


const ProfileCard = ({ heading, description, icon, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.dashboardCard}>
            <View style={styles.dashboardCardIconBackground}>
                <Icon.Ionicons name={icon} color='gray' size={20} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text
                    style={styles.dashboardCardHeading}
                >
                    {heading}
                </Text>
                <Text style={styles.dashboardCardDesc}>
                    {description}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    dashboardCard: {
        flexDirection: 'row',
        width: '90%',
        borderColor: '#888',
        // backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 16,
        alignSelf: 'center',
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
        color: 'white',
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
        backgroundColor: 'white',
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProfileCard