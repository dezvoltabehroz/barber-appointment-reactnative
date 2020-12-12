
import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class BarberManageWorkingDaysScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack, replace } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberManageWorkingDays onNext={(data) => navigate('ManageScheduleTime', { data: data })} />
        )
    }
}
