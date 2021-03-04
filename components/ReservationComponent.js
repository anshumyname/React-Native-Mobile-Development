import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Modal , Alert} from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-datepicker'

class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            showDatePicker: false,
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reeserve Table'
    }



    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal: false
        });
    }

    handleReservation() {
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guest : ' + this.state.guests + '\n' + 'Smoking? : ' + this.state.smoking + '\n' + 'Date : ' + this.state.date,
            [
                {
                    text: 'Cancel',
                    onPress: () => this.resetForm(),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => this.resetForm(),
                }
            ],
            {cancelable: false}
        )
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel} >Number of Guests </Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}>
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel} >Smoking/Non-Smoking?</Text>
                        <Switch style={styles.formItem} value={this.state.smoking} onTintColor="#512DA8" onValueChange={(value) => this.setState({ smoking: value })}>
                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel} >Date and Time</Text>
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button title="Reserve" color="#512DA8" onPress={() => this.handleReservation()}
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </Animatable.View>
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
        flexDirection: 'row',
        margin: 20,

    },
    formLabel: {
        fontSize: 15,
        flex: 2,
    },

    formItem: {
        flex: 1
    },


})


export default Reservation;
