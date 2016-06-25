import React, { PropTypes } from 'react';
import styles from './TextFilter.css';

class TextFilter extends React.Component {

    static propTypes = {
        filterType: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string,
        label: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        this.props.onChange(this.props.filterType, value);
    }

    render() {
        const { value, label } = this.props;
        return (
            <input
                type="search"
                onChange={this.handleChange}
                value={value || ''}
                className={styles['input-ui']}
                placeholder={label}
            />
        );
    }
}

export default TextFilter;
