import { createStore, combineReducers, applyMiddleware}  from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { favorites } from './favorites';
import {dishes} from './dishes';
import {comments} from  './comments';
import {promotions} from './promotions.js';
import {leaders} from './leaders';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const ConfigureStore = () => {

    const config ={
        key: 'root',
        storage: AsyncStorage,
        debug: true
    };

    const store = createStore(
        persistCombineReducers(config, {
            dishes,
            comments,
            promotions,
            leaders,
            favorites
        }),

        applyMiddleware(thunk, logger)
        
    )

    const persistor = persistStore(store);
    return {persistor , store };
}
