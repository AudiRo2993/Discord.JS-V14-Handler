const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Client,
} = require("discord.js");
const { inspect } = require("util");
const { Type } = require("@anishshobith/deeptype");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Is my coding good?")
    .addStringOption((options) =>
      options
        .setName("code")
        .setDescription("Check your own code.")
        .setRequired(true)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    let description = "";
    const errorEmbed = new EmbedBuilder().setColor("Red");

    if (!client.config.owners.includes(interaction.member.id)) {
      description = `\\📛 **Error:** \\📛\n What are you thinking? You're not my owner!`;
      return interaction.reply({
        embeds: [errorEmbed.setDescription(description)],
        ephemeral: true,
      });
    } else {
      const { options } = interaction;

      let code = options.getString("code");

      code = code.replace(/[""]/g, '"').replace(/['']/g, "'");
      let evaled;
      try {
        const start = process.hrtime();
        evaled = eval(code);
        if (evaled instanceof Promise) {
          evaled = await evaled;
        }
        const stop = process.hrtime(start);
        const response = [
          `\n**Input:** \`\`\`js\n${code}\n\`\`\``,
          `**Output:** \`\`\`js\n${clean(
            inspect(evaled, { depth: 0 })
          )}\n\`\`\``,
          `**Type:** \`\`\`ts\n${new Type(evaled).is}\n\`\`\``,
          `**Time Taken:** \`\`\`${(stop[0] * 1e9 + stop[1]) / 1e6}ms \`\`\``,
        ];
        const res = response.join("\n");
        if (res.length < 2000) {
          await interaction.reply({ embeds: [{ description: res }] });
        } else {
          const output = new att(Buffer.from(res), "output.txt");
          await interaction.reply(output);
        }
      } catch (err) {
        return interaction.reply({
          embeds: [
            errorEmbed
              .setDescription(
                `\\📛 **Error:** \\📛\n\`\`\`xl\n${clean(err)}\n\`\`\``
              )
              .setColor("Red"),
          ],
          ephemeral: true,
        });
      }
      function clean(text) {
        if (typeof text === "string") {
          text = text
            .replace(/`/g, `\`${String.fromCharCode(8203)}`)
            .replace(/@/g, `@${String.fromCharCode(8203)}`)
            .replace(
              new RegExp(client.token),
              `That is for me to know and you never to find out.`
            );
        }
        return text;
      }
    }
  },
};
