import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFilter, clearFilters } from '../store/movies';
import {
    FILTER_LANG,
    FILTER_GENRE,
    FILTER_RATED,
    FILTER_TITLE,
} from '../constants';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setFilter,
        clearFilters,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        genres: state.movies.genres,
        languages: state.movies.languages,
        rated: state.movies.rated,
        filters: state.movies.filters,
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class Filter extends React.Component {
    static propTypes = {
        genres: PropTypes.array,
        languages: PropTypes.array,
        rated: PropTypes.array,
        filters: PropTypes.object,
        setFilter: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleRatedChange = this.handleRatedChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleLanguageChange() {
        const newValue = this.refs.language.value;
        this.props.setFilter(FILTER_LANG, newValue);
    }

    handleGenreChange() {
        const newValue = this.refs.genre.value;
        this.props.setFilter(FILTER_GENRE, newValue);
    }

    handleRatedChange() {
        const newValue = this.refs.rating.value;
        this.props.setFilter(FILTER_RATED, newValue);
    }

    handleSearchChange() {
        const newValue = this.refs.search.value;
        this.props.setFilter(FILTER_TITLE, newValue);
    }

    render() {
        const {
            genres,
            languages,
            rated,
            filters,
        } = this.props;
        return (
            <div>
                <input
                    type="search"
                    onChange={this.handleSearchChange}
                    ref="search"
                    value={filters[FILTER_TITLE] || ''}
                />
                <select
                    onChange={this.handleGenreChange}
                    ref="genre"
                    value={filters[FILTER_GENRE]}
                >
                    <option value="">Genre</option>
                    {genres.map((item, index) =>
                        <option key={index}>{item}</option>
                    )}
                </select>
                <select
                    onChange={this.handleLanguageChange}
                    ref="language"
                    value={filters[FILTER_LANG]}
                >
                    <option value="">Language</option>
                    {languages.map((item, index) =>
                        <option key={index}>{item}</option>
                    )}
                </select>
                <select
                    onChange={this.handleRatedChange}
                    ref="rating"
                    value={filters[FILTER_RATED]}
                >
                    <option value="">Rated</option>
                    {rated.map((item, index) =>
                        <option key={index}>{item}</option>
                    )}
                </select>
                <button
                    onClick={this.props.clearFilters}
                >
                    Clear filters
                </button>
            </div>
        );
    }
}

export default Filter;
