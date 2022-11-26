module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {import("discord.js").ContextMenuCommandInteraction} interaction
   * @param {import("../../Structures/bot")} client
   */
  async execute(interaction, client) {
    if (!interaction.isUserContextMenuCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      command.execute(interaction, client);
    } catch (error) {
      console.log(error);
    }
  },
};
