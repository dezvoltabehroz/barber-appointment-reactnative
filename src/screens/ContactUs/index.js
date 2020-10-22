import React, { Component } from 'react'
import { View, Text, } from 'react-native'
import { Button, FloatingInput, MessageInput } from "../../components";
import styles from './style';
import THEME from '../../assets/styles/theme.style';
import COMMON_STYLE from '../../assets/styles/common.style';
import { About } from '../../services';

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            isNameFocus: false,
            isEmailFocus: false,
            isSubjectFocus: false,
            isMessageFocus: false,
            submit: false
        }
    }
    handleSubmit = () => {
        const { onSend } = this.props
        const { submit } = this.state
        let { email, name, subject, message } = this.state;
        if (email && name && subject && message && submit) {
            let userData = {
                email: email,
                name: name,
                subject: subject,
                message: message
            }
            About.postContactUs(userData)
                .then((res) => {
                    if (res.data.status) {
                        onSend()
                        this.setState({ name: '', email: '', subject: '', message: '', submit: false })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    };

    isEmailValid(email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }

    render() {
        const { name, email, subject, isEmailFocus, isNameFocus, isSubjectFocus, isMessageFocus, message, submit } = this.state;
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <View style={styles.buttonContainer}>
                            <View style={[styles.inputContainerStyle, submit ? { marginBottom: "8%" } : styles.inputContainerStyle,
                            isNameFocus || name != '' ? THEME.inputBorder : {}]}>
                                <FloatingInput
                                    label={"Your Name"}
                                    val={name}
                                    onActive={() => this.setState({ isNameFocus: true })}
                                    onInActive={() => this.setState({ isNameFocus: false, submit: true })}
                                    updateText={(name) => this.setState({ name })} />
                                {
                                    submit && !name ? <Text style={[COMMON_STYLE.errorText, submit ? styles.onSubmitTrue : {}]}>Please fill this field</Text> : null
                                }
                            </View>

                            <View style={[styles.inputContainerStyle, submit ? { marginBottom: "8%" } : styles.inputContainerStyle,
                            isEmailFocus || email != '' ? THEME.inputBorder : {}]}>
                                <FloatingInput
                                    label={"Your Email"}
                                    val={email}
                                    keyboardtype="email-address"
                                    onActive={() => this.setState({ isEmailFocus: true })}
                                    onInActive={() => this.setState({ isEmailFocus: false })}
                                    updateText={(email) => this.setState({ email })} />
                                {
                                    submit && !email ? <Text style={[COMMON_STYLE.errorText, submit ? styles.onSubmitTrue : {}]}>Please fill this field</Text> : null
                                }
                                {
                                    submit && email.length && !this.isEmailValid(email) ? <Text style={[COMMON_STYLE.errorText, submit ? styles.onSubmitTrue : {}]}>Email is invalid</Text> : null
                                }
                            </View>

                            <View style={[styles.inputContainerStyle, submit ? { marginBottom: "8%" } : styles.inputContainerStyle,
                            isSubjectFocus || subject != '' ? THEME.inputBorder : {}]}>
                                <FloatingInput
                                    label={"Your Subject"}
                                    val={subject}
                                    onActive={() => this.setState({ isSubjectFocus: true })}
                                    onInActive={() => this.setState({ isSubjectFocus: false })}
                                    updateText={(subject) => this.setState({ subject })} />
                                {
                                    submit && !subject ? <Text style={[COMMON_STYLE.errorText, submit ? styles.onSubmitTrue : {}]}>Please fill this field</Text> : null
                                }
                            </View>
                            <View style={[styles.messageContainerStyle, submit ? { marginBottom: '8%' } : styles.messageContainerStyle,
                            isMessageFocus || message != '' ? THEME.inputBorder : {}]}>
                                <MessageInput
                                    label={"Please type your message"}
                                    val={message}
                                    multiline={true}
                                    onActive={() => this.setState({ isMessageFocus: true })}
                                    onInActive={() => this.setState({ isMessageFocus: false })}
                                    updateText={(message) => this.setState({ message })} />
                                {
                                    submit && !message ? <Text style={[COMMON_STYLE.errorText, submit ? [styles.onSubmitTrue, { marginTop: '6%' }] : {}]}>Please fill this field</Text> : null
                                }
                            </View>

                            <Button title="Send" onPress={this.handleSubmit} />
                        </View>
                    </View>
                </View>
            </>
        )
    }
}
export default ContactUs;