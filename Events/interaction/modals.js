module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {import("discord.js").ModalSubmitInteraction} interaction
   * @param {import("../../Structures/bot")} client
   */
  async execute(interaction, client) {
    if (!interaction.isModalSubmit()) return;
    const modal = client.components.modals.get(interaction.customId);

    try {
      await modal.execute(interaction, client);
    } catch (error) {
      console.log(error);
    }
  },
};
