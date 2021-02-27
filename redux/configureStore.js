import { createStore, combineReducers, applyMiddleware}  from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { favorites } from './favorites';
import {dishes} from './dishes';
import {comments} from  './comments';
import {promotions} from './promotions.js';
import {leaders} from './leaders';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes,
            comments,
            promotions,
            leaders,
            favorites
        }),

        applyMiddleware(thunk, logger)
        
    )

    return store;
}
