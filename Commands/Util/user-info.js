const { EmbedBuilder, SlashCommandBuilder, CommandInteraction, Client } = require("discord.js");
const axios = require("axios");
const Badges = require('../../Structures/Badges');
const emoji = [
    { name: "Staff", emoji: "<:staff:998273007988518993>" },
    {
        name: "CertifiedModerator",
        emoji: "<:moderator:998273004746309775>",
    },
    {
        name: "Partner",
        emoji: "<:partnered_server_owner:998273006457585728>",
    },
    {
        name: "Hypesquad",
        emoji: "<:HypeSquad:998273002011623534>",
    },
    { name: "HypeSquadOnlineHouse1", emoji: '<:bravery:998272993346207865>' },//
    {
        name: "HypeSquadOnlineHouse2",
        emoji: "<:brilliance:998272994847768617>",
    },
    { name: "HypeSquadOnlineHouse3", emoji: "<:balance:998272991878201354>" },
    { name: "BugHunterLevel1", emoji: "<:BugHunter:998272998362599455>" },
    { name: "BugHunterLevel2", emoji: "<:BugHunter_2:998272996282204250>" },
    {
        name: "EarlyVerifiedDeveloper",
        emoji: "<:developer:998272999130153113>",
    },
    {
        name: "PremiumEarlySupporter",
        emoji: "<:early_supporter:998273000640090254>",
    },
    {
        name: "ServerBooster",
        emoji: "<a:booster:998272903281905664>"
    },
    {
        name: "DiscordNitro",
        emoji: "<:nitro:1003706726383624302>"
    }
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user-info")
        .setDescription("Shows info for specified user")
        .addUserOption(options => options.setName("user").setDescription("Select a user")),
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { options, guild } = interaction;
        try {
            const user = options.getUser("user") || interaction.user;
            await user.fetch();
            const mem = guild.members.cache.get(user.id);
            axios
                .get(`https://discord.com/api/users/${user.id}`, {
                    headers: {
                        Authorization: `Bot ${client.token}`,
                    },
                })
                .then((res) => {
                    const { banner, accent_color } = res.data;
                    const _premium = mem.premiumSince;
                    const _name = mem.nickname ? mem.nickname : user.username;

                    const userinfo = new EmbedBuilder()
                        .setAuthor({
                            name: `${user.username}'s stats`,
                            iconURL: user.displayAvatarURL({ size: 512, dynamic: true }),
                        })
                        .addFields(
                            {
                                name: "Name: ",
                                value: _name,
                                inline: true,
                            },
                            {
                                name: "#️⃣ Discriminator: ",
                                value: `#${mem.user.discriminator}`,
                                inline: true,
                            },
                            {
                                name: "🆔 ID: ",
                                value: mem.user.id,
                                inline: true,
                            },
                            {
                                name: "Avatar link: ",
                                value: `[Click Here](${mem.user.displayAvatarURL()})`,
                                inline: true,
                            },
                            {
                                name: "Account Created: ",
                                value: mem.user.createdAt.toLocaleDateString("en-us"),
                                inline: true,
                            },
                            {
                                name: "Joined Server: ",
                                value: mem.joinedAt.toLocaleDateString("en-us"),
                                inline: true,
                            },
                            {
                                name: "Server Booster: ",
                                value: _premium ? "Yes" : "No",
                                inline: true,
                            },
                            {
                                name: "Banner:",
                                value: banner ? "Yes" : "No",
                                inline: true
                            },
                            {
                                name: `User Roles (${mem.roles.cache.size - 1}): `,
                                value:
                                    mem.roles.cache
                                        .map((role) => role.toString())
                                        .join(" ")
                                        .replace("@everyone", "") || "No Roles",
                                inline: false,
                            }
                        );
                    const Flags = mem.user.flags.toArray();
                    if (Flags) {
                        const flags = Flags.filter(b => !!emoji[b])
                        if (user.avatar && user.avatar.startsWith('a_') || banner)
                            flags.push(emoji[12].emoji);

                        emoji.forEach((e) => {
                            if (Flags.includes(e.name)) flags.push(e.emoji);
                        });

                        if (_premium) flags.push(emoji[11].emoji)

                        if (flags.length) {
                            userinfo.setDescription(`Badges: ${flags.join(" ")}`);
                        } else userinfo.setDescription(`Badges: None`)
                    }

                    if (banner) {
                        const extension = banner.startsWith("a_") ? ".gif" : ".png";
                        const url = `https://cdn.discordapp.com/banners/${mem.user.id}/${banner}${extension}?size=1024`;
                        userinfo.setImage(url).setColor("Fuchsia");
                    } else userinfo.setColor(accent_color);

                    if (!mem.presence) {
                        userinfo.setFooter({ text: "⚫ This user is Offline" })
                        interaction.reply({ embeds: [userinfo] });
                    } else {
                        let status;
                        switch (mem.presence.status) {
                            case "online":
                                status = "🟢 Online";
                                break;
                            case "dnd":
                                status = "⛔ Do Not Disturb";
                                break;
                            case "idle":
                                status = "🌙 Idle";
                                break;
                        }
                        let mode;
                        if (mem.presence.clientStatus.desktop) mode = "🖥️ Desktop";
                        if (mem.presence.clientStatus.mobile) mode = "📱 Mobile";
                        if (mem.presence.clientStatus.web) mode = "🕸️ Web";
                        userinfo.addFields(
                            {
                                name: "Current Status: ",
                                value: status,
                                inline: true,
                            },
                            {
                                name: "Client Status: ",
                                value: mode,
                                inline: true,
                            },
                            {
                                name: "Activity: ",
                                value: mem.presence.activities[0]
                                    ? mem.presence.activities[0].name
                                    : `${user.username} isn't playing a game!`,
                                inline: true,
                            }
                        );

                        interaction.reply({ embeds: [userinfo] });
                    }
                });
        } catch (error) {
            console.log(error);
        }
    },
};
