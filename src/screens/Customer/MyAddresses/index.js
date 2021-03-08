import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, RefreshControl } from 'react-native';
import styles from './styles';
import { FooterButton, Icon, } from '../../../components';
import THEME from '../../../assets/styles/theme.style';
import { connect } from 'react-redux';
import { UserAddresses } from '../../../services';
import { ActivityIndicator } from 'react-native';
import Trash from '../../../assets/svg/deleteblack.svg'
import TrashColor from '../../../assets/svg/deletecolor.svg'
import Edit from '../../../assets/svg/editBlack.svg'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Modal from 'react-native-modal';
var swipeableRef = {}
class MyAddresses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
            loading: true,
            lastIndex: -1,
            presentAlertModal: false,
            item: {}

        }
    }

    componentDidMount = () => {
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token
        }
        UserAddresses.viewAllAddresses(userData)
            .then((res) => {
                let address = [];
                let data = [...res.data.addresses]
                data.forEach((item, index) => {
                    if (item.is_selected == 1) {

                    } else {
                        address.push(item)
                    }
                })
                this.setState({ addresses: address, loading: false });
            })
            .catch((error) => console.log(error))

    }

    handleOnDelete = (item) => {
        this.props.onDelete(item);
        swipeableRef[this.state.lastIndex]?.close()
        this.setState({ lastIndex: -1, addresses: this.state.addresses.filter((obj => obj.id != item.id)), presentAlertModal: false, })
    }

    _renderSeparator = () => {
        return (
            <>
                <View style={styles.gapHeight}></View>
                {/* <View style={styles.seperatorStyle}></View> */}
            </>
        )
    }

    renderLeftActions = (progress, dragX, item) => {
        // console.log("item:", item)
        return (
            <View style={{ flexDirection: 'row', backgroundColor: THEME.PRIMARY_COLOR }}>
                <TouchableOpacity
                    onPress={() => this.props.onEdit(item)}
                    style={{
                        // backgroundColor: THEME.PRIMARY_COLOR,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // width: 90,
                        // height: 90,
                        paddingRight: 10
                    }}>

                    <Edit height={50} width={50} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({ presentAlertModal: true, item: item })
                    }}
                    style={{
                        // backgroundColor: THEME.PRIMARY_COLOR,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // width: 50,
                        // borderRadius: 13,
                        // height: 50,

                        paddingRight: 10
                    }}>
                    <Trash height={40} width={40} />
                </TouchableOpacity>
            </View>
        );
    };

    _renderItems = ({ item, index }) => {
        return (

            <View style={styles.contentContainer}>
                <View style={styles.gapHeight}></View>
                <View style={styles.row}>
                    <View style={{ flex: 0.8, paddingHorizontal: "5%" }}>
                        <Text style={styles.labelTextStyle}><Text style={{ fontFamily: 'Poppins-Bold' }}>Label: </Text>{item.label_as}</Text>
                        <Text style={styles.labelTextStyle}><Text style={{ fontFamily: 'Poppins-Bold' }}>Address: </Text>{item.address}</Text>
                    </View>
                    {/* <View style={styles.labelRowContainer}>
                        <Icon.FontAwesome name={item.label_as == 'Home' ? 'home' : item.label_as == 'Work' ? 'building' : 'group'} size={25} color={THEME.COLOR_WHITE} />
                        <View style={{ marginLeft: '5%', marginTop: '3%' }}>
                            <Text style={styles.labelTextStyle}>{item.label_as}</Text>
                        </View>
                    </View> */}
                    {/* <View style={[styles.buttonEditContainer, { flex: 0.2 }]}>
                        <TouchableOpacity style={{ marginRight: '10%' }} onPress={() => this.props.onEdit(item)} >
                            <Icon.MaterialIcons name='edit' size={25} color={THEME.COLOR_WHITE} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleOnDelete(item)}>
                            <Icon.MaterialIcons name='delete' size={25} color={THEME.COLOR_WHITE} />
                        </TouchableOpacity>
                    </View> */}
                </View>
                <View style={styles.addressContainer} >
                    {/* <Text style={styles.textStyle}>{item.address}</Text> */}
                    <Text style={styles.textStyle}>{item.city}</Text>
                </View>
            </View>
        )
    }

    updateRef = ref => {
        this._swipeableRow = ref;
    };
    close = () => {
        console.log(this._swipeableRow)
        console.log("this.state.lastIndex:", this.state.lastIndex)
        this._swipeableRow.close(this.state.lastIndex);
    };

    render() {
        var { lastIndex } = this.state;
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.8 }}>
                    {
                        this.state.loading ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <ActivityIndicator />
                            </View>
                            :
                            this.state.addresses.length != 0 ?
                                < FlatList
                                    data={this.state.addresses}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={this._renderSeparator}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <Swipeable
                                                useNativeAnimations={true}
                                                overshootRight={false}
                                                ref={(Swipeable) => swipeableRef[index] = Swipeable}
                                                onSwipeableWillOpen={() => {
                                                    if (lastIndex == -1) {
                                                        this.setState({ lastIndex: index });
                                                    }
                                                    else {
                                                        if (index != lastIndex) {
                                                            if (index != lastIndex) {
                                                                swipeableRef[lastIndex]?.close()
                                                            }
                                                        }
                                                        this.setState({ lastIndex: index });
                                                    }
                                                }}
                                                renderRightActions={(progress, dragX) => this.renderLeftActions(progress, dragX, item)}
                                            >
                                                {this._renderItems({ item, index })}
                                            </Swipeable>
                                        )
                                    }}
                                    keyExtractor={item => item}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.loading}
                                            onRefresh={() => { this.props.onReferesh(); this.componentDidMount() }}
                                            tintColor={THEME.PRIMARY_COLOR}
                                            colors={[THEME.PRIMARY_COLOR]}
                                        />
                                    }
                                />
                                :
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={styles.labelTextStyle}>No Address Found</Text>
                                </View>
                    }
                </View>
                <FooterButton title="Add New Address" onPress={() => this.props.addAddress()} />
                <Modal isVisible={this.state.presentAlertModal}>
                    <View style={{ backgroundColor: '#171717', paddingVertical: "5%" }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: "5%", marginHorizontal: '6%' }}>
                            <TrashColor />
                            <Text style={{ fontFamily: "Poppins-Medium", textAlign: "center", paddingTop: "5%", color: "white" }}>Are you sure you want to delete this address? This will delete the address permanently.</Text>
                        </View>
                        <View style={{ paddingTop: '5%', marginHorizontal: "10%", flexDirection: "row", justifyContent: "space-between", paddingBottom: '5%', }}>
                            <TouchableOpacity onPress={() => {  swipeableRef[this.state.lastIndex]?.close(); this.setState({ presentAlertModal: false }) }} style={{ width: 120, backgroundColor: THEME.PRIMARY_COLOR, height: 50, justifyContent: 'center' }}>
                                <Text style={{ color: '#171717', textAlign: 'center', fontFamily: 'Poppins-Bold' }} >Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleOnDelete(this.state.item)} style={{ width: 120, backgroundColor: "#FF6635", height: 50, justifyContent: 'center' }}>
                                <Text style={{ color: '#171717', textAlign: 'center', fontFamily: 'Poppins-Bold' }} >Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {},
        userAddresses: state.userAddresses || {}
    };
};

export default connect(mapStateToProps)(MyAddresses);