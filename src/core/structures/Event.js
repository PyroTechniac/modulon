const Module = require('./base/Module');

module.exports = class Event extends Module {
    constructor(client, options) {
        super(client, 'event', options);
    }
};