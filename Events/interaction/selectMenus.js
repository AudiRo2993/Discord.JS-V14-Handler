module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {import("discord.js").SelectMenuInteraction} interaction
   * @param {import("../../Structures/bot")} client
   */
  async execute(interaction, client) {
    if (!interaction.isSelectMenu()) return;

    // Discord Together/Activities
    if (interaction.customId === "together") {
      const fetch = require("node-fetch");
      if (interaction.member.voice.channelId) {
        try {
          await fetch(
            `https://discord.com/api/v8/channels/${interaction.member.voice.channelId}/invites`,
            {
              method: "POST",
              body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: interaction.values[0],
                target_type: 2,
                temporary: false,
                validate: null,
              }),
              headers: {
                Authorization: `Bot ${client.token}`,
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => res.json())
            .then((invite) => {
              if (
                invite.error ||
                !invite.code ||
                Number(invite.code) === 50013
              ) {
                return console.log(
                  `(${interaction.guild.name}) An error occurred while starting activity id ${interaction.values[0]}`
                );
              }
              interaction.channel.send(
                `${interaction.member} https://discord.com/invite/${invite.code}`
              );
              interaction.deferUpdate();
            });
        } catch (err) {
          console.log(
            `(${interaction.guild.name}) An error occurred while starting activity id ${interaction.values[0]}`
          );
        }
      }
    }
    const selectMenu = client.components.selectMenus.get(interaction.customId);

    try {
      await selectMenu.execute(interaction, client);
    } catch (error) {
      throw new Error(`No code for this select menu!`);
    }
  },
};
