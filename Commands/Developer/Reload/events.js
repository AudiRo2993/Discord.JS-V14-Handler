const {
    ChatInputCommandInteraction,
    EmbedBuilder,
    Client,
} = require("discord.js");

const { loadEvents } = require("../../../Handlers/Events");

module.exports = {
    subCommand: "reload.events",
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        try {
            console.log("Reloading events...");
            for (const [key, value] of client.events)
                client.removeListener(`${key}`, value, true);
            loadEvents(client);
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            `\\✅ **Success:** \\✅\n Reloaded the events! `
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