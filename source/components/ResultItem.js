import React, { PropTypes } from 'react';
import {
    FILTER_GENRE,
    FILTER_LANG,
    FILTER_RATED,
} from '../constants';

const Filterable = ({ item, filter }) => (
    <span
        style={{
            padding: 4,
            margin: 2,
            fontSize: 12,
            background: (filter === item) ? '#000' : '#EEE',
            color: (filter === item) ? '#FFF' : '#000',
        }}
    >
        {item}
    </span>
);

Filterable.propTypes = {
    item: PropTypes.string,
    filter: PropTypes.string,
};


class ResultItem extends React.Component {

    static propTypes = {
        data: PropTypes.shape({
            title: PropTypes.string,
            genres: PropTypes.arrayOf(PropTypes.string),
        }),
        filters: PropTypes.object,
    }

    render() {
        const {
            filters,
            data: { title, genres, language, rated },
        } = this.props;

        return (
            <div>
                <h2>{title}</h2>
                <p>
                    {genres.map((genre, index) =>
                        <Filterable
                            key={index}
                            item={genre}
                            filter={filters[FILTER_GENRE]}
                        />
                    )}
                </p>
                <p>
                    {language.map((lang, index) =>
                        <Filterable
                            key={index}
                            item={lang}
                            filter={filters[FILTER_LANG]}
                        />
                    )}
                </p>
                <p>
                    {rated ?
                        <Filterable
                            item={rated}
                            filter={filters[FILTER_RATED]}
                        />
                        : null
                    }
                </p>
            </div>
        );
    }
}

export default ResultItem;
