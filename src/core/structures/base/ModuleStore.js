const { Collection } = require('discord.js');
const path = require('path');

class ModuleStore extends Collection {
    constructor(client, holds) {
        super();

        Object.defineProperty(this, 'client', { value: client });

        Object.defineProperty(this, 'holds', { value: holds });

        Object.defineProperty(this, 'directory', { value: path.resolve(this.client.baseDirectory, this.holds) });
    }
}

module.exports = ModuleStore;