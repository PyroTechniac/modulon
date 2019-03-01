const path = require('path');
const fs = require('fs-nextra');
const { CustomError } = require('advancedjs');

class Module {
    constructor(client, type, info) {
        Object.defineProperty(this, 'client', { value: client });

        this.enabled = info.enabled || true;

        this.name = info.name;

        this.type = type;

        this.execute = info.execute.bind(this) || this.default;

        Object.values(info).forEach(val => {
            if (typeof val === 'function') {
                if (val.name !== 'execute') {
                    this[val.name] = val.bind(this);
                }
            }
        });
    }
    default() {
        throw new CustomError(`The ${this.type} does not have an execute() method`, 'ModuleExecuteError');
    }
    _execute() { } // eslint-disable-line no-empty-function
}

module.exports = Module;