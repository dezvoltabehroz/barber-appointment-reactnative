import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './style';


export default class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "support@mail.com",
            phone: "+1234567890",
            contents: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It ha Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from"
        }
    }
    render() {
        return (

            <View style={styles.mainView}>
                <View>
                    <ScrollView style={{ marginTop: 0 }}>
                        <View style={styles.aboutcontentmainStyle}>
                            <Text style={styles.aboutcontentStyle}>
                                {this.state.contents}
                            </Text>
                            <Text style={styles.aboutTitleStyle}>Contact Details</Text>
                            <View style={styles.contact}>
                                <View style={styles.rowContainer}>
                                    <Text style={styles.contacttype1}>Email :</Text>
                                    <Text style={styles.contacttype2}> {this.state.email}</Text>
                                </View>
                                <View style={styles.rowContainer}>
                                    <Text style={styles.contacttype1}>Phone :</Text>
                                    <Text style={styles.contacttype2}> {this.state.phone}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>

        );
    }

}