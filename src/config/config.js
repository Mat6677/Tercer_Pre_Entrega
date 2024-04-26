const { Command } = require("commander");
const program = new Command();

program.option("--dao <dao>", "DAO To use");

program.parse();

console.log(program.args);

module.exports = program.args
