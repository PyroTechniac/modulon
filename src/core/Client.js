const Discord = require('discord.js');
const path = require('path');
const ModuleStore = require('./structures/base/ModuleStore');

class ModuleClient extends Discord.Client {
    constructor(options = {}) {
        super(options);

        this.prefix = options.prefix || null;

        this.baseDirectory = path.dirname(require.main.filename);

        this.modules = new ModuleStore(this, 'nothing');
    }
}

module.exports = ModuleClient;