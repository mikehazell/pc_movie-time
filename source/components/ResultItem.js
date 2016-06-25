import React, { PropTypes } from 'react';
import {
    FILTER_GENRE,
    FILTER_LANG,
    FILTER_RATED,
} from '../constants';

import styles from './ResultItem.css';
import Filterable from './Filterable';

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
                        <h2 className={styles.item__title}>
                            {title}
                            <a
                                href={`https://www.rottentomatoes.com/search/?search=${encodeURIComponent(title)}`}
                                target="_blank"
                            >
                                <span className={styles.tomato} />
                            </a>
                            <a
                                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`}
                                target="_blank"
                            >
                                <span className={styles.youtube} />
                            </a>
                        </h2>
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
