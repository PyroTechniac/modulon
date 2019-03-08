const { Client } = require('discord.js');
const fs = require('fs-nextra');

module.exports = class ModularClient extends Client {
    constructor(options = {}) {
        super(options);

        this.prefix = options.prefix || null;

        this.baseDirectory = require.main.filename;
    }

    loadModules(options = {}) {
        // Filler
    }
};