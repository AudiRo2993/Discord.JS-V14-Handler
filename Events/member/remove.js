module.exports = {
  name: "guildMemberRemove",
  /**
   * @param {import("discord.js").GuildMember} member
   * @param {import("../../Structures/bot")} client
   */
  async execute(member) {
    console.log(member.user.tag + " left the server " + member.guild.name);
  },
};
