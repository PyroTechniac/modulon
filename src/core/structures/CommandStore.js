const Module = require('./base/Module');
const ModuleStore = require('./base/ModuleStore');
const fs = require('fs');
const path = require('path');

class CommandStore extends ModuleStore {
    constructor(client) {
        super(client, 'commands');
    }
    register() {
        this.ensureDir().then(() => {
            const files = fs.readdirSync(path.join(this.client.baseDirectory, this.holds));
            files.filter(fileName => fileName.endsWith('.js')).map(name => name.slice(0, -3)).forEach(file => {
                const cmdInfo = require(path.join(this.client.baseDirectory, this.holds, file));
                const cmd = new Module(this.client, 'command', cmdInfo);
                if (cmd.enabled) {
                    this.client.emit('debug', `Loaded command ${cmd.name}`);
                    this.set(cmd.name, cmd);
                }
            });
            return this;
        });
    }
}

module.exports = CommandStore;