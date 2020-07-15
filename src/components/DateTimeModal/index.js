import React, { Component } from 'react';
import { View, Text, Modal } from 'react-native';
import { Button, Input, Icon } from '../index';
import styles from './style';
import THEME from '../../assets/styles/theme.style';

var timeValue = null;

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
            time: ''
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

    handleChangeText = (value) => {
        timeValue += value;
        this.setState({ time: timeValue });
    }

    render() {
        const { showTimePicker, onCancel, onSet } = this.props;
        const { time } = this.state;
        return (
            <>
                <Modal visible={showTimePicker} >
                    <View style={styles.modalContainer} >
                        < View style={{position:'relative',top:40, alignItems: 'center' }}>
                            <Icon.Entypo name="dots-two-vertical" color={THEME.COLOR_WHITE} size={THEME.ICON_SIZE} />
                        </View>
                        <View style={styles.modalUpperContainer}>
                            {
                                this.inputRefs.map((k, idx) => (
                                    <View style={styles.modalInput}>
                                        <Input
                                            inputRef={ref => this.inputRefs[idx] = ref}
                                            // value={time[idx]}
                                            maxLength={1}
                                            keyboardType="numeric"
                                            blurOnSubmit={true}
                                            onChange={val => this.handleChangeText(val)}
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
                        {/* < View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Icon.Entypo name="dots-two-vertical" color={THEME.COLOR_WHITE} size={THEME.ICON_SIZE} />
                        </View> */}
                        <View style={styles.buttonContainer}>
                            <Button title='Set' onPress={() => onSet(time)} />
                            <Button title='Cancel' onPress={onCancel} />
                        </View>
                    </View>
                </Modal>
            </>
        );
    }
}