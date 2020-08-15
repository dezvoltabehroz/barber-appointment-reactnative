/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class ServiceCompleteScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { push } = this.props.navigation;
        return (
            <MainScreenPaths.Customer.ServiceComplete onHome={() => push('Home')} />
        )
    }
}
