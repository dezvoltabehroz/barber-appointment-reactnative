/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class SubCategoryScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        const { data } = this.props.route.params;
        return (
            <MainScreenPaths.Customer.SubCategory data={(data)} onItemPress={(service, name) => navigate('SubCategoryServices', { name, list: service })} />
        )
    }
}
