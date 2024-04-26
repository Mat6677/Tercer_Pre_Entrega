const { Command } = require("commander");
const program = new Command();

program.requiredOption("--dao <dao>", "DAO To use");
program.parse();

module.exports = { dao: program.opts().dao };
