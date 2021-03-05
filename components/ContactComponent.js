import React, { Component } from 'react';
import { Card, Text, ListItem, Button, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component  {
    constructor(props){
        super(props);

    }

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern'
        })
    }
    render() {
        return (
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000} useNativeDriver={true}>
                    <Card title="Contact Information">
                        <Text>121, Clear Water Bay Road</Text>
                        <Text>Clear Water Bay, Kowloon</Text>
                        <Text>HONG KONG</Text>
                        <Text>Tel: +852 1234 5678</Text>
                        <Text>Fax: +852 8765 4321</Text>
                        <Text>Email:confusion@food.net</Text>
                        <Button title=" Send Email" 
                                buttonStyle={{backgroundColor:'#512DA8', margin:10 }}  
                                icon={<Icon name="envelope-o" type="font-awesome" color="white"></Icon>} 
                                onPress={this.sendMail}
                        />
    
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
    }
}

export default Contact;