module.exports = {
  id: "test",
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   * @param {import("../../Structures/bot")} client
   */
  async execute(interaction, client) {
    await interaction.update({
      embeds: [],
      components: [],
      content: "You clicked my button, I will disappear soon!",
    }),
      setTimeout(async () => {
        await interaction.deleteReply();
      }, 3000);
  },
};
