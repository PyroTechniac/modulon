const Module = require('./base/Module');
const ModuleStore = require('./base/ModuleStore');
const fs = require('fs');
const path = require('path');

class EventStore extends ModuleStore {
    constructor(client) {
        super(client, 'events');
    }
    register() {
        this.ensureDir().then(() => {
            const files = fs.readdirSync(path.join(this.client.baseDirectory, this.holds));
            files.filter(fileName => fileName.endsWith('.js')).map(name => name.slice(0, -3)).forEach(file => {
                const eventInfo = require(path.join(this.client.baseDirectory, this.holds, file));
                const event = new Module(this.client, 'event', eventInfo);
                if (event.enabled) {
                    this.client.emit('debug', `Loaded event ${event.name}`);
                    this.set(event.name, event);
                    this.client['on'](event.name, event._execute);
                }
            });
            return this;
        });
    }
}
module.exports = EventStore;