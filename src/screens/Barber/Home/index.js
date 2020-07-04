import React, { Component } from 'react';
import { View, StatusBar, Text, TouchableOpacity } from "react-native";
import styles from './style';
import { Avatar } from 'react-native-elements';
import { Icon } from '../../../components'
import THEME from '../../../assets/styles/theme.style';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: `${new Date().getDate()} / ${new Date().getMonth()} / ${new Date().getFullYear()}`,
            name: "Alexender Powell",
            avatar: "",
            totalPoints: 150
        }
    }

    render() {
        const { date, name, totalPoints } = this.state
        return (
            <>
                <StatusBar backgroundColor='#1E2023' />
                <View style={styles.container}>
                    <View style={styles.upperBackStyle}>
                        <View style={styles.upperContainerStyle}>
                            <View style={styles.avatarContainer}>
                                <Avatar
                                    avatarStyle={styles.avatarStyle}
                                    source={this.state.avatar ? this.state.avatar : require('../../../assets/images/avatar.png')}
                                    rounded
                                    size={60} />
                            </View>
                            <View style={styles.textContainer}>
                                <View style={styles.row}>
                                    <Text style={styles.nameTextStyle}>{name}</Text>
                                    <View style={styles.vipTagStyle}><Text style={styles.vipTagTextStyle}>VIP</Text></View>
                                </View>
                                <Text style={styles.vipTextStyle}>Vip Expire: <Text style={styles.dateStyle}>{date}</Text></Text>
                            </View>
                            <View style={styles.notificationStyle}>
                                <View style={styles.iconContainer}>
                                    <Icon.FontAwesome name="bell" color={THEME.COLOR_WHITE} size={20} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.middleContainerStyle}>
                        <View style={styles.loyalityPointsContainer}>
                            <View style={styles.justifyCenter}>
                                <Text style={styles.loyalText}>Loyalty Points:</Text>
                            </View>
                            <View style={styles.gap}></View>
                            <TouchableOpacity style={styles.row}>
                                <View style={styles.justifyCenter}>
                                    <Text style={styles.loyalText}><Text style={styles.pointText}>{totalPoints}</Text>  Point</Text>
                                </View>
                                <View style={styles.iconContainerStyle}>
                                    <Icon.AntDesign name="right" color={THEME.COLOR_GREY} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line}></View>
                        <View style={styles.buttonContainer}>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                    <Icon.MaterialCommunityIcons name="wallet-plus" color={THEME.PRIMARY_COLOR} />
                                </View>
                                <View style={styles.column2}>

                                </View>
                                <View style={styles.column}>

                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </>
        );
    }

}