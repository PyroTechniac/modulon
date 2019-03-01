const path = require('path');
const fs = require('fs-nextra');
const { CustomError } = require('advancedjs');

class Module {
    constructor(client, type, info) {
        Object.defineProperty(this, 'client', { value: client });

        this.enabled = info.enabled || true;

        this.name = info.name;

        this.type = type;

        this.execute = info.execute ? info.execute.bind(this) : this.default.bind(this);

        Object.values(info).forEach(val => {
            if (typeof val === 'function') {
                if (val.name !== 'execute') {
                    this[val.name] = val.bind(this);
                }
            }
        });
    }
    default() {
        throw new CustomError(`The ${this.type} ${this.name} does not have an execute() method`, 'ModuleExecuteError');
    }
    _execute(...args) {
        try {
            this.execute(...args);
        } catch (error) {
            this.client.emit('error', error);
        }
    }
}

module.exports = Module;