const { ModuleClient } = require('../src/index');
const cli = new ModuleClient();
cli.loadAll();
cli.on('storesLoaded', client => {
    console.log(client);
});