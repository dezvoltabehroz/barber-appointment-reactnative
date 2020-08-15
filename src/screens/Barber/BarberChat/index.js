import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback,
    StatusBar,
    TextInput
} from "react-native";
import THEME from '../../../assets/styles/theme.style';
var { height } = Dimensions.get('window');
import styles from './style';

export default class BarberChat extends Component {
    getParamData;
    constructor(props) {
        super(props);
        this.state = {
            inputmessage: "",
        };

    }

    //   renderItem({ item }) {
    //     return (

    //           item.source== "driver"? 
    //           <View style={styles.drivermsgStyle}>
    //           <Text style={styles.msgTextStyle}>{item?item.message: languageJSON.chat_history_not_found}</Text>
    //           <Text style={styles.msgTimeStyle}>{item?item.msgTime:null}</Text>
    //           </View>
    //           :
    //           <View style={styles.riderMsgStyle}>
    //           <Text style={styles.riderMsgText}>{item?item.message: languageJSON.chat_history_not_found}</Text>
    //           <Text style={styles.riderMsgTime}>{item?item.msgTime:null}</Text> 
    //           </View>

    //     );
    //   }

    //   sendPushNotification(customerUID,bookingId,msg){
    //     const customerRoot=firebase.database().ref('users/'+customerUID);
    //     customerRoot.once('value',customerData=>{
    //         if(customerData.val()){
    //             let allData = customerData.val()
    //             RequestPushMsg(allData.pushToken?allData.pushToken:null,msg)
    //         }
    //     })
    //   }

    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    // data={this.state.allChat.reverse()}
                    // renderItem={this.renderItem}
                    inverted
                />
                <View style={styles.footer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={this.state.inputmessage}
                            style={styles.input}
                            placeholderTextColor={THEME.COLOR_GREY}
                            underlineColorAndroid="transparent"
                            placeholder='Type a message...'
                            onChangeText={text => this.setState({ inputmessage: text })}
                        />
                    </View>
                    <TouchableOpacity onPress={() => this.setState({ inputmessage: '' })}>
                        <Text style={styles.send}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}