import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Icon } from '../../../components';
import styles from './style'
import Add from '../../../assets/svg/add-button.svg'
import THEME from '../../../assets/styles/theme.style';
import { TouchableOpacity } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default class EditWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bankDetail: true,
            paymentDetails: false
        }
    }

    render() {
        const { bankDetail, paymentDetails } = this.state;
        const { onBank, onPayment } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.rowStyle}>
                    <View style={styles.rowContainer}>
                        <Text style={[styles.textStyle, { width: screenWidth * 0.65 }]}>{bankDetail ? "KBC Bank New York" : "Add your bank account"}</Text>
                        <TouchableOpacity onPress={()=>onBank()}>
                            <Add height={20} width={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: "center" }}>
                        <Icon.MaterialIcons size={25} name={bankDetail ? "radio-button-checked" : "radio-button-unchecked"} color={THEME.PRIMARY_COLOR} />
                    </View>
                </View>
                <View style={styles.rowStyle}>
                    <View style={styles.rowContainer}>
                        <Text style={[styles.textStyle, { width: screenWidth * 0.65 }]}>{paymentDetails ? "ABC XYZ" : "Add payment address (physical check)"}</Text>
                        <TouchableOpacity onPress={()=>onPayment()}>
                            <Add height={20} width={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: "center" }}>
                        <Icon.MaterialIcons size={25} name={paymentDetails ? "radio-button-checked" : "radio-button-unchecked"} color={THEME.PRIMARY_COLOR} />
                    </View>
                </View>
                <View style={{ marginTop: "5%", marginHorizontal: "10%" }}>
                    <Text style={styles.whiteText}>Earnings this month: 0.00 USD</Text>
                    <Text style={styles.whiteText}>Balance: 0.00 USD</Text>
                    <Text style={styles.whiteText}>Earning this year: 0.00 USD</Text>
                    <Text style={styles.colorText}>{`Important Note:\nAdd your bank account details if you want payment to be sent in bank account or fill the payment address that will be used to mail the check.\nThe balance always will be transferred every monday.`}</Text>
                </View>
            </View>
        )
    }
}