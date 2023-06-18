const { DevGuild } = process.env;
const { promisify } = require("util");
const { glob } = require("glob");
const globPromise = promisify(glob);

/**
 *
 * @param {import("../Structures/bot")} client
 */

async function loadPREFIXCommands(client) {
  client.prefix.clear();
  const commandFiles = await client.utils.loadFiles("CommandsPrefix");

  const prefixCommandsArray = [];

  for (const file of commandFiles) {
    const command = require(file);

    if (!command.name) {
      console.error(`[ERROR] Command: ${file} doesn't have a name!`);
      continue;
    }

    const splitted = file.split("/");
    const directory = splitted[splitted.length - 2];

    const properties = { directory, ...command };
    client.prefix.set(command.name, properties);
    prefixCommandsArray.push(properties);

    console.log(`[ Razen ]` + " --- Loaded " + `++ ${command.name} ++`);
    await new Promise((resolve) => setTimeout(resolve, 40)); // wait for 40 milliseconds
  }

  // Register the prefix commands
}

module.exports = { loadPREFIXCommands };
