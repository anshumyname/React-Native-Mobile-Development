import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const Stack2 = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyNavigator() {
  return (
    <Stack.Navigator initialRouteName="Menu" headerMode="screen" screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#512DA8' , color:'#fff'},
    }} >
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="DishDetail" component={DishDetail} />
    </Stack.Navigator>
  )
}

function HomeNavigator (){
  return (
    <Stack2.Navigator>
      <Stack2.Screen name="Home" component={Home} />
    </Stack2.Navigator>
  )
}

function DrawerNavigator(){
  return(
    <Drawer.Navigator initialRouteName="Home" drawerStyle={{ backgroundColor: '#D1C4E9'}} screenOptions={{headerStyle: {backgroundColor: '#512DAB'}}}>
      <Drawer.Screen name="Home" component={HomeNavigator} />
      <Drawer.Screen name="Menu" component={MyNavigator} />
    </Drawer.Navigator>
  )
}


class Main extends Component {

  render() {

    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </View>
    );
  }
}

export default Main;