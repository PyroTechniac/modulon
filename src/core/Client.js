const { Client } = require('discord.js');

module.exports = class ModularClient extends Client {
    constructor(options = {}) {
        super(options);

        this.prefix = options.prefix || null;
    }
};