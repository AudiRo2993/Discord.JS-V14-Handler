module.exports = {
  name: "guildMemberAdd",
  /**
   * @param {import("discord.js").GuildMember} member
   * @param {import("../../Structures/bot")} client
   */
  async execute(member, client) {
    console.log(member.user.username + " joined " + member.guild.name);
  },
};
