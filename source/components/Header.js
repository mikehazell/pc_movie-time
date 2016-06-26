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

import TextFilter from './TextFilter';
import SelectFilter from './SelectFilter';
import styles from './Header.css';

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

    render() {
        const {
            genres,
            languages,
            rated,
            filters,
        } = this.props;

        return (
            <div className={styles.header}>
                <div className="row">
                    <div className="col span_4">
                        <TextFilter
                            onChange={this.props.setFilter}
                            value={filters[FILTER_TITLE]}
                            filterType={FILTER_TITLE}
                            label="Search by title"
                        />
                    </div>
                    <div className="col span_4">
                        <SelectFilter
                            onChange={this.props.setFilter}
                            value={filters[FILTER_GENRE]}
                            label="Genre"
                            filterType={FILTER_GENRE}
                            items={genres}
                        />
                    </div>
                    <div className="col span_2">
                        <SelectFilter
                            onChange={this.props.setFilter}
                            value={filters[FILTER_LANG]}
                            label="Language"
                            filterType={FILTER_LANG}
                            items={languages}
                        />
                    </div>
                    <div className="col span_1">
                        <SelectFilter
                            onChange={this.props.setFilter}
                            value={filters[FILTER_RATED]}
                            label="Rated"
                            filterType={FILTER_RATED}
                            items={rated}
                        />
                    </div>
                    <div className="col span_1">
                        <button
                            className={styles.btn}
                            onClick={this.props.clearFilters}
                        >
                            Clear filters
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
