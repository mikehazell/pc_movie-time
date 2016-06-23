import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        results: state.movies.list,
    };
}

@connect(mapStateToProps)
class ResultList extends React.Component {
    static propTypes = {
        results: PropTypes.array,
    }

    render() {
        const { results } = this.props;
        return (
            <div>
                {results.map((item, index) =>
                    <div key={index}>{item.title}</div>
                )}
            </div>
        );
    }
}

export default ResultList;
