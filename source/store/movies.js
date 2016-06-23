const LOAD = 'LOAD';
const SET_FILTER = 'SET_FILTER';

function getGenres(data) {
    return data.reduce((memo, item) => {
        item.genres.forEach((genre) => {
            if (!memo.includes(genre)) {
                memo.push(genre);
            }
        });
        return memo;
    }, []);
}

function getLanguages(data) {
    return data.reduce((memo, item) => {
        item.language.forEach((lang) => {
            if (!memo.includes(lang)) {
                memo.push(lang);
            }
        });
        return memo;
    }, []);
}

function getRatings(data) {
    return data.reduce((memo, item) => {
        if (!memo.includes(item.rated)) {
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

const defaultState = {
    list: [],
    genres: [],
    languages: [],
    ratings: [],
    filterBy: null,
    filter: null,
    pending: true,
};

export function movies(state = defaultState, action) {
    switch (action.type) {
    case LOAD:
        return Object.assign({}, state, {
            list: action.payload,
            genres: getGenres(action.payload),
            languages: getLanguages(action.payload),
            ratings: getRatings(action.payload),
        });
    case SET_FILTER:
        return Object.assign({}, state, {
            filterType: action.payload.filterType,
            filter: action.payload.filter,
        });
    default:
        return state;
    }
}
