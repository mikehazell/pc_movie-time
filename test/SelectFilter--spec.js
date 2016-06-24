/* eslint-env node, mocha */
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import SelectFilter from '../source/components/SelectFilter';

const TEST_TYPE = 'test-type';
const basicProps = {
    label: 'Testing',
    items: ['one', 'two', 'three'],
    filterType: TEST_TYPE,
    onChange: f => f,
};

describe('SelectFilter', () => {
    it('renders items as option', () => {
        const wrapper = shallow(<SelectFilter {...basicProps} />);
        expect(wrapper.find('option').length).to.equal(basicProps.items.length + 1);
    });
    it('should call onChange', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(
            <SelectFilter
                {...basicProps}
                onChange={onChange}
            />
        );
        wrapper.find('select').simulate('change', { target: { value: 'test-value' } });
        expect(onChange.calledOnce).to.equal(true);
        expect(onChange.calledWith(TEST_TYPE, 'test-value')).to.equal(true);
    });
});
