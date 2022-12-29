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
      console.log(`No code for this button!`);
      interaction.reply({ content: `❌ Something went **WRONG**! > Either this code:\n- Has no Button Code\n- Found an error.\n> Please check the console or contact our Developers -> https://site.tyrion.ml`})
    }
  },
};
