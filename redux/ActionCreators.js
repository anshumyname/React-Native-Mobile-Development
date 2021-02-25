import * as ActionTypes from './ActionTypes';
import { baseUrl} from '../shared/baseURL';
import { comments } from './comments';

export const fetchComments =  () => (dispatch) => {
    return fetch(baseUrl+'comments')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var err = new Error('Error' + response.status + ':' + response.text);
                error.response = err;
                throw error;
            }
        },
        error => {
            var errMess =new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed =  (errMess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess,
})

export const addComments = (comments) => {
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
}

export const fetchDishes =  () => (dispatch) => {
    dispatch(dishesLoading());
    return fetch(baseUrl+'dishes')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var err = new Error('Error' + response.status + ':' + response.text);
                error.response = err;
                throw error;
            }
        },
        error => {
            var errMess =new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(dihes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(DishesFailed(error.message)));
}

export const dishesLoading() => ({
     type: ActionTypes.DISHES_LOADING
})

export const addDishes =(dishes)=> ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes,
})

export const DishesFailed = (errMess) =>{
    type: ActionTypes.DISHES_FAILED,
    payload: errMess
}



export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});