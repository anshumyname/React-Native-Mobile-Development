import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button , Alert, PanResponder} from 'react-native';
import { Card, Rating, Input} from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseURL } from '../shared/baseURL';
import { postFavorite, postmyComment } from '../redux/ActionCreators';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites,
    }
}

const mapDispatchtoProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postmyComment: (dishId, rating, author, comment) => dispatch(postmyComment(dishId, rating, author, comment)),
})

function RenderDish(props) {
    const dish = props.dish;

    handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({ moveX, moveY , dx, dy}) => {
        if(dx < -200 ) 
            return true;
        else 
            return false
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e , gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'))
        } 
        ,
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add to favorites',
                    'Are you sure you wish to add to add ' + dish.name + 'to your favorites',
                    [
                        { text: 'cancel' , onPress : () => console.log('Cancel pressed'), style:"cancel"},
                        { text: 'OK', onPress: () => props.favorite ? console.log('Already favorite') : props.onPress()}
                    ],
                    {canelabel: false}
                )

            return true;
        }
    })

    if (dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                    ref = {this.handleViewRef} 
                    {... panResponder.panHandlers}>
                <Card featuredTitle={dish.name} image={{ uri: baseURL + dish.image }} >
                    <Text stype={{ margin: 10 }}>
                        {dish.description}
                    </Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Icon
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type="font-awesome"
                            color="#f50"
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                        <Icon
                            raised
                            reverse
                            name="pencil"
                            type="font-awesome"
                            color="#512DA8"
                            onPress={() => props.toggleModal()}
                        />
                    </View>
                </Card>
            </Animatable.View>

        )
    }
    else {
        return (<View></View>)
    }
}

function RenderComments(props) {

    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {

        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Rating count={5} startingValue={parseInt(item.rating)} readonly={true} imageSize={20} style={{ flex: 1, flexDirection: 'row' }} />
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000} >
            <Card title='Comments' >
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}



class DishDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: '',
            comment: '',
            rating: 3,
            showModal: false
        }
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    handleSubmit = () => {
        console.log(this.state);
        const { dishId } = this.props.route.params;
        this.props.postmyComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.toggleModal();
        console.log(this.props.comments)
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    }

    render() {
        const { dishId } = this.props.route.params;
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} favorite={this.props.favorites.some(el => el === dishId)} onPress={() => this.markFavorite(dishId)} toggleModal={() => this.toggleModal()} />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType={"slide"} transparent={false} visible={this.state.showModal} onDismiss={() => { this.toggleModal(); }} onRequestClose={() => this.toggleModal} >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            onFinishRating={(rating) => this.setState({ rating: rating })}
                            style={{ paddingVertical: 10 }}
                        />
                        <Input
                            placeholder=' Author'
                            onChangeText={(text) => this.setState({ author: text })}
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            style={styles.formItem}
                        />
                        <Input
                            placeholder=' Comment'
                            onChangeText={(text) => this.setState({ comment: text })}
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            style={styles.formItem}
                        />
                        <View style={styles.space}></View>
                        <Button title="Submit" color="#512DA8" onPress={() => this.handleSubmit()}
                        />
                        <View style={styles.space}></View>
                        <Button title="Cancel" color="grey" style={styles.formItem} onPress={() => this.toggleModal()}
                        />
                    </View>
                </Modal>
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
    space: {
        height: 20,
        paddingTop: 10,
        paddingVertical: 10,
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
        padding: 10,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }


})

export default connect(mapStateToProps, mapDispatchtoProps)(DishDetail);