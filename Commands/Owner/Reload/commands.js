const {
    ChatInputCommandInteraction,
    EmbedBuilder,
    Client,
} = require("discord.js");

const { loadCommands } = require("../../../Handlers/Commands");

module.exports = {
    subCommand: "reload.commands",
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        try {
            console.log("Reloading commands...");
            loadCommands(client);
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            `\\✅ **Success:** \\✅\n Reloaded the commands! `
                        )
                        .setColor("Green"),
                ],
                ephemeral: true,
            });
        } catch (error) {
            console.log(error)
        }

    }
}