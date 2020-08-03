const Command = require("../../base/Command.js");

class Ping extends Command {
	constructor(client) {
		super(client, {
			name: "ping",
			description: (language) => language.get("PING_DESCRIPTION"),
			usage: (language, prefix) => language.get("PING_USAGE", prefix),
			examples: (language, prefix) => language.get("PING_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: ["pong"],
			botPermissions: ["SEND_MESSAGES"],
			permLevel: "User",
			botPermissions: ["EMBED_LINKS"],
			cooldown: 1000,
		});
	}

	run(message) {
		try {
			return message.channel.send({
				embed: {
					color: message.config.embed.color,
					fields: [
						{
							name: message.language.get("PING_APILATENCY"),
							value:  `${Math.round(this.client.ws.ping)} ms`,
						},
						{
							name: message.language.get("PING_CLIENTLATENCY"),
							value:  `${Math.round(new Date().getTime() - message.createdTimestamp)} ms`,
						},
					],
					footer: {
						text: message.config.embed.footer,
					},
					timestamp: new Date(),
				},
			});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Ping;
