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

import SelectFilter from './SelectFilter';
import style from './Filter.css';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setFilter,
        clearFilters,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        genres: state.genres,
        languages: state.languages,
        rated: state.rated,
        filters: state.filters,
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class Header extends React.Component {
    static propTypes = {
        genres: PropTypes.array,
        languages: PropTypes.array,
        rated: PropTypes.array,
        filters: PropTypes.object,
        setFilter: PropTypes.func,
        clearFilters: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.handleSearchChange = this.handleSearchChange.bind(this);
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
        console.log(typeof this.props.setFilter);
        return (
            <div>
                <input
                    type="search"
                    onChange={this.handleSearchChange}
                    ref="search"
                    value={filters[FILTER_TITLE] || ''}
                />
                <SelectFilter
                    onChange={this.props.setFilter}
                    value={filters[FILTER_GENRE]}
                    label="Genre"
                    filterType={FILTER_GENRE}
                    items={genres}
                />
                <SelectFilter
                    onChange={this.props.setFilter}
                    value={filters[FILTER_LANG]}
                    label="Language"
                    filterType={FILTER_LANG}
                    items={languages}
                />
                <SelectFilter
                    onChange={this.props.setFilter}
                    value={filters[FILTER_RATED]}
                    label="Rated"
                    filterType={FILTER_RATED}
                    items={rated}
                />
                <button
                    className={style.btn}
                    onClick={this.props.clearFilters}
                >
                    Clear filters
                </button>
            </div>
        );
    }
}

export default Header;
