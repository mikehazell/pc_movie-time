export const LOAD = 'LOAD';
export const SET_FILTER = 'SET_FILTER';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';

import {
    getRated,
    getLanguages,
    getGenres,
} from './helpers';

export function loadMovieData() {
    return (dispatch) => {
        fetch('/data/movies.json')
        .then((res) => res.json())
        .then((data) => {
            dispatch({
                type: LOAD,
                payload: data,
            });
        });
    };
}

export function setFilter(filterType, filter) {
    return {
        type: SET_FILTER,
        payload: {
            filterType,
            filter,
        },
    };
}

export function clearFilters() {
    return {
        type: CLEAR_FILTERS,
    };
}

const defaultState = {
    list: [],
    genres: [],
    languages: [],
    rated: [],
    filters: {},
};

export function updateFilters(state, { filterType, filter }) {
    const newState = Object.assign({}, state);
    if (filter) {
        newState[filterType] = filter;
    } else {
        delete newState[filterType];
    }
    return newState;
}

export function movies(state = defaultState, action) {
    switch (action.type) {
    case LOAD:
        return Object.assign({}, state, {
            list: action.payload,
            genres: getGenres(action.payload),
            languages: getLanguages(action.payload),
            rated: getRated(action.payload),
        });
    case SET_FILTER:
        return Object.assign({}, state, {
            filters: updateFilters(state.filters, action.payload),
        });
    case CLEAR_FILTERS:
        return Object.assign({}, state, {
            filters: {},
        });
    default:
        return state;
    }
}
