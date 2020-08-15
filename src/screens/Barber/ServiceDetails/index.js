import React, { Component } from 'react';
import { View, Text, FlatList, Alert, } from 'react-native';
import { FooterButton, Icon } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';

export default class ServiceDetails extends Component {

    constructor(props) {
        super(props);

        this.num2 = React.createRef();
        this.num3 = React.createRef();
        this.num4 = React.createRef();
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
            submit: false,
            showTimePicker: false,
            isTime: false,
            val: '',
            hours: '',
            minutes: '',
            indexValue: null,
            item: null,
        }
    }
    componentDidMount = () => {
        // let serviceArray = this.props.data;
        // this.setState({ serviceArray: serviceArray }, () => {
        //     console.log("state selected===>", this.state.serviceArray)
        // })

    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    _renderItems = ({ item, index }) => {
        return (
            <View style={styles.row}>
                <View style={styles.nameContainer}>
                    <Text style={styles.textStyle}>{item.serviceName}</Text>
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
        )
    }



    render() {
        const { onPayment } = this.props;
        const { serviceList } = this.state;

        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
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
                                renderItem={({ item, index }) => this._renderItems({ item, index })}
                                keyExtractor={item => item} />
                        </View>
                        <View style={styles.borderStyle}>
                            <View style={styles.rowStyle}>
                                {/* <Icon.Entypo name='dot-single' color={THEME.COLOR_WHITE} size={20} /> */}
                                <Text style={styles.headingText}>Total Time of Service:</Text>
                                <Text style={[styles.headingText, { color: THEME.PRIMARY_COLOR }]}>  2 hr 05 minutes</Text>
                            </View>
                            <View style={styles.rowStyle}>
                                {/* <Icon.Entypo name='dot-single' color={THEME.COLOR_WHITE} size={20} /> */}
                                <Text style={styles.headingText}>Total Amount of Service:</Text>
                                <Text style={[styles.headingText, { color: THEME.PRIMARY_COLOR }]}>  $260</Text>
                            </View>
                            <View style={styles.rowStyle}>
                                {/* <Icon.Entypo name='dot-single' color={THEME.COLOR_WHITE} size={20} /> */}
                                <Text style={styles.headingText}>Service Start Time:</Text>
                                <Text style={[styles.headingText, { color: THEME.PRIMARY_COLOR }]}>  04:00 PM</Text>
                            </View>
                            <View style={styles.rowStyle}>
                                {/* <Icon.Entypo name='dot-single' color={THEME.COLOR_WHITE} size={20} /> */}
                                <Text style={styles.headingText}>Service End Time:</Text>
                                <Text style={[styles.headingText, { color: THEME.PRIMARY_COLOR }]}>  06:00 PM</Text>
                            </View>
                        </View>

                    </View>
                    <FooterButton title='Collect The Payment' onPress={onPayment} />
                </View>
            </>
        );
    }
}