import React, { Component } from 'react';
import { View, Text, ScrollView, Alert, Linking, ActivityIndicator } from 'react-native';
import styles from './style';
import { Avatar } from 'react-native-elements';
import { Button, ExpandView } from '../../../components';
import { connect } from 'react-redux';
import { Barbers } from '../../../services';

class BarberProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
            age: '',
            portfolio: [],
            certifcations: [],
            services: [],
            workingDays: [],
            resume: [],
            rating: [],
            loading: false
        }
    }

    componentDidMount = () => {
        this.setState({ loading: true })
        const { items } = this.props
        let userData = {
            id: this.props.user.id,
            barber_id: items,
            token: this.props.user.token
        }
        Barbers.getBarberProfile(userData)
            .then((res) => {
                this.setState({
                    name: res.data.barber_details.full_name,
                    image: res.data.barber_details.profile_picture,
                    age: res.data.barber_details.age,
                    portfolio: res.data.barber_details.portfolio,
                    certifcations: res.data.barber_details.certificate,
                    services: res.data.barber_details.services,
                    workingDays: res.data.barber_details.schedule,
                    resume: res.data.barber_details.resume,
                    rating: res.data.barber_details.reviews,
                    loading: false
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }


    downloadPDF = (data) => {
        if (this.state.resume.length != 0) {
            Linking.openURL(data);
        }
    }

    render() {
        const { bookNow, Auth, items } = this.props;
        const { portfolio, certifcations, services, workingDays, rating, image, name, age, loading, resume } = this.state;
        const imgUrl = 'https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png'
        return (
            <View style={styles.container}>
                <ScrollView >
                    <View style={styles.barberProfileContainer}>
                        <View style={styles.cardStyle} >
                            <View style={styles.avatarContainer}>
                                <Avatar source={{ uri: image ? image : imgUrl }} rounded size={80} />
                            </View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTextStyle} >{name != '' ? name : ''}</Text>
                                <Text style={styles.dateTextStyle} >Age: {age != '' ? age : ''}</Text>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title='Book Now' onPress={()=>bookNow(items)} />
                        </View>
                    </View>
                    {
                        loading ?
                            <View style={{ marginTop: '20%' }}>
                                <ActivityIndicator />
                            </View>
                            :
                            <ExpandView
                                Auth={Auth}
                                portfolio={portfolio}
                                certification={certifcations}
                                service={services}
                                workingDay={workingDays}
                                resume={resume}
                                onDownload={(data) => this.downloadPDF(data)}
                                rating={rating} />
                    }
                </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer.userData || {},
        barberList: state.barberReducer.barberList || {}
    };
};


export default connect(mapStateToProps)(BarberProfile)