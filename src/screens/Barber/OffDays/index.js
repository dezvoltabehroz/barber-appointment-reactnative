import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { FooterButton, Icon } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import { Barbers, RegisterUser } from '../../../services';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../../redux/actions/auth';
import moment from 'moment';
class OffDays extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offDays: [],
            loading: true,
        }
    }

    componentDidMount = () => {
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token
        }
        Barbers.viewListBarberOffDay(userData)
            .then((res) => {
                this.setState({ offDays: res.data.resOffDay, loading: false });
            })
            .catch((err) => console.log(err))
    }

    on_Press_Delete = (itemData, index) => {
        Alert.alert('Attension', 'Are you sure you want to delete this leave',
            [
                {
                    text: "Cancel",
                    // onPress: () => this.handleCancel(),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.handleDeleteDay(itemData) }
            ],

        );
    }

    handleDeleteDay = (itemData) => {
        this.setState({ loading: true })
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            off_day_id: itemData.id
        }
        Barbers.deleteBarberOffDay(userData)
            .then((res) => {
                if (res.data.status) {
                    let offDays = [...this.state.offDays];
                    this.setState({ offDays: offDays.filter((obj => obj.id != itemData.id)), loading: false })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    _renderItems = ({ item, index }) => {
        return (
            <View style={styles.contentContainer}>
                <View style={{ justifyContent: 'center', flex: 0.9 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.headingTextStyle}>{'Day:  '}</Text>
                        <Text style={styles.textStyle}>{moment(item.off_date).format('dddd')} on {moment(item.off_date).format('LL')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={styles.headingTextStyle}>{"Reason:  "}</Text>
                        <Text style={styles.textStyle}>{item.off_reason}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ justifyContent: 'center', flex: 0.1 }} onPress={() => this.on_Press_Delete(item, index)}>
                    <Icon.MaterialIcons name='delete' size={25} color={THEME.COLOR_WHITE} />
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        const { loading } = this.state;
        return (
            <>
                <View style={styles.container}>
                    {
                        loading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator />
                            </View>
                            :

                            <>
                                {
                                    this.state.offDays.length == 0 ?
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={styles.textStyle}>{'No Off Days Found'}</Text>
                                        </View>
                                        :
                                        <View style={styles.upperContainer}>
                                            <FlatList
                                                refreshControl={<RefreshControl
                                                    refreshing={this.state.loading}
                                                    onRefresh={() => this.componentDidMount()}
                                                    tintColor={THEME.COLOR_WHITE}
                                                    colors={[THEME.PRIMARY_COLOR]}
                                                />}
                                                data={this.state.offDays}
                                                showsVerticalScrollIndicator={false}
                                                ItemSeparatorComponent={this._renderSeparator}
                                                renderItem={({ item, index }) => this._renderItems({ item, index })}
                                                keyExtractor={item => item} />
                                        </View>
                                }

                                <FooterButton title='Add Leave' onPress={() => this.props.onNext()} />
                            </>
                    }
                </View>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {},
        category: state.categoryReducer || {}
    };
};
const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OffDays)