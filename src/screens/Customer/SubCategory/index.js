import React, { Component } from 'react';
import { View, ImageBackground, FlatList, TouchableOpacity, Text } from "react-native";
import styles from './style';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { authActions } from '../../../redux/actions/auth';
import { userAddressActions } from '../../../redux/actions/addresses';
import { categoryActions } from '../../../redux/actions/category';

class SubCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hairServices: []
        }
    }

    componentDidMount = () => {
        const { data } = this.props;
        this.setState({ hairServices: data })
    }
    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }


    _renderItems = (item) => {
        const { onItemPress } = this.props;
        const image_url =    require('../../../assets/images/Salon-Style.jpg')
        return (
            <>
                <TouchableOpacity onPress={()=>onItemPress(item)} style={styles.lowerListItemContainer}>
                    <ImageBackground source={item.picture?{uri:item.picture}:image_url}
                        style={styles.lowerListImageStyle} imageStyle={{ borderRadius: 10 }}>
                        <View style={styles.lowerListTitleContainer}>
                            <Text style={styles.lowerListTitleStyle} >{item.sub_category_name}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </>
        )
    }

    render() {
        const { hairServices } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.lowerListContainer}>
                    <FlatList
                        data={this.props.category.subCategories}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={this._renderSeparator}
                        renderItem={({ item }) => this._renderItems(item)}
                        keyExtractor={item => item.id} />
                </View>
            </View>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(SubCategory);