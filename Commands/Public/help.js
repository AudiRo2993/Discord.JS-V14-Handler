const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    Client,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder
} = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("help")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    execute(interaction, client) {
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('category')
                .setLabel('Categories')
                .setEmoji(`🚀`)
                .setStyle(ButtonStyle.Secondary),
        );
        interaction.reply({ content: `Hello`, components: [row], ephemeral: true})


       
    },
};