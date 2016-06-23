import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    FILTER_RATED,
} from '../constants';

import ResultItem from './ResultItem';

function applyFilters(filters, list) {
    const filterTypes = Object.keys(filters);
    return list.filter((item) => {
        return filterTypes.reduce((keep, filterType) => {
            switch (filterType) {
            case FILTER_RATED:
                return keep && item[filterType] === filters[filterType];
            default:
                return keep && item[filterType].includes(filters[filterType]);
            }
        }, true);
    });
}

function mapStateToProps(state) {
    const { filters, list } = state.movies;
    const results = applyFilters(filters, list);

    return {
        results,
        filters,
    };
}

@connect(mapStateToProps)
class ResultList extends React.Component {
    static propTypes = {
        results: PropTypes.array,
        filters: PropTypes.object,
    }

    render() {
        const { results, filters } = this.props;
        return (
            <div>
                {results.map((item, index) =>
                    <ResultItem
                        key={index}
                        data={item}
                        filters={filters}
                    />
                )}
            </div>
        );
    }
}

export default ResultList;
