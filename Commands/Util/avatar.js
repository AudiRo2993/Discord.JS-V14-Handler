const {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
  GuildMemberManager,
  GuildMember,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription(
      "Get the avatar URL of the selected user, or your own avatar."
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("Choose who you want to see.")
    ),
  /**
   *
   * @param {CommandInteraction} interaction
   * @returns
   */
  async execute(interaction, client) {
    const user = interaction.options.getUser("user") || interaction.user;
    user.fetch();
    const exampleEmbed = new EmbedBuilder()
      .setAuthor({
        name: `Avatar for ${user.username}`,
        iconURL: user.avatarURL(),
      })
      .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setFooter({
        text: `Requested by: ` + interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    return await interaction.reply({ embeds: [exampleEmbed] });
  },
};
