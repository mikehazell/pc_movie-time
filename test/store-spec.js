/* eslint-env node, mocha */
import { expect } from 'chai';
import { getGenres } from '../source/store/movies';

describe('The movie store', () => {
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
});
