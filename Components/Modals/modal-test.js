module.exports = {
  id: "modal-test",
  /**
   *
   * @param {import("discord.js").ModalSubmitInteraction} interaction
   * @param {import("../../Structures/bot")} client
   */
  async execute(interaction, client) {
    await interaction.update({ content: `I work!` });
  },
};
