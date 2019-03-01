const Module = require('../');
const cli = new Module.ModuleClient();
console.log(cli.modules.directory);
process.exit();