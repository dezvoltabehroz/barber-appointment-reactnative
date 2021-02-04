
import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class BarberManageSchedulerScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack, replace } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberManageScheduler onNext={(data) => navigate('ManageScheduleTime', { data: data })} />
        )
    }
}
