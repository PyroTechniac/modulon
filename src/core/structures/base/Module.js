module.exports = class Module {
    constructor(client, type, options) {
        Object.defineProperty(this, 'client', { value: client });

        this.type = type || null;

        this.name = options.name.toLowerCase() || 'default';
    }
};