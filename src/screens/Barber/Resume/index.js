import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, FlatList, Dimensions } from 'react-native';
import { Button, Icon, FloatingInput } from '../../../components';
import styles from './style';
import ImagePicker from 'react-native-image-picker';

import ImageCropPicker from 'react-native-image-crop-picker';
import THEME from '../../../assets/styles/theme.style';
import LightBox from "react-native-lightbox";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Table, Row, Rows } from 'react-native-table-component';
const screenHeight = Dimensions.get('window').height;

export default class Resume extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageCertification: [],
            drivingLicense: '',
            passportImage: '',
            nationalIdImage: '',
            isVisible: false,
            isEmployerFocus: false,
            employerName: '',
            isStartDate: false,
            startDate: '',
            isEndDate: false,
            endDate: '',
            showDatePicker: false,
            showEndDatePicker: false,
            dateValue: new Date(),
            employmentHistory: [],
            tableHead: ['Employer Name', 'Start Date', 'End Date'],
            tableData: [
                ['Beauty Saloon', '7/7/2015', '7/7/2020'],
                ['Paradise Saloon', '7/7/2015', '7/7/2020'],
                ['Men`s Saloon', '7/7/2015', '7/7/2020'],
                ['Buddy Cuts', '7/7/2015', '7/7/2020'],
                ['Neew Looks', '7/7/2015', '7/7/2020'],
            ]
        }
    }


    renderImage = (value) => {
        const {
            imageCertification,
            drivingLicense,
            passportImage,
            nationalIdImage,

        } = this.state;
        return (
            <Image style={styles.renderImageStyle}
                resizeMode='contain'
                source={value == 'certifcate' ?
                    imageCertification : value == 'driver' ?
                        drivingLicense : value == 'passport' ?
                            passportImage : nationalIdImage} />
        )
    }

    onChangeStartDate = (event, selectedDate) => {
        var date = selectedDate.getDate();
        date += "/";
        date += (selectedDate.getMonth() + 1);
        date += "/";
        date += (selectedDate.getYear() + 1900);
        this.setState({
            startDate: date,
            showDatePicker: false,
        })

    };

    onChangeEndDate = (event, selectedDate) => {
        var date = selectedDate.getDate();
        date += "/";
        date += (selectedDate.getMonth() + 1);
        date += "/";
        date += (selectedDate.getYear() + 1900);
        this.setState({
            endDate: date,
            showEndDatePicker: false,
        })
    };

    takePics = () => {
        ImageCropPicker.openPicker({
            width: 200,
            height: 200, compressImageMaxHeight: 400,
            compressImageMaxWidth: 400, cropping: true, multiple: true
        })
            .then(response => {
                let tempArray = []
                // console.log("responseimage-------" + response)
                // this.setState({ ImageSource: response })
                // console.log("responseimagearray" + this.state.ImageSource)
                response.forEach((item) => {
                    let image = {
                        uri: item.path,
                    }
                    // console.log("imagpath==========" + image)
                    tempArray.push(image)
                    this.setState({ imageCertification: tempArray })
                    // console.log("imagpath==========" + image)
                })
            })
    };

    renderImages = (image) => {
        return (
            <Image style={styles.renderImageStyle}
                resizeMode='contain'
                source={image} />
        )
    }

    _renderSeparator = () => {
        return (
            <View style={styles.seperatorStyle}></View>
        )
    }

    _renderItems = (image) => {
        return (
            <>
                <View style={styles.gapHeight}></View>
                <LightBox renderContent={() => this.renderImages(image)}  >
                    <Image source={image} resizeMode='cover' style={styles.imageStyle} />
                </LightBox>
            </>
        )
    }

    chooseFile = (value) => {
        var options = {
            title: 'Select an Image',
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
                if (value == 'driver') {
                    this.setState({
                        drivingLicense: source,
                    });
                } else if (value === 'passport') {
                    this.setState({
                        passportImage: source,
                    });
                } else if (value === 'nic') {
                    this.setState({
                        nationalIdImage: source,
                    });
                }

            }
        });
    };

    showInput = () => {
        this.setState({ isVisible: true });
    }

    addDetails = () => {
        let employmentDetail = {
            employerName: this.state.employerName,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        }
        this.state.employmentHistory.push(employmentDetail);
        this.setState({ isVisible: false, employerName: '', startDate: '', endDate: '' });
    }

    render() {
        const { onNext } = this.props;
        const { imageCertification,
            drivingLicense,
            passportImage,
            nationalIdImage,
            isEmployerFocus,
            isEndDate,
            isStartDate,
            isVisible,
            startDate,
            employerName,
            endDate,
            dateValue,
            showDatePicker,
            showEndDatePicker } = this.state;
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <View>
                                <View style={styles.certificationContainer1}>
                                    <View style={styles.labelContainer}  >
                                        <Text style={styles.labelTextStyle}>Certification</Text>
                                    </View>
                                    <TouchableOpacity style={styles.iconContainer} onPress={this.takePics}>
                                        <Icon.Entypo name="attachment" size={THEME.ICON_SIZE} color={THEME.COLOR_WHITE} />
                                    </TouchableOpacity>
                                </View>
                                {imageCertification != null ?
                                    <FlatList
                                        data={imageCertification}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        ItemSeparatorComponent={this._renderSeparator}
                                        renderItem={({ item }) => this._renderItems(item)}
                                        keyExtractor={item => item}
                                    />
                                    : null}
                            </View>

                            <View style={styles.certificationContainer}>
                                <View style={styles.labelContainer} >
                                    <Text style={styles.labelTextStyle}>Driving License</Text>
                                </View>
                                <TouchableOpacity style={styles.iconContainer} onPress={() => this.chooseFile('driver')}>
                                    <Icon.Entypo name="attachment" size={THEME.ICON_SIZE} color={THEME.COLOR_WHITE} />
                                </TouchableOpacity>
                                {drivingLicense != '' ?
                                    <LightBox style={styles.imageContainer} renderContent={() => this.renderImage('driver')}  >
                                        <Image source={drivingLicense} resizeMode='cover' style={styles.imageStyle} />
                                    </LightBox>
                                    : null}
                            </View>
                            <View style={styles.certificationContainer}>
                                <View style={styles.labelContainer}>
                                    <Text style={styles.labelTextStyle}>Passport</Text>
                                </View>
                                <TouchableOpacity style={styles.iconContainer} onPress={() => this.chooseFile('passport')}>
                                    <Icon.Entypo name="attachment" size={THEME.ICON_SIZE} color={THEME.COLOR_WHITE} />
                                </TouchableOpacity>
                                {passportImage != '' ?
                                    <LightBox style={styles.imageContainer} renderContent={() => this.renderImage('passport')}  >
                                        <Image source={passportImage} resizeMode='cover' style={styles.imageStyle} />
                                    </LightBox>
                                    : null}
                            </View>
                            <View style={styles.certificationContainer}>
                                <View style={styles.labelContainer} >
                                    <Text style={styles.labelTextStyle}>National Identification No:</Text>
                                </View>
                                <TouchableOpacity style={styles.iconContainer} onPress={() => this.chooseFile('nic')}>
                                    <Icon.Entypo name="attachment" size={THEME.ICON_SIZE} color={THEME.COLOR_WHITE} />
                                </TouchableOpacity>
                                {nationalIdImage != '' ?
                                    <LightBox style={styles.imageContainer} renderContent={() => this.renderImage('nic')}  >
                                        <Image source={nationalIdImage} resizeMode='cover' style={styles.imageStyle} />
                                    </LightBox>
                                    : null}
                            </View>
                            <Text style={styles.employmentLabelStyle}>Employment History</Text>
                            <TouchableOpacity style={styles.addContainer} onPress={this.showInput}>
                                <Icon.Ionicons name='md-add-circle' size={THEME.ICON_SIZE} color={THEME.COLOR_WHITE} style={{ marginHorizontal: 5 }} />
                                <Text style={styles.labelTextStyle}>History</Text>
                            </TouchableOpacity>
                            {/* <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <View style={{ flex: 0.45, flexDirection: 'column', marginHorizontal: 5 }}>
                                    <Text style={styles.labelTextStyle}>Employer Name</Text>
                                </View>
                                <View style={{ flex: 0.3, flexDirection: 'column', marginHorizontal: 5 }}>
                                    <Text style={styles.labelTextStyle}>Start Date</Text>
                                </View>
                                <View style={{ flex: 0.25, flexDirection: 'column', marginHorizontal: 5 }}>
                                    <Text style={styles.labelTextStyle}>End Date</Text>
                                </View>
                            </View>
                            {
                                this.state.employmentHistory.map((history) => {
                                    return (
                                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                            <View style={{ flexDirection: 'column', marginHorizontal: 5 }}>
                                            <Text style={styles.labelTextStyle}>Employer Name</Text>
                                                <Text style={styles.labelTextStyle}>{history.employerName}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'column', marginHorizontal: 5 }}>
                                            <Text style={styles.labelTextStyle}>Employer Name</Text>
                                                <Text style={styles.labelTextStyle}>{history.startDate}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'column', marginHorizontal: 5 }}>
                                            <Text style={styles.labelTextStyle}>Employer Name</Text>
                                                <Text style={styles.labelTextStyle}>{history.endDate}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            } */}
                            <Table borderStyle={{ borderWidth: 0.5, borderColor: THEME.COLOR_WHITE }}>
                                <Row data={this.state.tableHead} style={styles.result_textStyle} textStyle={styles.text1Style} />
                                <Rows data={this.state.tableData} style={styles.result_textStyle} textStyle={styles.textStyle} />
                            </Table>
                        </ScrollView>
                    </View>
                    <View style={styles.footerStyle}>
                        <View style={styles.lineStyle}></View>
                        <View style={styles.gapHeight}></View>
                        <View style={styles.buttonContainer}>
                            <Button title='Next' onPress={onNext} />
                        </View>
                    </View>
                </View>
                <Modal visible={isVisible}>
                    <View style={{ backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR, }}>
                        {/* <View style={{ marginTop: '10%', paddingVertical: '3%', padding: 10, justifyContent: "center" }}>
                            <Icon.AntDesign name='arrowleft' onPress={() => this.setState({ isVisible: false })} size={THEME.ICON_SIZE} color={THEME.COLOR_WHITE} style={{ marginHorizontal: 5 }} />
                        </View> */}

                        <View style={styles.modalContainer}>

                            <View style={[styles.inputContainerStyle, isEmployerFocus || employerName != '' ? {
                                borderWidth: 2,
                                borderColor: THEME.PRIMARY_COLOR,
                            } : {}]}>
                                <FloatingInput
                                    val={employerName}
                                    onActive={() => this.setState({ isEmployerFocus: true })}
                                    onInActive={() => this.setState({ isEmployerFocus: false })}
                                    label='Employer Name' updateText={(employerName) => this.setState({ employerName })} />
                            </View>
                            <View style={[styles.inputContainerStyle, isStartDate || startDate != '' ? {
                                borderWidth: 2,
                                borderColor: THEME.PRIMARY_COLOR,
                            } : {}]}>
                                <FloatingInput
                                    val={startDate}
                                    onActive={() => this.setState({ isStartDate: true, showDatePicker: true })}
                                    onInActive={() => this.setState({ isStartDate: false })}
                                    label='Start Date' />
                                <View>
                                    {showDatePicker ?
                                        <DateTimePicker
                                            value={dateValue}
                                            mode={'date'}
                                            is24Hour={true}
                                            display="spinner"
                                            onChange={this.onChangeStartDate}
                                        />
                                        : null}
                                </View>
                            </View>
                            <View style={[styles.inputContainerStyle, isEndDate || endDate != '' ? {
                                borderWidth: 2,
                                borderColor: THEME.PRIMARY_COLOR,
                            } : {}]}>
                                <FloatingInput
                                    val={endDate}
                                    onActive={() => this.setState({ isEndDate: true, showEndDatePicker: true })}
                                    onInActive={() => this.setState({ isEndDate: false })}
                                    label='End Date' updateText={(endDate) => this.setState({ endDate })} />
                                <View>
                                    {showEndDatePicker ?
                                        <DateTimePicker
                                            value={dateValue}
                                            mode={'date'}
                                            is24Hour={true}
                                            display="spinner"
                                            onChange={this.onChangeEndDate}
                                        />
                                        : null}
                                </View>
                            </View>
                            <View style={styles.addButtonContainer}>
                                <TouchableOpacity style={styles.addDetailContainer} onPress={this.addDetails}>
                                    <Text style={styles.labelTextStyle}>Add Details</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cancelButtonContainer}>
                                <TouchableOpacity style={styles.cancelContainer} onPress={() => this.setState({ isVisible: false })}>
                                    <Text style={styles.labelTextStyle}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Modal>
            </>
        );
    }
}