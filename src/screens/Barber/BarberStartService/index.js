import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { FooterButton, Icon } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';

export default class StartService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serviceList: [
                { id: 1, serviceName: 'Hair Cuttuing', serviceDescription: '', selected: false, price: 50, time: 30, isFilled: '' },
                { id: 2, serviceName: 'Hair Trimming', serviceDescription: '', selected: false, price: 50, time: 30, isFilled: '' },
                { id: 3, serviceName: 'Blowout', serviceDescription: '', selected: false, price: 50, time: 30, isFilled: '' },
                { id: 4, serviceName: 'Hair Color', serviceDescription: '', selected: false, price: 50, time: 30, isFilled: '' },
                { id: 5, serviceName: 'Double process hair color', serviceDescription: '', selected: false, price: 50, time: 30, isFilled: '' },
                { id: 6, serviceName: 'Shave', serviceDescription: '', selected: false, price: 50, time: 30, isFilled: '', isFilled: '' },
                { id: 7, serviceName: 'Beard Trim', serviceDescription: '', selected: false, price: 50, time: 30, isFilled: '' },
                { id: 8, serviceName: 'Braids & Twist', serviceDescription: '', selected: false, price: 50, time: 30, isFilled: '' },
            ],
        }
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    _renderItems = (item) => {
        return (
            <>
                <View style={styles.row}>
                    <View style={styles.nameContainer}>
                        <View style={{ flexDirection: "row" }}>
                            <Icon.Entypo name='dot-single' color={THEME.COLOR_WHITE} size={20} />
                            <Text style={styles.textStyle}>{item.serviceName}</Text>
                        </View>
                    </View>
                    <View style={styles.priceContainer} >
                        <Text style={styles.timeTextStyle}>${item.price}</Text>
                    </View>
                    <View style={styles.timeContainer}>
                        <View style={styles.priceAndTimeContainer}>
                            <Text style={styles.timeTextStyle}>00:{item.time}</Text>
                        </View>
                    </View>
                </View>
            </>
        )
    }



    render() {
        const { onStartService } = this.props;
        const { serviceList } = this.state;
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <View style={{ marginBottom: '5%' }}>
                            <Text style={styles.textHeadingStyle}>List of Customer Services</Text>
                        </View>
                        <View style={styles.headingContainer}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.headingTextStyle}>Services</Text>
                            </View>
                            <View style={styles.priceContainer} >
                                <Text style={styles.headingTextStyle1}>Price</Text>
                            </View>
                            <View style={styles.timeContainer}>
                                <Text style={styles.headingTextStyle1}>Est.Time</Text>
                            </View>
                        </View>
                        <View style={styles.flatlistContainer}>
                            <FlatList
                                data={serviceList}
                                showsVerticalScrollIndicator={false}
                                ItemSeparatorComponent={this._renderSeparator}
                                renderItem={({ item }) => this._renderItems(item)}
                                keyExtractor={item => item} />
                        </View>
                        <View style={{ flexDirection: "row",marginVertical:'5%' }}>
                            <Icon.Entypo name='dot-single' color={THEME.COLOR_WHITE} size={20} />
                            <Text style={styles.textStyle}>Duration of Service:</Text>
                            <Text style={[styles.textStyle,{color:THEME.PRIMARY_COLOR}]}> 2 hr</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Icon.Entypo name='dot-single' color={THEME.COLOR_WHITE} size={20} />
                            <Text style={styles.textStyle}>Amount of Service:</Text>
                            <Text style={[styles.textStyle,{color:THEME.PRIMARY_COLOR}]}> $200</Text>
                        </View>
                    </View>
                    <FooterButton title='Start Service' onPress={onStartService} />
                </View>
            </>
        );
    }
}