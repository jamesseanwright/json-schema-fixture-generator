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
    },

    object(value) {
        return createFixtureFromSchema(value);
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

function createSchemaSubTree(iterableSchema) {
    const fixture = {};

    for (let { key, value } of iterableSchema) {
        fixture[key] = valueGenerators[value.type](value);
    }

    return fixture;
}

function createFixtureFromSchema(schema) {
    const iterableSchema = createIterableSchema(schema);
    return createSchemaSubTree(iterableSchema);
}

module.exports = createFixtureFromSchema;
