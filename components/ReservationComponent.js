import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-datepicker';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import * as Calendar from 'expo-calendar';
import { CALENDAR } from 'expo-permissions';

class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            showDatePicker: false,
            showModal: false,
            calendarId: 'null'
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

    async getcalenderid() {

        if(this.state.calendarId !== 'null'){
            return this.state.id;
        }

        const defaultCalendarSource =

            Platform.OS === 'ios'

                ? await getDefaultCalendarSource()

                : { isLocalAccount: true, name: 'Expo Calendar' };

        let details = {

            title: 'Con Fusion Table Reservation',

            source: defaultCalendarSource,

            name: 'internalCalendarName',

            color: 'blue',

            entityType: Calendar.EntityTypes.EVENT,

            sourceId: defaultCalendarSource.id,

            ownerAccount: 'personal',

            accessLevel: Calendar.CalendarAccessLevel.OWNER,

        }
        
        const id =  await Calendar.createCalendarAsync(details);
        this.setState({calendarId: id});
        return id;
        
    }

    async setCalender(date) {
        await this.obtainCalenderPermission();
        
        const calendarId = await this.getcalenderid()
        console.log("calednar created calendar id " , calendarId);
        console.log(date);
        console.log(Date.parse(date,"DD-MM-YYYY"));
        const newevent = await Calendar.createEventAsync(calendarId, {
            title: 'Con Fusion Table Reservation',
  
            startDate: new Date(Date.parse(date)),
            
            endDate: new Date(Date.parse(date) + 2*60*60*1000),
            
            timeZone: 'Asia/Hong_Kong',
            
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        });
        console.log('event created with id' , newevent);

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
                    onPress: () => {
                        this.presentLocalNotification(this.state.date);
                        this.setCalender(this.state.date);
                        this.resetForm()
                    },
                }
            ],
            { cancelable: false }
        )
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notification');
            }
        }
        return permission;
    }

    async obtainCalenderPermission() {
        let permission = await Calendar.requestCalendarPermissionsAsync()
        if (permission.status !== 'granted') {
            permission = await Calendar.requestCalendarPermissionsAsync();
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to set calender');
            }
        }
        return permission;
    }
    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        })
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000} delay={1000} useNativeDriver={true}>
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
                            format="YYYY-MM-DD"
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
