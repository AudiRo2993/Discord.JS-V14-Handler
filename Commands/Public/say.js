const { SlashCommandBuilder, ChatInputCommandInteraction, Client, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Say something.")
        .addStringOption(option =>
			option
				.setName('content')
				.setDescription('The content i should send.')),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
         const content = interaction.options.getString("content")

         await interaction.reply({ content: `🚀 | Sent the message: \`${content}\``, ephemeral: true})
         interaction.channel.send({ content: `${content}`})
    }
}
