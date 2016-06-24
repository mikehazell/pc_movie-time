/* eslint-env node, mocha */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import SelectFilter from '../source/components/SelectFilter';

const basicProps = {
    label: 'Testing',
    items: ['one', 'two', 'three'],
    filterType: 'test',
    onChange: f => f,
};

describe('SelectFilter', () => {
    it('renders items as option', () => {
        const wrapper = mount(<SelectFilter {...basicProps} />);
        expect(wrapper.find('option').length).to.equal(basicProps.items.length + 1);
    });
});
