
import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class BarberManageSchedulerScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack, replace } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberManageScheduler
                onDetail={(item) => navigate('ManageSchedulerDetail', { item })}
                onEdit={(item) => navigate('ManageEditScheduler', { item: item, edit: true })}
                onNext={(data, edit, item) => navigate('ManageScheduleTime', { data: data, edit, item })} />
        )
    }
}
