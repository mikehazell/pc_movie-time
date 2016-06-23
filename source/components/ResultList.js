import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ResultItem from './ResultItem';

function filterByGenre(filter, list) {
    return list.filter((item) => {
        return item.genres.includes(filter);
    });
}

function filterByLanguage(filter, list) {
    return list.filter((item) => {
        return item.language.includes(filter);
    });
}

function applyFilter(filterType, filter, list) {
    switch (filterType) {
    case 'genre':
        return filterByGenre(filter, list);
    case 'language':
        return filterByLanguage(filter, list);
    default:
        return list;
    }
}

function mapStateToProps(state) {
    const { filter, filterType, list } = state.movies;
    const results = applyFilter(filterType, filter, list);

    return {
        results,
        filterType,
        filter,
    };
}

@connect(mapStateToProps)
class ResultList extends React.Component {
    static propTypes = {
        results: PropTypes.array,
        filterType: PropTypes.string,
        filter: PropTypes.string,
    }

    render() {
        const { results, filterType, filter } = this.props;
        return (
            <div>
                {results.map((item, index) =>
                    <ResultItem
                        key={index}
                        data={item}
                        filterType={filterType}
                        filter={filter}
                    />
                )}
            </div>
        );
    }
}

export default ResultList;
