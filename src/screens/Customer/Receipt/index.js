import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Linking, ActivityIndicator } from 'react-native';
import styles from './style';
import { connect } from 'react-redux';
import Invoice from '../../../assets/svg/invoice.svg';
import themeStyle from '../../../assets/styles/theme.style';
import { BookingServices } from '../../../services';
import moment from 'moment';
class Receipt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            isLoading: true
        };
    }

    componentDidMount = () => {
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token
        }
        BookingServices.listReceipt(userData)
            .then((response) => {
                if (response.data.status) {
                    this.setState({ list: response.data.data, isLoading: false })
                }
            })
            .catch(err => console.log(err))
    }

    _renderItems = (item) => {
        return (
            <TouchableOpacity style={{ padding: '5%', flexDirection: "row", alignItems: "center", backgroundColor: "#171717" }} onPress={() => Linking.openURL(`${item.receipt_url}`)}>
                <Invoice height={50} width={50} />
                <Text style={{ color: themeStyle.PRIMARY_COLOR, marginLeft: "5%" }} >{moment().format('DD/MM/YYYY hh:mm A')}</Text>
            </TouchableOpacity>
        )
    }


    renderSeparator = () => {
        return (<View style={styles.gapHeight}></View>)
    }


    render() {
        const { isLoading, list } = this.state;
        return (
            <>
                <View style={styles.container}>
                    {
                        isLoading ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <ActivityIndicator size={60} color={themeStyle.PRIMARY_COLOR} />
                            </View>
                            :
                            list.length == 0 ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 18, color: 'white', fontFamily: 'Poppins-Regular' }} >No receipt found!</Text></View>
                                :
                                <FlatList data={list}
                                    keyExtractor={item => item}
                                    ItemSeparatorComponent={this.renderSeparator}
                                    // numColumns={3}
                                    showsVerticalScrollIndicator={false}
                                    // contentContainerStyle={styles.contentContainer}
                                    renderItem={({ index, item }) => this._renderItems(item)} />}
                </View>
            </>);
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(Receipt)