import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style';

const Tabs = ({ tabs, active, onTabChange }) => (
    <View style={styles.container}>
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: 'row' }}>
            {
                tabs.map((tab, i) => (
                    <React.Fragment key={i}>
                        <TouchableOpacity
                            style={tabs.length == 2 ? [styles.innerContainer, { marginHorizontal: 40 }] : [styles.innerContainer, { marginHorizontal: 20 }]}
                            onPress={() => onTabChange(i)}>
                            <Text style={{fontFamily:"Poppins-Medium", fontSize: 14, color: i === active ? THEME.PRIMARY_COLOR : 'white', borderBottomWidth: i === active ? 1 : 0, paddingBottom: 1, borderColor: THEME.PRIMARY_COLOR }}>{tab}</Text>
                        </TouchableOpacity>
                        {
                            i !== tabs.length - 1 ?
                                < View style={{ borderRadius: 0, borderColor: 'black', borderWidth: 0, marginVertical: 20 }} /> : null
                        }
                    </React.Fragment>
                ))
            }
        </ScrollView>
    </View>
);
const styles = StyleSheet.create({
    container: {
        height: 35,
        display: 'flex',
        justifyContent: 'center'
    },
    innerContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },

})

export default Tabs;
