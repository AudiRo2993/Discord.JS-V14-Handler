

module.exports = {
	name: 'ping',
	description: "View my speed / latency",
  aliases: ["latency", "speed", "ms"],
  usage: "[prefix]help",
  nsfwOnly: false,
  guildOnly: false,
  ownerOnly: false,
	cooldown: 3000,
	userPerms: [''],
	botPerms: [''],
    category: "Information",
	run: async (client, message, args, prefix) => {
		message.reply({ content: `My ping is \`${client.ws.ping}\` ms`})
		
	}
};





