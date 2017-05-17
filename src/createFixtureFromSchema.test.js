'use strict';

const createFixtureFromSchema = require('./createFixtureFromSchema');

describe('the createFixtureFromSchema function', function () {
    it('should create fixture data for a schema with primitive properties', function () {
        const schema = {
            id: 'id',

            properties: {
                foo: { type: 'string' },
                bar: { type: 'number' },
                baz: { type: 'boolean' },
            }
        };

        const expectedFixture = {
            foo: 'random-string',
            bar: 1,
            baz: true
        };

        const actualFixture = createFixtureFromSchema(schema);

        expect(actualFixture).to.deep.equal(expectedFixture);
    });
});
