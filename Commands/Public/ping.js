const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  Client,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ping")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  execute(interaction, client) {
    interaction.reply({ content: ms(client.ws.ping), ephemeral: true });
  },
};
