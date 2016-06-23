import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { movies } from './movies';

const compsedStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);


export function initializeStore(initialState = {}) {
    return compsedStore(
        combineReducers({
            movies,
        },
        initialState,
    ));
}
