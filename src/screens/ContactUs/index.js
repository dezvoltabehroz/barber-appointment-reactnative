import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, LayoutAnimation, Alert } from 'react-native'
import { Icon, Button, FloatingInput, RadioButton } from "../../components";
import styles from './style';
import THEME from '../../assets/styles/theme.style';
import COMMON_STYLE from '../../assets/styles/common.style';

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
        const { onLogin, isSubmit, submit } = this.props
        let { email, password, submiting } = this.state;
        isSubmit(submiting);
        if (email && password && submit) {
            if (this.isEmailValid(email)) {
                onLogin();
                this.setState({ email: '', password: '' })
            }
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
                                    label={"Name"}
                                    val={name}
                                    onActive={() => this.setState({ isNameFocus: true })}
                                    onInActive={() => this.setState({ isNameFocus: false })}
                                    updateText={(name) => this.setState({ name })} />
                                {
                                    submit && !name ? <Text style={[COMMON_STYLE.errorText, submit ? styles.onSubmitTrue : {}]}>Please fill this field</Text> : null
                                }
                            </View>

                            <View style={[styles.inputContainerStyle, submit ? { marginBottom: "8%" } : styles.inputContainerStyle,
                            isEmailFocus || email != '' ? THEME.inputBorder : {}]}>
                                <FloatingInput
                                    label={"Email"}
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
                                    label={"Subject"}
                                    val={subject}
                                    onActive={() => this.setState({ isSubjectFocus: true })}
                                    onInActive={() => this.setState({ isSubjectFocus: false })}
                                    secureEntry={true}
                                    updateText={(subject) => this.setState({ subject })} />
                                {
                                    submit && !subject ? <Text style={[COMMON_STYLE.errorText, submit ? styles.onSubmitTrue : {}]}>Please fill this field</Text> : null
                                }
                            </View>
                            <View style={[styles.inputContainerStyle, submit ? { marginBottom: "8%" } : styles.inputContainerStyle,
                            isMessageFocus || message != '' ? THEME.inputBorder : {}]}>
                                <FloatingInput
                                    label={"Message"}
                                    val={message}
                                    onActive={() => this.setState({ isMessageFocus: true })}
                                    onInActive={() => this.setState({ isMessageFocus: false })}
                                    secureEntry={true}
                                    updateText={(message) => this.setState({ message })} />
                                {
                                    submit && !message ? <Text style={[COMMON_STYLE.errorText, submit ? styles.onSubmitTrue : {}]}>Please fill this field</Text> : null
                                }
                            </View>
                            <Button title="Submit" onPress={this.handleLogin} />
                        </View>
                    </View>
                </View>
            </>
        )
    }
}
export default ContactUs;