import React, { PropTypes } from 'react';
import {
    FILTER_GENRE,
    FILTER_LANG,
} from '../constants';

class ResultItem extends React.Component {

    static propTypes = {
        data: PropTypes.shape({
            title: PropTypes.string,
            genres: PropTypes.arrayOf(PropTypes.string),
        }),
        filter: PropTypes.string,
        filterType: PropTypes.oneOf([
            FILTER_GENRE,
            FILTER_LANG,
        ]),
    }

    render() {
        const {
            filter,
            filterType,
            data: { title, genres, language },
        } = this.props;

        return (
            <div>
                <h2>{title}</h2>
                <p>
                    {genres.map((genre, index) =>
                        <span
                            key={index}
                            style={{
                                fontWeight: (filterType === FILTER_GENRE && filter === genre) ?
                                    'bold' : 'normal',
                            }}
                        >
                            {genre}
                        </span>
                    )}
                </p>
                <p>
                    {language.map((lang, index) =>
                        <span
                            key={index}
                            style={{
                                fontWeight: (filterType === FILTER_LANG && filter === lang) ?
                                    'bold' : 'normal',
                            }}
                        >
                            {lang}
                        </span>
                    )}
                </p>
            </div>
        );
    }
}

export default ResultItem;
