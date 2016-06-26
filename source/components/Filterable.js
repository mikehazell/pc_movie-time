import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { setFilter } from '../store/movies';
import styles from './Filterable.css';

function mapDispatchToProps(dispatch, { item, filter, filterType }) {
    // If this item is already selected,
    // clicking will clear the filter.
    const valueOrEmpty = filter === item ? '' : item;
    return {
        onClick: () => dispatch(setFilter(filterType, valueOrEmpty)),
    };
}

const Filterable = ({ item, filter, onClick }) => (
    <button
        onClick={onClick}
        className={classNames(styles.filterable, {
            [styles['filterable--selected']]: (filter === item),
        })}
    >
        {item}
    </button>
);

Filterable.propTypes = {
    item: PropTypes.string,
    filter: PropTypes.string,
    filterType: PropTypes.string,
    onClick: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Filterable);
