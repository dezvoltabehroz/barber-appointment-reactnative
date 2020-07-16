import React, { Component } from 'react';
import { View, Text, Modal } from 'react-native';
import { Button, Input, Icon } from '../index';
import styles from './style';
import THEME from '../../assets/styles/theme.style';

var timeValue = [];

export default class DateTimeModal extends Component {

    constructor(props) {
        super(props);
        this.inputRefs = [
            React.createRef(),
            React.createRef(),
            React.createRef(),
            React.createRef()
        ]
        this.state = {
            time: [],
            timeStr: '',
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }


    handleKeyPress = (keyValue, index) => {
        if (keyValue === 'Backspace') {
            if (index === 0) {
                this.inputRefs[index].focus()
            } else {
                this.inputRefs[index - 1].focus()
            }
        } else {
            if (index < this.inputRefs.length - 1) {
                this.inputRefs[index + 1].focus()
            }
        }
    }

    handleChangeText = (value, index) => {
        const { time } = this.state;
        time[index] = value;
        var str = time.join('');
        var timeStr = '';
        if (str[0] != "undefined") {
            if (str[0] > 1) {
                alert("Invalid Hours")
            } else {
                timeStr = str[0];
            }
        }
        if (str[1] != "undefined") {
            if (str[0] == 1 && str[1] > 2) {
                alert("Invalid Hours")
            } else {
                timeStr = str[0] + str[1];
            }
        }
        if (str[2] != "undefined") {
            if (str[2] > 6) {
                alert("Invalid Minutes")
            } else {
                timeStr = str[0] + str[1] + ":" + str[2] + str[3];
            }
        }
        // var timeStr = str[0] + str[1] + ':' + str[2] + str[3];
        console.log(timeStr);
        this.setState({ timeStr });
    }

    handleSet = () => {
        const { onSet } = this.props;
        const { timeStr } = this.state;
        if (timeStr.includes("undefined") || timeStr === '') {
            alert("Invalid Time")
        }
        else {
            onSet(timeStr);
            this.setState({ timeStr: '' })
        }

    }

    render() {
        const { showTimePicker, onCancel } = this.props;
        return (
            <View style={styles.centeredView}>
                <Modal visible={showTimePicker}
                    animationType="slide"
                    transparent={true}>

                    <View style={styles.modalContainer}  >
                        <View style={styles.modalInputContainer}>
                            < View style={styles.iconContainer}>
                                <Icon.Entypo name="dots-two-vertical" color={THEME.COLOR_WHITE} size={THEME.ICON_SIZE} />
                            </View>
                            <View style={styles.modalUpperContainer}>
                                {
                                    this.inputRefs.map((k, idx) => (
                                        <View style={styles.modalInput}>
                                            <Input
                                                inputRef={ref => this.inputRefs[idx] = ref}
                                                maxLength={1}
                                                keyboardType="numeric"
                                                blurOnSubmit={true}
                                                onChangeText={val => this.handleChangeText(val, idx, k)}
                                                onKeyPress={({ nativeEvent: { key: keyValue } }) => this.handleKeyPress(keyValue, idx)}

                                            />
                                            {
                                                idx > 1 ?
                                                    < Text style={styles.modalText}>M</Text>
                                                    :
                                                    <Text style={styles.modalText}>H</Text>
                                            }
                                        </View>
                                    ))
                                }
                            </View>

                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title='Set' onPress={this.handleSet} />
                            <Button title='Cancel' onPress={onCancel} />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}