import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFilter } from '../store/movies';
import {
    FILTER_LANG,
    FILTER_GENRE,
    FILTER_RATED,
} from '../constants';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setFilter,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        genres: state.movies.genres,
        languages: state.movies.languages,
        rated: state.movies.rated,
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class Filter extends React.Component {
    static propTypes = {
        genres: PropTypes.array,
        languages: PropTypes.array,
        rated: PropTypes.array,
        setFilter: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleRatedChange = this.handleRatedChange.bind(this);
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

    render() {
        const {
            genres,
            languages,
            rated,
        } = this.props;
        return (
            <div>
                <select onChange={this.handleGenreChange} ref="genre">
                    <option value="">Genre</option>
                    {genres.map((item, index) =>
                        <option key={index}>{item}</option>
                    )}
                </select>
                <select onChange={this.handleLanguageChange} ref="language">
                    <option value="">Language</option>
                    {languages.map((item, index) =>
                        <option key={index}>{item}</option>
                    )}
                </select>
                <select onChange={this.handleRatedChange} ref="rating">
                    <option value="">Rated</option>
                    {rated.map((item, index) =>
                        <option key={index}>{item}</option>
                    )}
                </select>
            </div>
        );
    }
}

export default Filter;
