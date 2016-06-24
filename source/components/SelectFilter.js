import React, { PropTypes } from 'react';

class SelectFilter extends React.Component {

    static propTypes = {
        filterType: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        items: PropTypes.array.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string,
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
        const { value, items, label } = this.props;
        return (
            <select
                onChange={this.handleChange}
                value={value}
            >
                <option value="">{label}</option>
                {items.map((item, index) =>
                    <option key={index}>{item}</option>
                )}
            </select>
        );
    }
}

export default SelectFilter;
