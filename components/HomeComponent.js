import React, { Component } from 'react';
import { View, Platform, Text, Animation, Easing, Animated } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseURL } from '../shared/baseURL';
import { Loading } from './LoadingComponent';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    }
}


function RenderItem(props) {
    const item = props.item;

    if (props.isLoading) {
        return (
            <Loading />
        )
    }
    else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    }

    else {
        return (
            <Card featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={{ uri: baseURL + item.image }}
            >
                <Text stype={{ margin: 10 }}>{item.description}</Text>
            </Card>
        );
    }
}


class Home extends Component {

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 8,
                duration: 8000,
                easing: Easing.linear
            }
        ).start(() => this.animate())
    }


    static options = {
        title: 'Homed'
    }
    render() {
        const xpos1 = this.animatedValue.interpolate({
            inputRange: [0, 1, 3, 5, 8],
            outputRange: [800, 400, 0, -400, -800]
        })

        const xpos2 = this.animatedValue.interpolate({
            inputRange: [0, 2, 4, 6, 8],
            outputRange: [800, 400, 0, -400, -800]
        })

        const xpos3 = this.animatedValue.interpolate({
            inputRange: [0, 3, 5, 7, 8],
            outputRange: [800, 400, 0, -400, -800]
        })

        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                <Animated.View style={{ width: '100%', transform: [{ translateX: xpos1 }] }} useNativeDriver={true} >
                    <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} isLoading={this.props.dishes.isLoading} errMess={this.props.dishes.errMess} />
                </Animated.View>
                <Animated.View style={{ width: '100%', transform: [{ translateX: xpos2 }] }} useNativeDriver={true}>
                    <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]} isLoading={this.props.promotions.isLoading} errMess={this.props.promotions.errMess} />
                </Animated.View>
                <Animated.View style={{ width: '100%', transform: [{ translateX: xpos3 }] }} useNativeDriver={true}>
                    <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} isLoading={this.props.leaders.isLoading} errMess={this.props.leaders.errMess} />
                </Animated.View>

            </View>
        )
    }
}

export default connect(mapStateToProps)(Home);