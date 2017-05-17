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

    array(keyValuePair, schemaProp) {
        const value = keyValuePair ? keyValuePair.value : schemaProp;

        return value.items.type === 'array'
            ? [this[value.items.type](null, value.items)]
            : new Array(3).fill(this[value.items.type](null, value.items));
    },

    object({ key, value }) {
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

    for (let keyValuePair of iterableSchema) {
        fixture[keyValuePair.key] = valueGenerators[keyValuePair.value.type](keyValuePair);
    }

    return fixture;
}

function createFixtureFromSchema(schema) {
    const iterableSchema = createIterableSchema(schema);
    return createSchemaSubTree(iterableSchema);
};

module.exports = createFixtureFromSchema
