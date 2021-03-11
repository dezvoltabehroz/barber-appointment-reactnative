

import React, { Component } from 'react';
import {
    View,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    Modal,
    FlatList
} from 'react-native';
import styles from './style';
import moment from 'moment';
import { Avatar } from 'react-native-elements';
import { Barbers } from '../../services';

class Summary extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            barberName: '',
            barberProfilePicture: '',
            barberAge: ''

        }
    }
    componentDidMount = () => {
        const { userdata } = this.props;
        Barbers.getBarberProfile(userdata)
            .then((res) => {
                this.setState({
                    barberName: res.data.barber_details.full_name,
                    barberProfilePicture: res.data.barber_details.profile_picture,
                    barberAge: res.data.barber_details.age,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    _renderItems = ({ index, item }) => {
        const { onChangePress } = this.props;
        var h = parseInt(moment.duration(item.time_duration).asMinutes()) / 60 | 0;
        var m = parseInt(moment.duration(item.time_duration).asMinutes()) % 60 | 0;
        const timeInHour = moment.utc().hours(h).minutes(m).format("HH:mm")
        return (
            <>
                {/* <View style={styles.lineStyle}></View> */}
                <View style={styles.rowContainer}>
                    <View style={[styles.columnChange, { alignItems: "flex-start" }]}>
                        <Text style={styles.textStyle}>{item.service_name} {item.quantity == '1' ? '' : `(${item.quantity})`}</Text>
                    </View>
                    <View style={styles.column} >
                        <Text style={styles.textStyle}>
                            {timeInHour[0] == 0 && timeInHour[1] == 0 ? "" : timeInHour[0] + timeInHour[1]}
                            {
                                timeInHour[0] == 0 && timeInHour[1] == 0 ?
                                    null
                                    :
                                    <Text style={styles.textStyles}> Hour</Text>
                            }
                            {timeInHour[3] == 0 && timeInHour[4] == 0 ? "" : ` ${timeInHour[3]}${timeInHour[4]}`}
                            {
                                timeInHour[3] == 0 && timeInHour[4] == 0 ?
                                    null
                                    :
                                    <Text style={styles.textStyles}> Minutes</Text>
                            }</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.textStyle}>${(item.price * item.quantity)}</Text>
                    </View>
                </View>
            </>)
    }

    render() {
        const { services, addresslocation, bookingTime, totalTime } = this.props;
        const { barberAge, barberName, barberProfilePicture } = this.state;
        let dateString = moment(bookingTime, 'hh:mm A')
        dateString.add(totalTime, 'minutes')
        let time = bookingTime + ' - ' + moment(dateString).format('hh:mm A')
        return (
            <>
                <ScrollView>
                    <View style={styles.marginVertical}>
                        <View style={styles.generalMargin}>
                            <Text style={styles.colorTextStyle}>Services</Text>
                        </View>
                        <View style={styles.container}>
                            {/* <View style={[styles.rowContainer,{marginTop:'2%'}]}>
                                <View style={styles.columnChange}>
                                    <Text style={styles.colorTextStyle}>Title</Text>
                                </View>
                                <View style={styles.column}>
                                    <Text style={styles.colorTextStyle}>Time</Text>
                                </View>
                                <View style={styles.column}>
                                    <Text style={styles.colorTextStyle}>price</Text>
                                </View>
                            </View> */}
                            <View style={styles.rowStyle}>
                                <FlatList data={services}
                                    keyExtractor={item => item}
                                    ItemSeparatorComponent={this.renderSeparator}
                                    renderItem={({ index, item }) => this._renderItems({ index, item })} />
                            </View>
                        </View>
                    </View>
                    {/* <View style={styles.borderStyle}></View> */}
                    <View style={styles.marginVertical}>
                        <View style={styles.generalMargin}>
                            <Text style={styles.colorTextStyle}>Location</Text>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.addressRowContainer}>
                                {/* <View>
                                    <Text style={styles.colorTextStyle}>Address: </Text>
                                </View> */}
                                <View style={styles.textFlex}>
                                    <Text style={styles.textStyle}> {addresslocation}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* <View style={styles.borderStyle}></View> */}
                    <View style={styles.marginVertical}>
                        <View style={styles.generalMargin}>
                            <Text style={styles.colorTextStyle}>Date and Time</Text>
                        </View>
                        <View style={styles.container}>
                            <View style={[styles.rowContainer, { marginTop: '2%', }]}>
                                <Text style={styles.textStyle}>{this.props.bookingDate}</Text>
                                <View style={styles.textFlex}>
                                    <Text style={styles.textStyle}>{time}</Text>
                                </View>
                            </View>
                            {/* <View style={styles.lineStyle}></View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.colorTextStyle}>Date: </Text>
                                <View style={styles.textFlex}>
                                    <Text style={styles.textStyle}>{this.props.bookingDate}</Text>
                                </View>
                            </View> */}
                        </View>
                    </View>
                    {/* <View style={styles.borderStyle}></View> */}
                    <View style={styles.marginVertical}>
                        <View style={styles.generalMargin}>
                            <Text style={styles.colorTextStyle}>Barber</Text>
                        </View>
                        <View style={styles.container}>
                            <View style={[styles.rowContainer, { height: null, justifyContent: 'flex-start', marginVertical: '5%' }]}>
                                <Avatar source={{ uri: barberProfilePicture }} rounded size={60} />

                                <View style={{ justifyContent: 'flex-start', marginTop: '5%' }}>
                                    <View style={styles.rowContainer}>
                                        <Text style={styles.colorTextStyle}>Name: </Text>
                                        <View style={{ marginHorizontal: '1%' }}>
                                            <Text style={styles.textStyle}>{barberName}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.rowContainer, { justifyContent: "flex-start" }]}>
                                        <Text style={styles.colorTextStyle}>Age: </Text>
                                        <View style={{ width: 25}}></View>
                                        <View style={styles.textFlex}>
                                            <Text style={styles.textStyle}>{barberAge}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </>
        );
    }
};



export default Summary;
