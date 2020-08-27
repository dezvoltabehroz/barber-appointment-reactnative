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
    ImageBackground,
    TouchableWithoutFeedback,
    StatusBar,
    TextInput
} from "react-native";
import THEME from '../../../assets/styles/theme.style';
import styles from './style';

import { GiftedChat, GiftedAvatar, Bubble, InputToolbar, Composer, Send } from 'react-native-gifted-chat'
import firebaseApp from './/../../../services/ChatFireBase'

const { width, height } = Dimensions.get('window')
export default class BarberChat extends Component {
    getParamData;
    constructor(props) {
        super(props);
        this.state = {
            // inputmessage: "",
            messages: [],
            height: 0,
            user: {
                id: 1,
                name: 'Mudassar Ahmed',
                email: 'mudasirshahbaz786@outlook.com',
                username: 'mudasirshahbaz786',
                photo: 'https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'

            },
            barber: {
                id: 2,
                name: 'Behroz Ahmed',
                email: 'behrozahmed@outlook.com',
                username: 'behrozahmed786',
                photo: 'https://w7.pngwing.com/pngs/304/305/png-transparent-man-with-formal-suit-illustration-web-development-computer-icons-avatar-business-user-profile-child-face-web-design.png'

            },
        };
        this.currentUserId = this.state.user.id;

        if (this.state.barber != null) {
            this.chatRef = firebaseApp
                .ref()
                .child(`chat/${this.generateChatId(this.currentUserId)}`)
            this.chatRefData = this.chatRef.orderByChild('order')
        }

    }

    componentDidMount() {
        // this.props.clearChat()
        this.chatRef && this.listenForItems(this.chatRefData)
    }
    componentWillUnmount() {
        firebaseApp.off()
    }

    listenForItems = (chatRef) => {
        //--- case different
        chatRef.on('value', (snap) => {
            // get children as an array
            const items = []
            snap.forEach((child) => {
                items.push({
                    _id: child.val().createdAt,
                    text: child.val().text,
                    createdAt: new Date(child.val().createdAt),
                    user: {
                        _id: child.val().uid,
                    },
                })
            })
            this.setState({
                messages: items,
            })
        })
    }

    generateChatId = (userId) => {
        const { barber } = this.state;
        if (userId > barber.id) { return `${userId}-${barber.id}` }
        else { return `${barber.id}-${userId}` }
    }
    onSend = (messages = []) => {
        const { user, barber } = this.state;
        try {

            messages.forEach((message) => {
                const now = new Date().getTime()
                this.chatRef.push({
                    _id: now,
                    text: message.text,
                    createdAt: now,
                    uid: this.currentUserId,
                    order: -1 * now,
                    username: user.username ? user.username : user.email,
                    email: user.email,
                    name: user.name ? user.name : user.name,
                    avatar: user.photo ? user.photo : user.photo,
                    barber: barber.id,
                    read: 0,
                })
            })

            /*--- push for users ---*/
            //from userLogin to author
            firebaseApp
                .ref()
                .child('users')
                .child(this.currentUserId)
                .child(barber.id)
                .set({
                    id: barber.id,
                    name: barber.username || barber.name,
                    email: barber.email,
                })

            // from author to userLogin
            firebaseApp
                .ref()
                .child('users')
                .child(barber.id)
                .child(this.currentUserId)
                .set({
                    id: this.currentUserId,
                    name: user.username ? user.username : user.email,
                    email: user.email,
                })
        } catch (err) {
            console.warn(err)
            // Events.toast(err.message)
        }
    }

    _renderInputToolbar(props) {
        //Add the extra styles via containerStyle

        return <View style={styles.inputContainer}>
            {/* <TextInput
                value={this.state.inputmessage}
                style={styles.input}
                placeholderTextColor={THEME.COLOR_GREY}
                underlineColorAndroid="transparent"
                placeholder='Type a message...'
                onChangeText={text => this.setState({ inputmessage: text })}
            /> */}
            <InputToolbar {...props} containerStyle={styles.inputContainer} placeholder="Type a message..." />
        </View>
    }

    _renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                textStyle={{}}
                wrapperStyle={{
                    left: {
                        borderRadius: 8,
                        borderTopLeftRadius: 0,
                        backgroundColor: THEME.COLOR_WHITE,
                    },
                    right: {
                        borderRadius: 8,
                        borderTopRightRadius: 0,
                        backgroundColor: THEME.PRIMARY_COLOR,
                    },
                }}
            />
        )
    }

    _renderAvatar = (props) => {
        return <GiftedAvatar {...props} />
    }

    _renderSend(props) {
        return (
            <Send
                {...props}
            >
                <View style={{ marginRight: '5%', paddingBottom: '20%' }}>
                    <Text style={styles.send}>Send</Text>
                </View>
            </Send>
        );
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
        const { user } = this.state
        return (
            <View style={styles.container}>

                {/* <FlatList
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
                </View> */}
                {/* <ImageBackground
                    // source={Config.Chat.defaultBg}
                    // source={{uri:'https://i.pinimg.com/originals/bf/a3/75/bfa375807273c60c429c50c8ed73632e.jpg'}}
                    source={{ uri: 'https://i.pinimg.com/originals/88/d5/82/88d582519cd6f7a68791679984e27905.jpg' }}
                    style={{
                        position: 'absolute',
                        flex: 1,
                        width,
                        height,
                        // opacity: Config.Chat.opacityBg,
                    }}
                /> */}
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend}
                    placeholder={'Type a message'}
                    maxComposerHeight={200}
                    scrollToBottom
                    alignTop
                    // minInputToolbarHeight={200}
                    // maxInputLength={200}
                    renderSend={this._renderSend}
                    renderBubble={this._renderBubble}
                    renderAvatar={this._renderAvatar}
                    renderInputToolbar={props => (<InputToolbar {...props} inputStyle={styles.input} containerStyle={{ backgroundColor: "black", borderTopWidth: 0, marginTop: '2%' }}
                        renderComposer={props1 => (<Composer {...props1} in textInputStyle={{ color: "white", fontFamily: 'Poppins-Regular', paddingTop: '5%' }} />)} />)}
                    // renderInputToolbar={this._renderInputToolbar}
                    showUserAvatar={true}
                    showAvatarForEveryMessage={true}
                    // renderCustomView={this._renderCustomView}
                    user={{
                        _id: this.currentUserId,
                        name: user.last_name || user.first_name,
                        avatar: user.photo

                    }}
                    bottomOffset={0}
                    listViewProps={{ marginTop: '7%' }}
                />
            </View>
        );
    }

}