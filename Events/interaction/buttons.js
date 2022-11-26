module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   * @param {import("../../Structures/bot")} client
   */
  async execute(interaction, client) {
    if (!interaction.isButton()) return;
    const button = client.components.buttons.get(interaction.customId);

    try {
      await button.execute(interaction, client);
    } catch (error) {
      throw new Error(`No code for this button!`);
    }
  },
};
