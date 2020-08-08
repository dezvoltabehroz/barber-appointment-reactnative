import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class HairCareScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        const { list } = this.props.route.params;
        return (
            <MainScreenPaths.Customer.SubCategoryServices data={(list)} onItemPress={() => navigate('BarberList')} />
        )
    }
}
