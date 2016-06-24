const LOAD = 'LOAD';
const SET_FILTER = 'SET_FILTER';
const CLEAR_FILTERS = 'CLEAR_FILTERS';

export function getGenres(data) {
    return data.reduce((memo, item) => {
        if (!item.genres) return memo;
        item.genres.forEach((genre) => {
            if (!memo.includes(genre)) {
                memo.push(genre);
            }
        });
        return memo;
    }, []);
}

export function getLanguages(data) {
    return data.reduce((memo, item) => {
        item.language.forEach((lang) => {
            if (!memo.includes(lang)) {
                memo.push(lang);
            }
        });
        return memo;
    }, []);
}

export function getRated(data) {
    return data.reduce((memo, item) => {
        if (item.rated && !memo.includes(item.rated)) {
            memo.push(item.rated);
        }
        return memo;
    }, []);
}

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

function updateFilters(state, { filterType, filter }) {
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
