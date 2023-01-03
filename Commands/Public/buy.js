const { SlashCommandBuilder, ChatInputCommandInteraction, Client, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("buy")
        .setDescription("Shop at store.")
        .addSubcommand(subcommand =>
            subcommand
                .setName('item')
                .setDescription('Select the Item')),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const sub = interaction.options.getSubcommand();
        if (sub === 'item') {
            const row = new ActionRowBuilder().addComponents(
                new SelectMenuBuilder()
                    .setCustomId("item_shop")
                    .setPlaceholder("Select an item to buy.")
                    .addOptions([
                        { label: 'item1', value: 'item1', description: "I'm item 1" },
                        { label: 'item2', value: 'item2', description: "I'm item 2" },
                        { label: 'item3', value: 'item3', description: "I'm item 3" },
                    ])
            )
            return await interaction.reply({ content: "Please select the item you wish to buy.", components: [row] })
        }
    }
}