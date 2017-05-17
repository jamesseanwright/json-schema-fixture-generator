'use strict';

const valueGenerators = {
    string() {
        return 'random-string';
    },

    number() {
        return 1;
    },

    boolean() {
        return true;
    }
};

module.exports = function createFixtureFromSchema(schema) {
    const iterableSchema = Object.assign({}, schema, {
        [Symbol.iterator]: function* iterator() {
            for (let key in iterableSchema.properties) {
                yield {
                    key,
                    value: iterableSchema.properties[key]
                };
            }
        }
    });

    const fixture = {};

    for (let { key, value } of iterableSchema) {
        fixture[key] = valueGenerators[value.type]();
    }

    return fixture;
};
