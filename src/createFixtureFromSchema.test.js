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

    it('should create a list of items for properties with type `array`', function () {
        const schema = {
            id: 'id',

            properties: {
                strings: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                },

                numbers: {
                    type: 'array',
                    items: {
                        type: 'number'
                    }
                },

                booleans: {
                    type: 'array',
                    items: {
                        type: 'boolean'
                    }
                }
            }
        };

        const expectedFixture = {
            strings: ['random-string', 'random-string', 'random-string'],
            numbers: [1, 1, 1],
            booleans: [true, true, true]
        };

        const actualFixture = createFixtureFromSchema(schema);

        expect(actualFixture).to.deep.equal(expectedFixture);
    });

    it('should support recursive arrays', function () {
        const schema = {
            id: 'id',

            properties: {
                strings: {
                    type: 'array',
                    items: {
                        type: 'array',
                        items: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        };

        const expectedFixture = {
            strings: [[['random-string', 'random-string', 'random-string']]]
        };

        const actualFixture = createFixtureFromSchema(schema);

        expect(actualFixture).to.deep.equal(expectedFixture);
    });

    it('should support objects', function () {
        const schema = {
            id: 'id',

            properties: {
                foo: {
                    type: 'object',
                    properties: {
                        bar: {
                            type: 'string'
                        },

                        baz: {
                            type: 'number'
                        }
                    }
                }
            }
        };

        const expectedFixture = {
            foo: {
                bar: 'random-string',
                baz: 1
            }
        };

        const actualFixture = createFixtureFromSchema(schema);

        expect(actualFixture).to.deep.equal(expectedFixture);
    });

    it('should support nested objects', function () {
        const schema = {
            id: 'id',

            properties: {
                foo: {
                    type: 'object',
                    properties: {
                        bar: {
                            type: 'object',
                            properties: {
                                baz: {
                                    type: 'object',
                                    properties: {
                                        string: {
                                            type: 'string'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        const expectedFixture = {
            foo: {
                bar: {
                    baz: {
                        string: 'random-string'
                    }
                }
            }
        };

        const actualFixture = createFixtureFromSchema(schema);

        expect(actualFixture).to.deep.equal(expectedFixture);
    });
});
