const {
  ActionRowBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  ButtonBuilder,
  SlashCommandBuilder,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Generate some memes"),
  developer: true,
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const meme = await utils.getMeme();
    const button = new ActionRowBuilder({
      type: 1,
      components: [
        new ButtonBuilder()
          .setCustomId("meme-next")
          .setStyle(ButtonStyle.Secondary)
          .setLabel("Next Meme")
          .setEmoji("⏩"),
      ],
    });

    interaction.reply({ embeds: [meme], components: [button] });
  },
};
