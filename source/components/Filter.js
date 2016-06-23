import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFilter } from '../store/movies';
import {
    FILTER_LANG,
    FILTER_GENRE,
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
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class Filter extends React.Component {
    static propTypes = {
        genres: PropTypes.array,
        languages: PropTypes.array,
        setFilter: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }

    handleLanguageChange() {
        const newValue = this.refs.language.value;
        this.props.setFilter(FILTER_LANG, newValue);
    }

    handleGenreChange() {
        const newValue = this.refs.genre.value;
        this.props.setFilter(FILTER_GENRE, newValue);
    }

    render() {
        const {
            genres,
            languages,
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
            </div>
        );
    }
}

export default Filter;
