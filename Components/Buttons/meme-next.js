module.exports = {
  id: "meme-next",
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   * @param {import("../../Structures/bot")} client
   */
  async execute(interaction, client) {
    let meme = await utils.getMeme();
    await interaction.update({ embeds: [meme] });
  },
};
