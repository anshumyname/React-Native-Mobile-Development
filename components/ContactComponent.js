import React, { Component } from 'react';
import { Card, Text, ListItem } from 'react-native-elements';
import { View } from 'react-native';


function Contact(props) {
    return (
        <Card title="Contact Information">
            <Text>121, Clear Water Bay Road</Text>
            <Text>Clear Water Bay, Kowloon</Text>
            <Text>HONG KONG</Text>
            <Text>Tel: +852 1234 5678</Text>
            <Text>Fax: +852 8765 4321</Text>    
            <Text>Email:confusion@food.net</Text>
        </Card>
    )
}

export default Contact;