import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import { FooterButton, Button, Icon, DateTimeModal } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import COMMON_STYLE from '../../../assets/styles/common.style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Calendar } from 'react-native-calendars';
import { Barbers, RegisterUser, SchedulerServices } from '../../../services';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../../redux/actions/auth';
import moment from 'moment';
class ManageSchedulerDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDays: [],
            showTimePicker: false,
            indexValue: '',
            item: null,
            val: '',
            submit: false,
            loading: false,
            buttonLoading: false,
            startTime: '',
            endTime: '',
            showEditService: false
        }
    }

    componentDidMount = () => {
        this.setState({ loading: true })
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            scheduler_id: this.props.item.id
        }
        SchedulerServices.schedulerDetail(userData)
            .then((response) => {
                console.log(response.data)
                if (response.data.status) {
                    this.setState({ selectedDays: response.data.data, loading: false })
                }
            })
            .catch((err) => console.log(err))

    }



    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    truncateString = (str, num) => {
        if (str.length <= num) {
            return str
        }
        return str.slice(0, num) + '...'
    }

    _renderItems = ({ item, index }) => {
        const { selectedDays, submit } = this.state;
        let date = moment().format('YYYY-MM-DD');
        let startTime = item.start_time != undefined ? item.start_time != '' ? moment(`${date} ${item.start_time}`).format('hh:mm A') : "" : ""
        return (
            <View style={styles.contentContainer}>
                <View style={styles.headingContainer}>
                    <View style={styles.dayContainer}>
                        <Text style={styles.textStyle}>{moment(` ${item.date}`).format('YYYY-MM-DD')} {this.truncateString(item.day, 3)}</Text>
                    </View>
                    <View style={styles.startTimeContainer} >
                        {
                            item.start_time != '' ?
                                <View style={styles.startTimeContainer}>
                                    <Text style={styles.textStyle}>{moment(`${date} ${item.start_time}`).format('hh:mm A')}</Text>
                                </View>
                                :
                                null
                        }
                    </View>
                    <View style={styles.endTimeContainer}>
                        {
                            item.end_time != '' ?
                                <View style={styles.priceAndTimeContainer}>
                                    <Text style={styles.textStyle}>{moment(`${date} ${item.end_time}`).format('hh:mm A')}</Text>
                                </View>
                                :
                                null
                        }
                    </View>
                    {/* <View style={[styles.iconContainer, { alignItems: "flex-end" }]}>
                        {
                            item.isFilled == '1' ?
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <TouchableOpacity onPress={() => this.on_Press_Edit(item, index)} >
                                        <Icon.MaterialIcons name='edit' size={25} color={THEME.COLOR_WHITE} />
                                    </TouchableOpacity>
                                    <View style={{ width: 5 }}></View>
                                    <TouchableOpacity onPress={() => this.on_Press_Delete(item, index)}>
                                        <Icon.MaterialIcons name='delete' size={25} color={THEME.COLOR_WHITE} />
                                    </TouchableOpacity>
                                </View>
                                : null
                        }
                    </View> */}
                </View>

            </View>
        )
    }


    render() {
        const { onNext } = this.props;
        let date = moment().format('YYYY-MM-DD');
        const { selectedDays, showTimePicker, loading, buttonLoading, startTime, index, endTime, submit, showEditService, item, indexValue } = this.state;
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

                                <View style={styles.upperContainer}>
                                    <KeyboardAwareScrollView>
                                        {
                                            selectedDays.length == 0 || selectedDays[0].startTime != '' || selectedDays[0].endTime != '' ?
                                                <View style={styles.headingContainer}>
                                                    <View style={styles.dayContainer}>
                                                        <Text style={styles.headingTextStyle}>Days</Text>
                                                    </View>
                                                    <View style={styles.startTimeContainer} >
                                                        <Text style={styles.headingTextStyle1}>Start Time</Text>
                                                    </View>
                                                    <View style={styles.endTimeContainer}>

                                                        <Text style={styles.headingTextStyle1}>End Time</Text>

                                                    </View>
                                                    {/* <View style={[styles.iconContainer]}></View> */}
                                                </View>
                                                : null
                                        }
                                        <FlatList
                                            data={selectedDays}
                                            showsVerticalScrollIndicator={false}
                                            ItemSeparatorComponent={this._renderSeparator}
                                            renderItem={({ item, index }) => this._renderItems({ item, index })}
                                            keyExtractor={item => item} />
                                    </KeyboardAwareScrollView>
                                </View>
                                <View style={styles.footerStyle}>
                                    <View style={styles.lineStyle}></View>
                                    <View style={styles.gapHeight}></View>
                                    <View style={[styles.buttonContainer, { flexDirection: "row", justifyContent: 'space-between' }]}>
                                        <View style={{ flex: 0.9 }}>
                                            <Button title="Back  " onPress={() => this.props.goBack()} />
                                        </View>
                                    </View>
                                    <View style={styles.gapHeight1}></View>
                                </View>
                            </>}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedulerDetail)