const {
  SlashCommandBuilder,
  CommandInteraction,
  ActionRowBuilder,
  SelectMenuBuilder,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("together")
    .setDescription("Play games with friends!"),
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (!interaction.member.voice.channelId) {
      return interaction.reply({
        embeds: [
          { description: `You must be in a voice channel.`, color: 0xb84e44 },
        ],
        ephemeral: true,
      });
    }
    if (
      interaction.client.voice.channelId &&
      interaction.member.voice.channelId !== interaction.client.voice.channelId
    ) {
      return interaction.reply({
        embeds: [
          {
            description: `You must be in the same voice channel as me to use this feature.`,
            color: 0xb84e44,
          },
        ],
        ephemeral: true,
      });
    }

    const row = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("together")
        .setPlaceholder("Choose an activity")
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
          {
            label: "YouTube",
            value: "880218394199220334",
          },
          {
            label: "Poker",
            value: "755827207812677713",
          },
          {
            label: "Chess",
            value: "832012774040141894",
          },
          {
            label: "Checkers",
            value: "832013003968348200",
          },
          {
            label: "Betrayal",
            value: "773336526917861400",
          },
          {
            label: "Fishington",
            value: "814288819477020702",
          },
          {
            label: "Words Snack",
            value: "879863976006127627",
          },
          {
            label: "Doodle Crew",
            value: "878067389634314250",
          },
          {
            label: "Spellcast",
            value: "852509694341283871",
          },
          {
            label: "Awkword",
            value: "879863881349087252",
          },
          {
            label: "Letter Tile",
            value: "879863686565621790",
          },
        ])
    );
    interaction.reply({
      embeds: [
        {
          author: {
            name: "Discord Together",
            iconURL: interaction.guild.iconURL(),
          },
          description: `Choose an activity below!`,
          footer: {
            text: "You must be in a voice channel and on a desktop to use this feature.",
          },
          color: 0x44b868,
        },
      ],
      components: [row],
    });
  },
};
