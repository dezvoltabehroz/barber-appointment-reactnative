import React, { Component } from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { FooterButton, Button, Icon } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import { Barbers, RegisterUser } from '../../../services';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../../redux/actions/auth';

class ManageWorkingDays extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDays: [],
            edit: false,
            workingDays: [
                { id: 1, day: 'Monday', selected: false, startTime: '', endTime: '', isFilled: '' },
                { id: 2, day: 'Tuesday', selected: false, startTime: '', endTime: '', isFilled: '' },
                { id: 3, day: 'Wednesday', selected: false, startTime: '', endTime: '', isFilled: '' },
                { id: 4, day: 'Thursday', selected: false, startTime: '', endTime: '', isFilled: '' },
                { id: 5, day: 'Friday', selected: false, startTime: '', endTime: '', isFilled: '' },
                { id: 6, day: 'Saturday', selected: false, startTime: '', endTime: '', isFilled: '' },
                { id: 7, day: 'Sunday', selected: false, startTime: '', endTime: '', isFilled: '' },
            ],
        }
    }
    componentDidMount = () => {
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
        }
        Barbers.viewBarberWorkingDays(userData)
            .then((res) => {
                if (res.data.status) {
                    let array = [...this.state.workingDays];
                    let selectedArray = [];
                    res.data.resSchedule.forEach((element, index) => {
                        for (let index = 0; index < array.length; index++) {
                            if (element.day == array[index].day) {
                                array[index] = { ...array[index], selected: true, startTime: element.start_time, endTime: element.end_time, isFilled: '1' };
                                selectedArray.push(array[index]);
                            }
                        }
                    })
                    this.setState({ workingDays: array, selectedDays: selectedArray })
                }
            })
            .catch((err) => console.log(err))
    }

    handleSelected = (val) => {
        const objIndex = this.state.workingDays.findIndex((obj => obj.id == val.id));
        let items = [...this.state.workingDays];
        if (items[objIndex].selected) {
            items[objIndex] = { ...items[objIndex], selected: false };
            this.setState({ workingDays: items });
            if (!items[objIndex].selected) {
                for (var i = 0; i < this.state.selectedDays.length; i++) {
                    if (!this.state.selectedDays[i].id) {
                        this.state.selectedDays.splice(i, 1);
                    }
                }
                this.setState({ selectedDays: this.state.selectedDays.filter(item => item.id != val.id) })
            }
        } else {
            for (var i = 0; i < this.state.selectedDays.length; i++) {
                if (!this.state.selectedDays[i].id) {
                    this.state.selectedDays.splice(i, 1);
                }
            }
            items[objIndex] = { ...items[objIndex], selected: true };
            this.setState({ workingDays: items });
            this.state.selectedDays.push(items[objIndex]);
        }
    }

    on_Next_press = () => {
        const { onNext } = this.props;
        let working_days = [];
        let selectedArray = this.state.selectedDays;
        if (selectedArray.length == 0) {
            Alert.alert('Attention', 'Please select atleast one Day of working')
        }
        else {
            // if (selectedArray[selectedArray.length - 1].dayCounter == 0) {
            //     this.setState({ selectedDays: selectedArray })
            //     onNext(this.state.selectedDays)
            // }
            // else {
            //     selectedArray.push({ dayCounter: 0 })
            //     this.setState({ selectedDays: selectedArray })
            //     onNext(this.state.selectedDays)
            // }
            selectedArray.forEach((item, index) => {
                working_days.push(item.day)
            })
            let userData = {
                id: this.props.user.userData.id,
                token: this.props.user.userData.token,
                steps_count: 3,
                working_days: working_days
            }
            Barbers.addBarberWorkingDays(userData)
                .then((res) => {
                    if (res.data.status) {
                        RegisterUser.userStepCount(userData)
                            .then((res) => {
                                if (res.data.status) {
                                    this.props.authActions.getUserProfile(userData, this.props.navigate);
                                    this.setState({ buttonLoading: false })
                                }
                            })
                            .catch(err => console.log(err))
                    }
                })
                .catch((err) => console.log(err))
        }
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    _renderItems = (item) => {
        const { edit } = this.state;
        return (
            <>
                <View style={styles.contentContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.textStyle}>{item.day}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity disabled={edit ? false : true} onPress={() => this.handleSelected(item)}>
                            <Icon.MaterialCommunityIcons
                                name={item.selected == true ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                                color={THEME.COLOR_WHITE} size={THEME.ICON_SIZE} />
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }



    render() {
        const { onNext } = this.props;
        const { workingDays, edit } = this.state;
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <FlatList
                            data={workingDays}
                            refreshControl={<RefreshControl
                                refreshing={this.state.loading}
                                onRefresh={() => this.componentDidMount()}
                                tintColor={THEME.COLOR_WHITE}
                                colors={[THEME.PRIMARY_COLOR]}
                            />}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={this._renderSeparator}
                            renderItem={({ item }) => this._renderItems(item)}
                            keyExtractor={item => item} />
                    </View>
                    <View style={styles.footerStyle}>
                        <View style={styles.lineStyle}></View>
                        <View style={styles.gapHeight}></View>
                        {
                            edit ?
                                <>
                                    <View style={[styles.buttonContainer, { flexDirection: "row", justifyContent: 'space-between' }]}>
                                        <View style={{ flex: 0.45 }}>
                                            <Button title="Cancel  " onPress={() => this.setState({ edit: false })} />
                                        </View>
                                        <View style={{ flex: 0.45 }}>
                                            <Button title="Update Time  " disabled={this.state.selectedDays.length == 0 ? true : false} onPress={() => onNext(this.state.selectedDays)} />
                                        </View>
                                    </View>
                                    <View style={styles.gapHeight1}></View>
                                </>
                                :
                                <View style={styles.buttonContainer}>
                                    <Button title={"Edit"} onPress={() => this.setState({ edit: true })} />
                                </View>
                        }
                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageWorkingDays)