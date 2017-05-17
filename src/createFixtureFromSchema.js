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
    },

    array(value) {
        return value.items.type === 'array'
            ? [this[value.items.type](value.items)]
            : new Array(3).fill(this[value.items.type](value.items));
    }
};

function createIterableSchema(schema) {
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

    return iterableSchema;
}

module.exports = function createFixtureFromSchema(schema) {
    const iterableSchema = createIterableSchema(schema);
    const fixture = {};

    for (let { key, value } of iterableSchema) {
        fixture[key] = valueGenerators[value.type](value);
    }

    return fixture;
};
