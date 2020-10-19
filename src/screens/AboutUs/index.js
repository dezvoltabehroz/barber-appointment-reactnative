import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import styles from './style';
import { About } from '../../services'
import HTML from 'react-native-render-html'
export default class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            content: null
        }
    }
    componentDidMount = () => {
        this.setState({ loading: true })
        About.getAboutUs()
            .then(res => {
                console.log(res.data)
                this.setState({ content: res.data.content, loading: false })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <View style={styles.mainView}>
                <ScrollView >
                    {this.state.loading ? (
                        <View style={styles.mainView}>
                            <ActivityIndicator />
                        </View>
                    ) : (
                            <HTML html={this.state.content} baseFontStyle={styles.aboutcontentStyle} />
                        )}

                </ScrollView>
            </View>
        );
    }
}