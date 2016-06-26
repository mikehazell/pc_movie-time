/* eslint-env node, mocha */
import { expect } from 'chai';
import {
    updateFilters,
    movies,
    LOAD,
    setFilter,
    clearFilters,
} from '../source/store/movies';

const dummyData = [
/* eslint-disable */
    {"rating": 8.8, "genres": ["Action", "Adventure", "Fantasy", "Sci-Fi"], "rated": "PG", "language": ["English"], "title": "Star Wars"},
    {"rating": 8.1, "genres": ["Animation", "Adventure", "Comedy", "Family"], "rated": "G", "language": ["English"], "title": "Finding Nemo"},
/* eslint-enable */
];

describe('The movie store', () => {
    describe('updateFilters', () => {
        it('should create a new filter', () => {
            const filter = { filterType: 'key', filter: 'value' };
            const filters = updateFilters({}, filter);
            expect(filters).to.have.property('key', 'value');
        });
        it('should override an existing filter', () => {
            const filter = { filterType: 'key', filter: 'value' };
            const filters = updateFilters({ key: 'initial' }, filter);
            expect(filters).to.have.property('key', 'value');
        });
        it('should remove a filter give an empty value', () => {
            const filter = { filterType: 'key', filter: '' };
            const filters = updateFilters({ key: 'initial' }, filter);
            expect(filters).not.to.have.property('key');
        });
    });

    describe('movies', () => {
        it('should load and munge the data', () => {
            const state = movies(null, {
                type: LOAD,
                payload: dummyData.slice(0),
            });

            expect(state).to.have.property('genres').with.length(7);
            expect(state).to.have.property('languages').with.length(1);
            expect(state).to.have.property('rated').with.length(2);
            expect(state).to.have.property('list').with.length(2);
        });

        it('should set a filter', () => {
            const state = movies({ filters: {} }, setFilter('type', 'value'));
            expect(state.filters).to.have.property('type', 'value');
        });

        it('should update a filter', () => {
            const state = movies({ filters: { type: 'cheese' } }, setFilter('type', 'value'));
            expect(state.filters).to.have.property('type', 'value');
        });

        it('should remove a filter', () => {
            const state = movies({ filters: { type: 'cheese' } }, setFilter('type', ''));
            expect(state.filters).not.to.have.property('type');
        });

        it('should remove all filters', () => {
            const state = movies({ filters: { foo: 'bar', cheese: 'burger' } }, clearFilters());
            expect(Object.keys(state.filters)).to.have.length(0);
        });
    });
});
