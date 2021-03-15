import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Input } from '../../../components';
import styles from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default class AddBankDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountName: "",
            acoountNumber: "",
            swiftCode: "",
            bankAddress: "",
            yourAddress: ""
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={styles.generalMarginHorizontal}>
                        <View style={styles.generalMarginTop}>
                            <Input placeholder={"Enter Account Name "} />
                        </View>
                        <View style={styles.generalMarginTop}>
                            <Input placeholder={"Enter Account Number "} />
                        </View>
                        <View style={styles.generalMarginTop}>
                            <Input placeholder={"Enter Routing Number "} />
                        </View>
                        <View style={styles.generalMarginTop}>
                            <Input placeholder={"Enter Swift Code "} />
                        </View>
                        <View style={styles.generalMarginTop}>
                            <Input placeholder={"Enter Bank Address "} />
                        </View>
                        <View style={styles.generalMarginTop}>
                            <Input placeholder={"Enter your Local Address "} />
                        </View>
                        <View style={{ marginTop: "5%", marginHorizontal: "2.5%" }}>
                            <Button title="Cofirm" onPress={() => { }} />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}