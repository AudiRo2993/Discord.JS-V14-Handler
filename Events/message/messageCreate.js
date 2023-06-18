const {
  EmbedBuilder,
  PermissionsBitField,
  Collection,
  ChannelType,
} = require("discord.js");
const moment = require("moment");
const cooldown = new Collection();
const config = require("../../Structures/config.json");
const ms = require("ms");
module.exports = {
  name: "messageCreate",
  /**
   * @param {import("discord.js").Message} message
   * @param {import("../../Structures/bot")} client
   */
  async execute(message, client) {
    if (
      !message.guild ||
      message.guild.available === false ||
      !message.channel ||
      !message.author
    )
      return;
    var prefix = config.Config.prefix;

    if (message.author.bot) return;
    if (message.channel.type !== ChannelType.GuildText) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command =
      client.prefix.get(cmd.toLowerCase()) ||
      client.prefix.find((c) => c.aliases?.includes(cmd.toLowerCase()));

    if (command) {
      if (command.cooldown) {
        if (cooldown.has(`${command.name}${message.author.id}`))
          return message.channel.send({
            content: config.messages["COOLDOWN_MESSAGE"].replace(
              "<duration>",
              ms(
                cooldown.get(`${command.name}${message.author.id}`) -
                  Date.now(),
                { long: true }
              )
            ),
          });
        if (command.userPerms || command.botPerms) {
          if (
            !message.member.permissions.has(
              PermissionsBitField.resolve(command.userPerms || [])
            )
          ) {
            const userPerms = new EmbedBuilder()
              .setDescription(
                `🚫 ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`
              )
              .setColor("Red");
            return message.reply({ embeds: [userPerms] });
          }
          if (
            !message.guild.members.cache
              .get(client.user.id)
              .permissions.has(
                PermissionsBitField.resolve(command.botPerms || [])
              )
          ) {
            const botPerms = new EmbedBuilder()
              .setDescription(
                `🚫 ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`
              )
              .setColor("Red");
            return message.reply({ embeds: [botPerms] });
          }
        }

        command.run(client, message, args, prefix);
        cooldown.set(
          `${command.name}${message.author.id}`,
          Date.now() + command.cooldown
        );
        setTimeout(() => {
          cooldown.delete(`${command.name}${message.author.id}`);
        }, command.cooldown);
      } else {
        if (command.userPerms || command.botPerms) {
          if (
            !message.member.permissions.has(
              PermissionsBitField.resolve(command.userPerms || [])
            )
          ) {
            const userPerms = new EmbedBuilder()
              .setDescription(
                `🚫 ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`
              )
              .setColor("Red");
            return message.reply({ embeds: [userPerms] });
          }

          if (
            !message.guild.members.cache
              .get(client.user.id)
              .permissions.has(
                PermissionsBitField.resolve(command.botPerms || [])
              )
          ) {
            const botPerms = new EmbedBuilder()
              .setDescription(
                `🚫 ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`
              )
              .setColor("Red");
            return message.reply({ embeds: [botPerms] });
          }
        }
        command.run(client, message, args, prefix);
      }
      const staff = config.Developers.owners;
      if (command.ownerOnly && !staff.includes(message.author.id)) {
        return message
          .reply({
            embeds: [
              new MessageEmbed()
                .setColor("Red")
                .setTitle(
                  `<:RZ_WarningIcon:1084203788975472650> ${message.author.username} This command is invalid!`
                )
                .setDescription(
                  `The command \`${cmd}\` does not exist.\nPlease use \`${prefix}help\` to see all the commands.`
                )
                .setFooter({ text: `Razen` }),
            ],
          })
          .then((m) => setTimeout(() => m.delete(), 6000));
      }

      const private = config.Servers.Official.one;
      if (command.guildOnly && !private.includes(message.guild.id)) {
        return message
          .reply({
            embeds: [
              new MessageEmbed()
                .setColor("Red")
                .setTitle(
                  `<:RZ_WarningIcon:1084203788975472650> ${message.author.username} This command is invalid!`
                )
                .setDescription(`The command \`${cmd}\` is NSFW ONLY!`)
                .setFooter({ text: `Razen` }),
            ],
          })
          .then((m) => setTimeout(() => m.delete(), 6000));
      }

      if (command.nsfwOnly && !message.channel.nsfw) {
        return message
          .reply({
            embeds: [
              new MessageEmbed()
                .setColor("Red")
                .setTitle(
                  `<:RZ_WarningIcon:1084203788975472650> ${message.author.username} This command is invalid!`
                )
                .setDescription(
                  `The command \`${cmd}\` can only be used in our official servers.`
                )
                .setFooter({ text: `Razen` }),
            ],
          })
          .then((m) => setTimeout(() => m.delete(), 6000));
      }
    }
  },
};
