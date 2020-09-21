import React, { Component } from 'react';
import { View, ImageBackground, FlatList, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import styles from './style';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { authActions } from '../../../redux/actions/auth';
import { userAddressActions } from '../../../redux/actions/addresses';
import { categoryActions } from '../../../redux/actions/category';

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
        const image_Url = 'https://media1.popsugar-assets.com/files/thumbor/8FQjnhO5KDETJlIw-9YrAxbFORg/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2013/11/25/741/n/1922153/f86754a8a6f036d0_headband-braid-2/i/Starting-section-hair-from-behind-one-ear-separate.jpg';
        return (
            <TouchableOpacity onPress={onItemPress} style={styles.lowerListItemContainer}>
                <ImageBackground source={item.picture ? { uri: item.picture } : { uri: image_Url }}
                    style={styles.lowerListImageStyle} imageStyle={{ borderRadius: 10 }}>
                    <View style={styles.lowerListTitleContainer}>
                        <Text style={styles.lowerListTitleStyle}> {item.service_name} </Text>
                        <Text style={styles.lowerListDescriptionStyle}>{item.service_description}</Text>
                    </View>
                </ImageBackground>
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