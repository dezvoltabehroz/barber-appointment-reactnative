import React, { Component } from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { FooterButton, Button, Icon } from '../../../components';
import styles from './style';
import THEME from '../../../assets/styles/theme.style';
import { Barbers, RegisterUser, SchedulerServices } from '../../../services';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../../redux/actions/auth';
import Modal from 'react-native-modal';
import moment from 'moment'
import { Calendar } from 'react-native-calendars';
import { ThemeContext } from 'react-native-elements';
class WorkingDays extends Component {
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
            loading: true,
            startDate: '',
            endDate: '',
            markDaysObject: {},
            newWorkingDays: [],
            schedulerArray: [],
            item: null
        }
    }

    getDates = (startDate, endDate) => {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(endDate);
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
            currentDate = moment(currentDate).add(1, 'days');
        }
        let markDaysObject = {};
        if (dateArray != 'undefined') {
            dateArray.forEach((day) => {
                if (day == moment(startDate).format('YYYY-MM-DD')) {
                    markDaysObject[day] = {
                        startingDay: true,
                        color: THEME.PRIMARY_COLOR,
                        textColor: 'white'
                    };
                }
                else if (day == moment(endDate).format('YYYY-MM-DD')) {
                    markDaysObject[day] = {
                        endingDay: true,
                        color: THEME.PRIMARY_COLOR,
                        textColor: 'white'
                    };
                }
                else {
                    markDaysObject[day] = {
                        color: THEME.PRIMARY_COLOR,
                        textColor: 'white'
                    };
                }


            });
            this.setState({ markDaysObject: markDaysObject })
        }
    }

    componentDidMount = () => {
        console.log(this.props.user.userData)
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
        }
        SchedulerServices.getAllListScheduler(userData)
            .then((res) => {
                if (res.data.status) {
                    this.setState({ schedulerArray: res.data.data, loading: false })
                }
                else {
                    this.setState({ schedulerArray: [], loading: false })
                }
            })
            .catch((err) => console.log(err))
    }
    days = () => {
        var d = new Date(this.state.startDate),
            a = [],
            to = new Date(this.state.endDate),
            y = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        while (d < to) {
            a.push({ day: y[d.getDay()], date: `${moment(d).format('YYYY-MM-DD')}` });
            d.setDate(d.getDate() + 1);
        }
        if (d.getDay() === to.getDay()) // include last day
            a.push({ day: y[d.getDay()], date: `${moment(d).format('YYYY-MM-DD')}` });
        return a
    }
    handlePressDone = () => {
        let array = [];
        let data = this.days();
        var uniq = [...new Set(data)];
        data.map((item, index) => {
            array[index] = { ...array[index], id: index + 1, selected: true, startTime: '', endTime: '', isFilled: '', day: item.day, date: item.date }
        })
        console.log(array)
        this.setState({ newWorkingDays: array, editModal: false, selectedDays: array }, () => this.props.onNext(array, this.state.item))
    }

    // handleSelected = (val) => {
    //     const objIndex = this.state.newWorkingDays.length != 0 ? this.state.newWorkingDays.findIndex((obj => obj.id == val.id)) : this.state.workingDays.findIndex((obj => obj.id == val.id));
    //     let items = [...this.state.newWorkingDays.length != 0 ? this.state.newWorkingDays : this.state.workingDays];
    //     if (items[objIndex].selected) {
    //         items[objIndex] = { ...items[objIndex], selected: false };
    //         this.setState({ workingDays: items });
    //         if (!items[objIndex].selected) {
    //             for (var i = 0; i < this.state.selectedDays.length; i++) {
    //                 if (!this.state.selectedDays[i].id) {
    //                     this.state.selectedDays.splice(i, 1);
    //                 }
    //             }
    //             this.setState({ selectedDays: this.state.selectedDays.filter(item => item.id != val.id) })
    //         }
    //     } else {
    //         for (var i = 0; i < this.state.selectedDays.length; i++) {
    //             if (!this.state.selectedDays[i].id) {
    //                 this.state.selectedDays.splice(i, 1);
    //             }
    //         }
    //         items[objIndex] = { ...items[objIndex], selected: true };
    //         this.setState({ workingDays: items });
    //         this.state.selectedDays.push(items[objIndex]);
    //     }
    // }

    // on_Next_press = () => {
    //     const { onNext } = this.props;
    //     let working_days = [];
    //     let selectedArray = this.state.selectedDays;
    //     if (selectedArray.length == 0) {
    //         Alert.alert('Attention', 'Please select atleast one Day of working')
    //     }
    //     else {
    //         // if (selectedArray[selectedArray.length - 1].dayCounter == 0) {
    //         //     this.setState({ selectedDays: selectedArray })
    //         //     onNext(this.state.selectedDays)
    //         // }
    //         // else {
    //         //     selectedArray.push({ dayCounter: 0 })
    //         //     this.setState({ selectedDays: selectedArray })
    //         //     onNext(this.state.selectedDays)
    //         // }
    //         selectedArray.forEach((item, index) => {
    //             working_days.push(item.day)
    //         })
    //         let userData = {
    //             id: this.props.user.userData.id,
    //             token: this.props.user.userData.token,
    //             steps_count: 3,
    //             working_days: working_days
    //         }
    //         Barbers.addBarberWorkingDays(userData)
    //             .then((res) => {
    //                 if (res.data.status) {
    //                     RegisterUser.userStepCount(userData)
    //                         .then((res) => {
    //                             if (res.data.status) {
    //                                 this.props.authActions.getUserProfile(userData, this.props.navigate);
    //                                 this.setState({ buttonLoading: false })
    //                             }
    //                         })
    //                         .catch(err => console.log(err))
    //                 }
    //             })
    //             .catch((err) => console.log(err))
    //     }
    // }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    handleDayPress = (date) => {
        const { startDate, endDate } = this.state;
        if (startDate == '') {
            let markDaysObject = {};
            markDaysObject[date.dateString] = {
                color: THEME.PRIMARY_COLOR,
                textColor: 'white'
            };
            this.setState({ startDate: date.dateString, markDaysObject })
        }
        else {
            this.setState({ endDate: date.dateString }, () => this.getDates(startDate, date.dateString))
        }

    }

    // _renderItems = (item) => {
    //     const { edit } = this.state;
    //     return (
    //         <>
    //             <View style={styles.contentContainer}>
    //                 <View style={styles.nameContainer}>
    //                     <Text style={styles.textStyle}>{item.day}</Text>
    //                 </View>
    //                 <View style={styles.iconContainer}>
    //                     <TouchableOpacity disabled={edit ? false : true} onPress={() => this.handleSelected(item)}>
    //                         <Icon.MaterialCommunityIcons
    //                             name={item.selected == true ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
    //                             color={THEME.COLOR_WHITE} size={THEME.ICON_SIZE} />
    //                     </TouchableOpacity>
    //                 </View>
    //             </View>
    //         </>
    //     )
    // }

    on_Press_Delete = (itemData, index) => {
        Alert.alert('Attension', 'Are you sure you want to delete your scheduler',
            [
                {
                    text: "Cancel",
                    // onPress: () => this.handleCancel(),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.handledelete(itemData) }
            ],

        );
    }

    handledelete = (item) => {
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            scheduler_id: item.id
        }
        SchedulerServices.deleteScheduler(userData)
            .then((res) => {
                if (res.data.status) {
                    let selectedArray = [...this.state.schedulerArray];
                    this.setState({ schedulerArray: selectedArray.filter((obj => obj.id != item.id)) })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    _renderItems = (item) => {
        const { edit } = this.state;
        return (
            <>
                <View style={styles.contentContainer}>
                    <TouchableOpacity onPress={() => this.props.onDetail(item)} style={styles.nameContainer}>
                        <Text style={styles.textStyle}>{item.scheduler_name}</Text>
                    </TouchableOpacity>
                    <View style={[styles.iconContainer, { flexDirection: 'row' }]}>
                        <TouchableOpacity onPress={() => this.props.onEdit(item)}>
                            <Icon.MaterialIcons
                                name={"edit"}
                                color={THEME.COLOR_WHITE} size={THEME.ICON_SIZE} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.on_Press_Delete(item)}>
                            <Icon.MaterialCommunityIcons
                                name={"delete"}
                                color={THEME.COLOR_WHITE} size={THEME.ICON_SIZE} />
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }



    render() {
        const { onNext } = this.props;
        const { workingDays, edit, loading, markDaysObject, editModal, newWorkingDays, startDate, endDate, schedulerArray } = this.state;
        return (
            <>
                <View style={styles.container}>
                    {
                        loading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator />
                            </View>
                            :

                            <View style={styles.upperContainer}>
                                {schedulerArray.length == 0 ?
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={styles.textStyle}>{'Please Create Your Schedule.'}</Text>
                                    </View>

                                    :
                                    <FlatList
                                        data={schedulerArray}
                                        refreshControl={<RefreshControl
                                            refreshing={this.state.loading}
                                            onRefresh={() => this.componentDidMount()}
                                            tintColor={THEME.COLOR_WHITE}
                                            colors={[THEME.PRIMARY_COLOR]}
                                        />}
                                        showsVerticalScrollIndicator={false}
                                        ItemSeparatorComponent={this._renderSeparator}
                                        renderItem={({ item }) => this._renderItems(item)}
                                        keyExtractor={item => item} />}
                            </View>
                    }
                    <View style={styles.footerStyle}>
                        <View style={styles.lineStyle}></View>
                        <View style={styles.gapHeight}></View>

                        <>
                            {/* <View style={[styles.buttonContainer, { flexDirection: "row", justifyContent: 'space-between' }]}>
                                        <View style={{ flex: 0.45 }}>
                                            <Button title="Cancel  " onPress={() => this.setState({ edit: false, newWorkingDays: [] })} />
                                        </View>
                                        <View style={{ flex: 0.45 }}>
                                            <Button title="Update Time  " disabled={this.state.selectedDays.length == 0 ? true : false} onPress={() => onNext(this.state.selectedDays)} />
                                        </View>
                                    </View>
                                    <View style={styles.gapHeight1}></View> */}
                        </>

                        <View style={styles.buttonContainer}>
                            <Button title={"Add"} onPress={() => this.setState({ edit: true, editModal: true })} />
                        </View>

                    </View>

                </View>
                <Modal isVisible={editModal}>
                    <View style={{ backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR, borderRadius: 10, padding: 20, justifyContent: 'center' }}>
                        <Calendar
                            markingType={'period'}
                            markedDates={markDaysObject}
                            minDate={new Date()}
                            maxDate={new Date().setDate(new Date().getDate() + 30)}
                            onDayPress={(day) => this.handleDayPress(day)}
                            monthFormat={'MMMM yyyy'}
                            theme={{
                                calendarBackground: THEME.PRIMARY_BACKGROUND_COLOR,
                                selectedDotColor: '#ffffff',
                                selectedDayBackgroundColor: '#D2A91B',
                                selectedDayTextColor: 'black',
                                dayTextColor: 'white',
                                textDisabledColor: 'grey',
                                dotColor: '#D2A91B',
                                todayTextColor: 'white',
                                arrowColor: THEME.PRIMARY_COLOR,
                                monthTextColor: 'white',
                                textDayFontFamily: "Poppins-Medium",
                                textMonthFontFamily: "Poppins-Medium",
                                textDayHeaderFontFamily: "Poppins-Medium",
                                textDayFontSize: 10,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 10,
                            }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                            <View style={{ flex: 0.45 }}>
                                <Button title="Cancel" onPress={() => this.setState({ edit: false, editModal: false, startDate: '', endDate: '', markDaysObject: {} })} />
                            </View>
                            <View style={{ flex: 0.45 }}>
                                <Button title="Done" disabled={startDate && endDate ? false : true} onPress={() => this.handlePressDone()} />
                            </View>

                        </View>
                    </View>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(WorkingDays)