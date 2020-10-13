import React, { Component } from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, Alert, Image, ScrollView } from "react-native";
import styles from './style';
import { Button, Icon, ProfileCard } from '../../../components'
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import Geocoder from 'react-native-geocoder';
import THEME from '../../../assets/styles/theme.style';
// import ProfileCard from '../../../components/ProfileCard'
import ImagePicker from 'react-native-image-picker';
class BarberEditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filePath: { uri: 'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Bearded_Man-17-512.png' },
            barberServices: [
                { id: 1, serviceName: 'Hair Cuttuing', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 2, serviceName: 'Hair Trimming', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 3, serviceName: 'Blowout', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 4, serviceName: 'Hair Color', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 5, serviceName: 'Double process hair color', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 6, serviceName: 'Shave', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '', isFilled: '' },
                { id: 7, serviceName: 'Beard Trim', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 8, serviceName: 'Braids & Twist', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 9, serviceName: 'Hair color touch ups', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 10, serviceName: 'Scalp Conditioning Treatment', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
                { id: 11, serviceName: 'Permanent Hair Retexturizing', serviceDescription: '', selected: false, price: '$30', time: '15 min', isFilled: '' },
            ],
        }
    }


    chooseFile = () => {
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('response  ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response;
                this.setState({
                    filePath: source,
                });
            }
        });
    };


    _renderItems = ({ item, index }) => {
        const { barberServices, submit } = this.state;
        return (
            <>
                <View style={styles.lineStyle}></View>
                <View style={styles.rowContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.textStyle}>{item.serviceName}</Text>
                    </View>
                    <View style={styles.priceContainer} >
                        <Text style={styles.textStyle}>{item.price}</Text>
                    </View>
                    <View style={styles.timeContainer}>
                        <Text style={styles.textStyle}>${item.time}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <View style={[styles.rowStyle, { justifyContent: 'space-evenly' }]}>
                            <TouchableOpacity onPress={() => { }} style={styles.row}>
                                <Icon.AntDesign name="edit" size={15} color={THEME.COLOR_GREY} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { }} style={styles.row}>
                                <Icon.AntDesign name="delete" size={15} color={THEME.COLOR_GREY} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </>
        )
    }


    render() {
        const { filePath } = this.state;
        return (
            <>
                <View style={styles.container}>

                    <View style={{ flex: 0.3, marginTop: '15%', marginHorizontal: '5%' }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Avatar
                                avatarStyle={styles.avatarStyle}
                                source={{ uri: filePath.uri }}
                                rounded
                                accessory={{ name: 'ios-camera', type: 'ionicon', color: '#fff', underlayColor: '#000', size: 30, iconStyle: { fontSize: 20 } }}
                                showAccessory={true}
                                // showEditButton
                                onAccessoryPress={this.chooseFile}
                                size={120} />
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.textStyle}>JOHN DOE</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{  marginTop: '20%' }}>
                        <ProfileCard
                            icon={"ios-person"}
                            heading={'PROFILE'}
                            description={'Where all of your personal details are stored and can be easily updated.'}
                            onPress={() => {

                            }}
                        />
                        <ProfileCard
                            icon={"ios-images"}
                            heading={'PORTFOLIO'}
                            description={'A collection of your uploaded photos and media recordings.'}
                            onPress={() => {

                            }}
                        />
                        <ProfileCard
                            icon={"ios-settings"}
                            heading={'SERVICES'}
                            description={'A list of your services where you can add new service and update the exsisting one.'}
                            onPress={() => { }}
                        />
                    </View>
                    {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}> */}

                    {/* <ProfileCard
                            Icon={() => <SettingsDash height={20} width={20} />}
                            heading={'SETTINGS'}
                            description={'Update or change your personal app preferences and login information.'}
                            onPress={() => {
                                firebase.analytics().logEvent('Settings_Opened', {
                                    userId: props.signUp.user.id,
                                    userEmail: props.signUp.user.email,
                                    userTimeZone: props.signUp.user.timeZone,
                                    deviceType: Platform.OS
                                });
                                navigation.navigate('DashboardSettings');
                            }}
                        />
                        <ProfileCard
                            Icon={() => <FamilyTree height={24} width={24} />}
                            heading={'FAMILY TREE'}
                            description={'Interact with family, learn about your ancestors and build your legacy.'}
                            onPress={() => { navigation.navigate('FamilyTree') }}
                        /> */}
                    {/* </ScrollView> */}
                    {/* <View style={{
                            flex: 0.4,
                            marginTop: '5%',
                            backgroundColor: '#3B3F52',
                            borderRadius: 5,
                            marginHorizontal: '5%',
                            paddingHorizontal: "3%",
                        }}>
                            <View style={styles.headingContainer}>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.headingTextStyle}>Services</Text>
                                </View>
                                <View style={styles.priceContainer} >
                                    <Text style={styles.headingTextStyle}>Price</Text>
                                </View>
                                <View style={styles.timeContainer}>
                                    <Text style={styles.headingTextStyle}>Est.Time</Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <TouchableOpacity onPress={() => { }} style={{alignItems:'center'}}>
                                        <Icon.Ionicons name="ios-add-circle" size={35} color={THEME.COLOR_GREY} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View>

                            </View>
                            <FlatList
                                data={this.state.barberServices}
                                showsVerticalScrollIndicator={false}
                                ItemSeparatorComponent={this._renderSeparator}
                                renderItem={({ item, index }) => this._renderItems({ item, index })}
                                keyExtractor={item => item} />
                        </View> */}
                </View>
            </>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(BarberEditProfile)