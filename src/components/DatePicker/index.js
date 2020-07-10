import React from 'react';
import { View } from 'react-native';
import THEME from '../../assets/styles/theme.style';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTime = ({ onChangeDate, date }) => {
    const dateValue = new Date();
    return (
        <View>
            <DateTimePicker
                value={dateValue}
                mode={date ? 'date' : 'time'}
                textColor={THEME.COLOR_WHITE}
                is24Hour={false}
                display="spinner"
                onChange={onChangeDate}
            />
        </View>
    )
};

export default DateTime;
