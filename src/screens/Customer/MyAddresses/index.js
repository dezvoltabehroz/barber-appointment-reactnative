import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, RefreshControl } from 'react-native';
import styles from './styles';
import { FooterButton, Icon, } from '../../../components';
import THEME from '../../../assets/styles/theme.style';
import { connect } from 'react-redux';
import { UserAddresses } from '../../../services';
import { ActivityIndicator } from 'react-native';

class MyAddresses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
            loading: true
        }
    }

    componentDidMount = () => {
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token
        }
        UserAddresses.viewAllAddresses(userData)
            .then((res) => {
                let address = [];
                let data = [...res.data.addresses]
                data.forEach((item, index) => {
                    if (item.is_selected == 1) {

                    } else {
                        address.push(item)
                    }
                })
                this.setState({ addresses: address, loading: false });
            })
            .catch((error) => console.log(error))

    }

    handleOnDelete = (item) => {
        this.props.onDelete(item);
        this.setState({ addresses: this.state.addresses.filter((obj => obj.id != item.id)) })
    }

    _renderSeparator = () => {
        return (
            <>
                <View style={styles.gapHeight}></View>
                <View style={styles.seperatorStyle}></View>
            </>
        )
    }

    _renderItems = ({ item, index }) => {
        return (
            <View style={styles.contentContainer}>
                <View style={styles.gapHeight}></View>
                <View style={styles.row}>
                    <View style={{ flex: 0.8, marginHorizontal: "5%" }}>
                        <Text style={styles.labelTextStyle}><Text style={{fontFamily: 'Poppins-Bold'}}>Label: </Text>{item.label_as}</Text>
                        <Text style={styles.labelTextStyle}><Text style={{fontFamily: 'Poppins-Bold'}}>Address: </Text>{item.address}</Text>
                    </View>
                    {/* <View style={styles.labelRowContainer}>
                        <Icon.FontAwesome name={item.label_as == 'Home' ? 'home' : item.label_as == 'Work' ? 'building' : 'group'} size={25} color={THEME.COLOR_WHITE} />
                        <View style={{ marginLeft: '5%', marginTop: '3%' }}>
                            <Text style={styles.labelTextStyle}>{item.label_as}</Text>
                        </View>
                    </View> */}
                    <View style={[styles.buttonEditContainer, { flex: 0.2 }]}>
                        <TouchableOpacity style={{ marginRight: '10%' }} onPress={() => this.props.onEdit(item)} >
                            <Icon.MaterialIcons name='edit' size={25} color={THEME.COLOR_WHITE} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleOnDelete(item)}>
                            <Icon.MaterialIcons name='delete' size={25} color={THEME.COLOR_WHITE} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.addressContainer} >
                    {/* <Text style={styles.textStyle}>{item.address}</Text> */}
                    <Text style={styles.textStyle}>{item.city}</Text>
                </View>
            </View>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.8 }}>
                    {
                        this.state.loading ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <ActivityIndicator />
                            </View>
                            :
                            this.state.addresses.length != 0 ?
                                < FlatList
                                    data={this.state.addresses}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={this._renderSeparator}
                                    renderItem={({ item, index }) => this._renderItems({ item, index })}
                                    keyExtractor={item => item}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.loading}
                                            onRefresh={() => { this.props.onReferesh(); this.componentDidMount() }}
                                            tintColor={THEME.PRIMARY_COLOR}
                                            colors={[THEME.PRIMARY_COLOR]}
                                        />
                                    }
                                />
                                :
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={styles.labelTextStyle}>No Address Found</Text>
                                </View>
                    }
                </View>
                <FooterButton title="Add New Address" onPress={() => this.props.addAddress()} />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {},
        userAddresses: state.userAddresses || {}
    };
};

export default connect(mapStateToProps)(MyAddresses);