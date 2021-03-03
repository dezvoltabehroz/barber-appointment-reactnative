import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from './style';
import { Avatar, SearchBar } from "react-native-elements";
import { Barbers } from "../../../services";
import { connect } from 'react-redux';
import moment from 'moment'
import themeStyle from "../../../assets/styles/theme.style";
import Search from '../../../assets/svg/search.svg'
class BarberList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            loading: false,
            barberList: [],
            days: [
                { day: "Monday" },
                { day: "Tuesday" },
                { day: "Wednesday" },
                { day: "Thursday" },
                { day: "Friday" },
                { day: "Saturday" },
                { day: "Sunday" }
            ]
        }
        this.arrayHolder = this.state.barberList
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorHeightStyle}></View>
        )
    }

    searchFilterBarber = text => {
        this.setState({ value: text });
        const newData = this.arrayHolder.filter(item => {
            const itemData = `${item.full_name.toUpperCase()} ${item.full_name.toUpperCase()} ${item.full_name.toUpperCase()} `;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        if (newData.length != 0) {
            this.setState({ barberList: newData });
        }
    };

    componentDidMount = () => {
        this.setState({ loading: true })
        const { search, id } = this.props;

        if (search) {
            this.setState({ barberList: this.props.barberList, loading: false })
            this.arrayHolder = this.props.barberList
        } else {
            let userData = {
                id: this.props.user.userData.id != undefined ? this.props.user.userData.id : '',
                token: this.props.user.userData.token != undefined ? this.props.user.userData.token : '',
                service_id: id
            }
            Barbers.getBarbersListSelectedService(userData)
                .then((res) => {
                    this.setState({ barberList: res.data.barber_list, loading: false })
                    this.arrayHolder = res.data.barber_list
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    _renderItems = (item) => {
        const time = item.time_duration != null ? item.time_duration.split(':') : ""
        const hours = time != "" ? parseInt(time[0]) : ""
        const minutes = time != "" ? parseInt(time[1]) : ""
        const timeInHour = time != "" ? moment.utc().hours(hours).minutes(minutes).format("HH:mm") : ""
        const { onPress, bookNow } = this.props;
        return (
            <>
                <TouchableOpacity onPress={() => onPress(item.id)} style={styles.listItemContainer}>
                    <View style={styles.cardStyle} >

                        <View style={styles.nameContainer}>
                            {/* <View> */}

                            <View style={{ flex: 0.8 }}>
                                <Text style={styles.nameTextStyle} >{item.full_name}</Text>
                                <Text style={styles.dateTextStyle} >Age: {item.age}</Text>
                                <Text style={[styles.dateTextStyle, { textTransform: "capitalize" }]} >Estimated Duration:
                         {time != "" ?
                                        <>
                                            {
                                                timeInHour[0] == 0 && timeInHour[1] == 0 ? "" : timeInHour[0] + timeInHour[1]}
                                            {
                                                timeInHour[0] == 0 && timeInHour[1] == 0 ?
                                                    null
                                                    :
                                                    <Text style={styles.textStyles}> hr</Text>
                                            }
                                            {timeInHour[3] == 0 && timeInHour[4] == 0 ? "" : ` ${timeInHour[3]}${timeInHour[4]}`}
                                            {
                                                timeInHour[3] == 0 && timeInHour[4] == 0 ?
                                                    null
                                                    :
                                                    <Text style={styles.textStyles}> mins</Text>
                                            }
                                        </>
                                        : null
                                    }</Text>
                                <Text style={styles.dateTextStyle} >Charges: {item.price ? "$" + item.price : ''}</Text>
                                {/* <View>
                                    <Text style={styles.dateTextStyle} >Working Days: </Text>
                                </View> */}
                                <View style={styles.daycontainer}>
                                    {
                                        item.working_days.map((item, index) => {
                                            return (
                                                <View key={index} style={styles.daysContainer}>
                                                    <Text style={styles.textStyle}>{`${item.day[0]}`}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.avatarContainer}>
                                <Avatar source={{ uri: item.profile_picture }} rounded size={70} />
                            </View>
                            {/* </View> */}

                        </View>
                        <View style={{ padding: '5%' }} >
                            <TouchableOpacity onPress={() => bookNow(item.id)} style={styles.buttonStyle}>
                                <Text style={styles.buttonTextStyle}>
                                    Book Now
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        )
    }
    _renderItemsBarber = (item) => {
        const { onPress, bookNow } = this.props;
        return (
            <>
                <TouchableOpacity onPress={() => onPress(item.id)} style={styles.listItemContainer}>
                    <View style={styles.cardStyle} >

                        <View style={styles.nameContainer}>
                            {/* <View> */}

                            <View>
                                <Text style={styles.nameTextStyle} >{item.full_name}</Text>
                                <Text style={styles.dateTextStyle} >Age: {item.age}</Text>
                                <Text style={styles.dateTextStyle} >Est. Duration:
                         {time != "" ?
                                        <>
                                            {
                                                timeInHour[0] == 0 && timeInHour[1] == 0 ? "" : timeInHour[0] + timeInHour[1]}
                                            {
                                                timeInHour[0] == 0 && timeInHour[1] == 0 ?
                                                    null
                                                    :
                                                    <Text style={styles.textStyles}> hr</Text>
                                            }
                                            {timeInHour[3] == 0 && timeInHour[4] == 0 ? "" : ` ${timeInHour[3]}${timeInHour[4]}`}
                                            {
                                                timeInHour[3] == 0 && timeInHour[4] == 0 ?
                                                    null
                                                    :
                                                    <Text style={styles.textStyles}> mins</Text>
                                            }
                                        </>
                                        : null
                                    }</Text>
                                <Text style={styles.dateTextStyle} >Charges: {item.price ? "$" + item.price : ''}</Text>
                                <View>
                                    <Text style={styles.dateTextStyle} >Working Days: </Text>
                                </View>
                                <View style={styles.daycontainer}>
                                    {
                                        this.state.days.forEach((d, i) => {
                                            item.working_days.map((item, index) => {
                                                console.log(d.day, item.day)
                                                return (
                                                    <View key={index} style={[styles.daysContainer, { backgroundColor: d.day == item.day ? themeStyle.PRIMARY_COLOR : "#000" }]}>
                                                        <Text style={styles.textStyle}>{`${item.day[0]}${item.day[1]}${item.day[2]}`}</Text>
                                                    </View>
                                                )
                                            })

                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.avatarContainer}>
                                <Avatar source={{ uri: item.profile_picture }} rounded size={70} />

                            </View>
                            {/* </View> */}

                        </View>
                        <View style={{ padding: '5%' }} >
                            <TouchableOpacity onPress={() => bookNow(item.id)} style={styles.buttonStyle}>
                                <Text style={styles.buttonTextStyle}>
                                    Book Now
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    render() {
        const { loading } = this.state;
        return (

            <View style={styles.container}>

                {
                    loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator />
                        </View>
                        :
                        this.state.barberList.length == 0 ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 16, fontFamily: "Poppins-Medium", color: "white" }}>No Barber Found </Text>
                            </View>
                            :
                            this.props.search ?
                                <>
                                    <SearchBar
                                        placeholder='Search...'
                                        round
                                        onChangeText={text => this.searchFilterBarber(text)}
                                        value={this.state.value}
                                        autoCorrect={false}
                                        leftIcon={<Search height={20} width={20} />}
                                        inputStyle={{ fontSize: 14, }}
                                        leftIconContainerStyle={{ paddingLeft: 10 }}
                                        rightIconContainerStyle={{ paddingRight: 10 }}
                                        containerStyle={styles.containerStyle}
                                        inputContainerStyle={styles.inputContainerStyle}
                                    />
                                    <FlatList
                                        data={this.state.barberList}
                                        showsVerticalScrollIndicator={false}
                                        ItemSeparatorComponent={this._renderSeparator}
                                        renderItem={({ item }) => this._renderItemsBarber(item)}
                                        keyExtractor={item => item} />
                                </>
                                :
                                <>
                                    <SearchBar
                                        placeholder='Search...'
                                        // round
                                        searchIcon={()=>(<Search height={20} width={20} />)}
                                        onChangeText={text => this.searchFilterBarber(text)}
                                        value={this.state.value}
                                        autoCorrect={false}
                                        inputStyle={{ fontSize: 14, }}
                                        leftIconContainerStyle={{ paddingLeft: 10 }}
                                        rightIconContainerStyle={{ paddingRight: 10 }}
                                        containerStyle={styles.containerStyle}
                                        inputContainerStyle={styles.inputContainerStyle} />
                                    <FlatList
                                        data={this.state.barberList}
                                        showsVerticalScrollIndicator={false}
                                        ItemSeparatorComponent={this._renderSeparator}
                                        renderItem={({ item }) => this._renderItems(item)}
                                        keyExtractor={item => item} />
                                </>
                }
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {},
        barberList: state.barberReducer.barberList || {}
    };
};


export default connect(mapStateToProps)(BarberList)