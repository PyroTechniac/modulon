const Module = require('./base/Module');

module.exports = class Command extends Module {
    constructor(client, options) {
        super(client, 'command', options);
    }
};