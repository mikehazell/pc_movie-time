import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { movies } from './movies';

export function initializeStore(initialState) {
    const store = createStore(movies, initialState, compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    return store;
}
