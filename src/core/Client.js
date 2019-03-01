const Discord = require('discord.js');
const path = require('path');
const CommandStore = require('./structures/CommandStore');
const EventStore = require('./structures/EventStore');
const fs = require('fs-nextra');

class ModuleClient extends Discord.Client {
    constructor(options = {}) {
        super(options);

        this.prefix = options.prefix || null;

        this.baseDirectory = path.dirname(require.main.filename);

        this.stores = new Set();
        this.commands = new CommandStore(this);
        this.events = new EventStore(this);
        this.stores
            .add(this.events)
            .add(this.commands);
    }

    async login(token) {
        const files = await fs.readdir(path.join(__dirname, 'extensions'));
        files.filter(fileName => fileName.endsWith('.js')).map(name => name.slice(0, -3)).forEach(structure => {
            const r = require(`./extensions/${structure}`);
        });
        // return super.login(token);
    }
    loadAll() {
        this.stores.forEach(async store => {
            try {
                await store.register();
            } catch (error) {
                this.emit('error', error, store);
            }
        });
        this.emit('storesLoaded', this.stores);
        return this;
    }
    loadCommands() {
        this.commands.register();
        return this;
    }
}

module.exports = ModuleClient;