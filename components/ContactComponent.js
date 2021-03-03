import React, { Component } from 'react';
import { Card, Text, ListItem } from 'react-native-elements';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

function Contact(props) {
    return (
        <ScrollView>
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000} >
                <Card title="Contact Information">
                    <Text>121, Clear Water Bay Road</Text>
                    <Text>Clear Water Bay, Kowloon</Text>
                    <Text>HONG KONG</Text>
                    <Text>Tel: +852 1234 5678</Text>
                    <Text>Fax: +852 8765 4321</Text>
                    <Text>Email:confusion@food.net</Text>
                </Card>
            </Animatable.View>
        </ScrollView>
    )
}

export default Contact;