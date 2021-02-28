import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import { View, Platform, Image, StyleSheet, ScrollView, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-navigation';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Icon } from 'react-native-elements';
import { baseURL } from '../shared/baseURL';
import { connect} from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../redux/ActionCreators';
import  Reservation  from './ReservationComponent';

const mapStateToProps = state => {
  return {
      dishes: state.dishes,
      promotions : state.promotions,
      leaders: state.leaders
  }
}


const mapDispatchtoProps = dipatch => ({
   fetchDishes: () => dipatch(fetchDishes()),
   fetchComments: () => dipatch(fetchComments()),
   fetchPromos: () => dipatch(fetchPromos()),
   fetchLeaders: () => dipatch(fetchLeaders()),

});

const Stack = createStackNavigator();
const Stack2 = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyNavigator() {
  return (
    <Stack.Navigator initialRouteName="Menu" headerMode="screen" screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#512DA8' },
    }}
    >
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="DishDetail" component={DishDetail} />

    </Stack.Navigator>
  )
}

function HomeNavigator() {
  return (
    <Stack2.Navigator>
      <Stack2.Screen name="Home" component={Home} />
    </Stack2.Navigator>
  )
}

function DrawerNavigator( {navigation}) {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerStyle={{ backgroundColor: '#D1C4E9' }} screenOptions={{ headerStyle: { backgroundColor: '#512DAB' } }} drawerContent={(props) => <CustomDrawerContentComponent {...props} />}>
      <Drawer.Screen name="Home" component={HomeNavigator} options={{ drawerIcon: (_, color) => <Icon name='home' type="font-awesome" size={24} color={color} onPress={() => navigation.toggleDrawer()} /> }} />
      <Drawer.Screen name="Menu" component={MyNavigator} options={{ drawerIcon: (_, color) => <Icon name='list' type="font-awesome" size={24} color={color} onPress={() => navigation.toggleDrawer()} /> }} />
      <Drawer.Screen name="About Us" component={About} options={{ drawerIcon: (_, color) => <Icon name='info-circle' type="font-awesome" size={24} color={color} onPress={() => navigation.toggleDrawer()} /> }} />
      <Drawer.Screen name="Contact Us" component={Contact} options={{ drawerIcon: (_, color) => <Icon name='address-card' type="font-awesome" size={24} color={color} onPress={() => navigation.toggleDrawer()} /> }} />
      <Drawer.Screen name="Reserve Table" component={Reservation} options={{ drawerIcon: (_, color) => <Icon name='cutlery' type="font-awesome" size={24} color={color} onPress={() => navigation.toggleDrawer()} /> }} />

    </Drawer.Navigator>
  )
}




const CustomDrawerContentComponent = (props) => {
  return (
    <DrawerContentScrollView>
      <SafeAreaView style={styles.container} forceInset={top = 'always', horizontal = 'never'}>
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }} >
            <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{ flex: 2 }} >
            <Text style={styles.drawerHeaderText}>Ristorante Con fusion</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  )
}

class Main extends Component {


  componentDidMount() {
     this.props.fetchComments();
     this.props.fetchDishes();
     this.props.fetchLeaders();
     this.props.fetchPromos();
  }

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

const styles = StyleSheet.create({
  container: { flex: 1 },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerImage: {
    margin: 10,
    height: 40,
    width: 50,

  }

})

export default connect(mapStateToProps,mapDispatchtoProps)(Main);

