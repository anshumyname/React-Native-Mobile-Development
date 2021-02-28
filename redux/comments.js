import * as ActionTypes from './ActionTypes';

export const comments = (state = {
    errMess : null,
    comments: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_COMMENTS:
            return {... state, errMess: null, comments: action.payload};
        case ActionTypes.COMMENTS_FAILED:
            return { ... state, errMess: action.payload, comments: []};
        case ActionTypes.ADD_COMMENT:
            var item = action.payload;
            item.id = (state.comments.length);
            console.log(item);
            const newcomments = state.comments.concat(item);
            return { ... state, errMess: null, comments: newcomments}
        default:
            return state;
    }
}

