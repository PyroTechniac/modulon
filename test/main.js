const { ModuleClient } = require('../src/index');
const cli = new ModuleClient();
cli.loadAll();
cli.on('debug', message => console.log(message));
process.exit(0);