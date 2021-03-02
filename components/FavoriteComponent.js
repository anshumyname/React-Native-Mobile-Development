import React, { Component } from 'react';
import { View, FlatList,Text } from 'react-native';
import { ListItem } from "react-native-elements";
import { connect} from 'react-redux';
import { baseURL } from '../shared/baseURL';
import { Loading } from './LoadingComponent';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
}


const mapDispatchtoProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorite extends Component {
    
    static navigationOptions = {
        title : 'My favorites'
    }

    render() {
        const { navigate } = this.props.navigation;

        
        const renderMenuItem = ({item, index}) => {
            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => this.props.deleteFavorite(item.id)
                }
            ]

            return(
                <Swipeout right={rightButton} autoClose={true}>
                <ListItem
                    key ={index}
                    title={item.name}
                    subtitle= {item.description}
                    hideChevron = {true}
                    onPress= {() => navigate('DishDetail', { dishId: item.id })}
                    leftAvatar= {{ source: { uri: baseURL+item.image}}}
                />
                </Swipeout>
            )
        }

        if(this.props.dishes.isLoading) {
            return(
                <Loading />
            )
        }
        else if(this.props.dishes.errMess){
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            )

        }
        else {
            return(
                <>
                   <FlatList data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                          renderItem= {renderMenuItem}
                              keyExtractor={ item => item.id.toString()}>
                       
                    </FlatList>        
                </>
            )
        }
    }


}

export default connect(mapStateToProps, mapDispatchtoProps)(Favorite);