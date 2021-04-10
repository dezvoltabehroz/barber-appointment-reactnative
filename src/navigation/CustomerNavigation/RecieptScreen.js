/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

class ReceiptScreen extends Component {
   
    render() {
        const { replace, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.Receipt />
        )
    }
};
export default ReceiptScreen;