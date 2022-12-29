const { SlashCommandBuilder, ChatInputCommandInteraction, Client, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("buy")
        .setDescription("Shop at store.")
        .addStringOption((option) => {
            option
            .setName("content")
            .setDescription("The text that i should say")
        }),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
         const content = interaction.options.getString("content")

         await interaction.reply({ content: `🚀 | Sent the message: \`${content}\``})
    }
}