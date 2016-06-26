/* eslint-env node, mocha */
import { expect } from 'chai';
import {
    getGenres,
    getLanguages,
    getRated,
} from '../source/store/helpers';

describe('The movie store helpers', () => {
    describe('getGenres', () => {
        it('should get the genres', () => {
            const data = [
                { genres: ['one', 'two'] },
                { genres: ['three', 'two'] },
            ];
            const genres = getGenres(data);
            expect(genres).to.have.length(3);
        });

        it('should handle missing genres key', () => {
            const data = [
                { genres: ['one', 'two'] },
                { genres: ['three', 'two'] },
                { foo: 'bar' },
            ];
            const genres = getGenres(data);
            expect(genres).to.have.length(3);
        });
    });

    describe('getLanguages', () => {
        it('should get the languages', () => {
            const data = [
                { language: ['English', 'German'] },
                { language: ['French'] },
            ];
            const langs = getLanguages(data);
            expect(langs).to.have.length(3);
        });
        it('should handle missing languages key', () => {
            const data = [
                { language: ['English', 'German'] },
                { language: ['French'] },
                { foo: 'bar' },
            ];
            const langs = getLanguages(data);
            expect(langs).to.have.length(3);
        });
    });

    describe('getRated', () => {
        it('should get the rated', () => {
            const data = [
                { rated: 'PG' },
                { rated: 'R' },
            ];
            const rated = getRated(data);
            expect(rated).to.have.length(2);
        });
        it('should handle missing rated key', () => {
            const data = [
                { rated: 'PG' },
                { rated: 'R' },
                { foo: 'bar' },
            ];
            const rated = getRated(data);
            expect(rated).to.have.length(2);
        });
    });
});
