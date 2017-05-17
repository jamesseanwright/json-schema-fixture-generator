'use strict';

const generator = require('./generator');

const [sourceDir, destinationDir] = process.argv;
const usageMessage = `json-schema-fixture-generator [sourceDir] [destDir]`;

validateArg('sourceDir', sourceDir);
validateArg('destinationDir', destinationDir);

function validateArg(argName, argValue) {
    if (!argValue) {
        throw new Error(`${argName} not specified!\n\n${usageMessage}`);
    }
}
