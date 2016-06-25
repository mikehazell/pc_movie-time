import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    FILTER_GENRE,
    FILTER_LANG,
    FILTER_RATED,
} from '../constants';

import styles from './ResultItem.css';
import { setFilter } from '../store/movies';

function mapDispatchToProps(dispatch, { item, filterType }) {
    return {
        onClick: () => dispatch(setFilter(filterType, item)),
    };
}

const Filterable = connect(null, mapDispatchToProps)(({ item, filter, onClick }) => (
    <button
        onClick={onClick}
        className={styles.filterable}
        style={{
            background: (filter === item) ? '#000' : '#EEE',
            color: (filter === item) ? '#FFF' : '#000',
        }}
    >
        {item}
    </button>
));

Filterable.propTypes = {
    item: PropTypes.string,
    filter: PropTypes.string,
    filterType: PropTypes.string,
};


class ResultItem extends React.Component {

    static propTypes = {
        data: PropTypes.shape({
            title: PropTypes.string,
            genres: PropTypes.arrayOf(PropTypes.string),
            language: PropTypes.arrayOf(PropTypes.string),
            rating: PropTypes.number,
        }),
        filters: PropTypes.object,
    }

    render() {
        const {
            filters,
            data: { title, genres, language, rated, rating },
        } = this.props;

        return (
            <div className={styles.item}>
                <div className="row">
                    <div className="col span_4">
                        <h2 className={styles.item__title}>{title}</h2>
                    </div>
                    <div className="col span_4">
                        <div className={styles.item__genres}>
                            {genres.map((genre, index) =>
                                <Filterable
                                    key={index}
                                    item={genre}
                                    filter={filters[FILTER_GENRE]}
                                    filterType={FILTER_GENRE}
                                />
                            )}
                        </div>
                    </div>
                    <div className="col span_2">
                        <div className={styles.item__languages}>
                            {language.map((lang, index) =>
                                <Filterable
                                    key={index}
                                    item={lang}
                                    filter={filters[FILTER_LANG]}
                                    filterType={FILTER_LANG}
                                />
                            )}
                        </div>
                    </div>
                    <div className="col span_1">
                        <div className={styles.item__rated}>
                            {rated ?
                                <Filterable
                                    item={rated}
                                    filter={filters[FILTER_RATED]}
                                    filterType={FILTER_RATED}
                                />
                            : <span>&nbsp;</span>
                            }
                        </div>
                    </div>
                    <div className="col span_1">
                        <div className={styles.item__rating}>{rating}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResultItem;
