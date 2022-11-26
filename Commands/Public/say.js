const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Echoes Messages")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((options) =>
      options
        .setName("message")
        .setDescription("Your message")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const message = interaction.options.getString("message");
    interaction.channel.send({ content: message }).then(() => {
      interaction.reply(`✅ | Message Sent`);
    });
  },
};
