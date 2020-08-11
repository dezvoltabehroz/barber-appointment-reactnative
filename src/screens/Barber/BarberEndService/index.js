import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { FooterButton, Icon } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';


export default class EndService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serviceList: [
                { id: 1, serviceName: 'Hair Cuttuing', serviceDescription: '', selected: false, price: '', time: '', isFilled: '' },
                { id: 2, serviceName: 'Hair Trimming', serviceDescription: '', selected: false, price: '', time: '', isFilled: '' },
                { id: 3, serviceName: 'Blowout', serviceDescription: '', selected: false, price: '', time: '', isFilled: '' },
                { id: 4, serviceName: 'Hair Color', serviceDescription: '', selected: false, price: '', time: '', isFilled: '' },
                { id: 5, serviceName: 'Double process hair color', serviceDescription: '', selected: false, price: '', time: '', isFilled: '' },
                { id: 6, serviceName: 'Shave', serviceDescription: '', selected: false, price: '', time: '', isFilled: '', isFilled: '' },
                { id: 7, serviceName: 'Beard Trim', serviceDescription: '', selected: false, price: '', time: '', isFilled: '' },
                { id: 8, serviceName: 'Braids & Twist', serviceDescription: '', selected: false, price: '', time: '', isFilled: '' },

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
                <View style={styles.contentContainer}>
                    <Icon.Entypo name='dot-single' color={THEME.COLOR_WHITE} size={20} />
                    <Text style={styles.textStyle}>{item.serviceName}</Text>
                </View>
            </>
        )
    }



    render() {
        const { onEndService } = this.props;
        const { serviceList } = this.state;
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <View style={{ marginBottom: '5%' }}>
                            <Text style={styles.textHeadingStyle}>List of Customer Services</Text>
                        </View>
                        <FlatList
                            data={serviceList}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this._renderSeparator}
                            renderItem={({ item }) => this._renderItems(item)}
                            keyExtractor={item => item} />
                    </View>
                    <FooterButton title='End Service' onPress={onEndService} />
                </View>
            </>
        );
    }
}