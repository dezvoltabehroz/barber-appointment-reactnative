import React, { Component } from 'react';
import { View, ImageBackground, FlatList, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import styles from './style';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { authActions } from '../../../redux/actions/auth';
import { userAddressActions } from '../../../redux/actions/addresses';
import { categoryActions } from '../../../redux/actions/category';
import Image from 'react-native-fast-image';
class SubCategoryServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servcieTile: '',
            services: []
        }
    }
    componentDidMount = () => {
        const { data } = this.props;
        this.setState({ services: data })
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }

    _renderItems = (item) => {
        let { onItemPress } = this.props;
        return (
            <TouchableOpacity onPress={()=>onItemPress(item.id)} style={styles.lowerListItemContainer}>
                <Image source={require('../../../assets/images/background.png')} resizeMode="contain"
                    style={styles.lowerListImageStyle} >
                    <View style={styles.lowerListTitleContainer}>
                        <Text numberOfLines={3} style={styles.lowerListTitleStyle}>{item.service_name}</Text>
                        <Text style={styles.lowerListDescriptionStyle}>{item.service_description}</Text>
                    </View>
                </Image>
            </TouchableOpacity>
        )
    }

    render() {
        const { services } = this.state;
        let { onItemPress } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.lowerListContainer}>
                    {
                        this.props.category.loading ?
                            <ActivityIndicator />
                            :
                            <FlatList
                                data={this.props.category.services}
                                showsVerticalScrollIndicator={false}
                                ItemSeparatorComponent={this._renderSeparator}
                                renderItem={({ item }) => this._renderItems(item)}
                                keyExtractor={item => item} />}
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {},
        userAddresses: state.userAddresses || {},
        category: state.categoryReducer || {}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        userAddressActions: bindActionCreators(userAddressActions, dispatch),
        categoryActions: bindActionCreators(categoryActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryServices)