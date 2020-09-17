import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity,RefreshControl } from 'react-native';
import styles from './styles';
import { FooterButton, Icon, } from '../../../components';
import THEME from '../../../assets/styles/theme.style';
import { connect } from 'react-redux';

class MyAddresses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: []
        }
    }

    componentDidMount = () => {
        this.setState({ addresses: this.props.userAddresses.addresses });
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
                    <View style={styles.labelRowContainer}>
                        <Icon.MaterialIcons name='home' size={25} color={THEME.COLOR_WHITE} />
                        <View style={{ marginLeft: '5%', marginTop: '3%' }}>
                            <Text style={styles.labelTextStyle}>{item.label_as}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonEditContainer}>
                        <TouchableOpacity style={{ marginRight: '10%' }} onPress={() => this.props.onEdit()} >
                            <Icon.MaterialIcons name='edit' size={25} color={THEME.COLOR_WHITE} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }}>
                            <Icon.MaterialIcons name='delete' size={25} color={THEME.COLOR_WHITE} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.addressContainer} >
                    <Text style={styles.textStyle}>{item.address}</Text>
                    <Text style={styles.textStyle}>{item.city}</Text>
                </View>
            </View>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.8 }}>
                    <FlatList
                        data={this.state.addresses}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={this._renderSeparator}
                        renderItem={({ item, index }) => this._renderItems({ item, index })}
                        keyExtractor={item => item}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.userAddresses.loading}
                                onRefresh={()=>{this.props.onReferesh();this.componentDidMount()}}
                                tintColor={THEME.PRIMARY_COLOR}
                                colors={[THEME.PRIMARY_COLOR]}
                            />
                        }
                    />

                </View>
                <FooterButton title="Add New Address" onPress={() => { }} />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userAddresses: state.userAddresses || {}
    };
};

export default connect(mapStateToProps)(MyAddresses);