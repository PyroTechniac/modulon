const { Structures } = require('discord.js');

module.exports = Structures.extend('Guild', Guild => {
    class ModularGuild extends Guild {
        constructor(...args) {
            super(...args);
        }
    }
    return ModularGuild;
});