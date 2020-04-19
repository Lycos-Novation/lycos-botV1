const Command = require("../../base/Command.js");

class Sponsors extends Command {
	constructor(client) {
		super(client, {
			name: "sponsors",
			description: (language) => language.get("SPONSORS_DESCRIPTION"),
			usage: (language, prefix) => language.get("SPONSORS_USAGE", prefix),
			examples: (language, prefix) => language.get("SPONSORS_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			permLevel: "User",
			aliases: ["sponsor"],
			nsfw: false,
			adminOnly: false,
			cooldown: 1000,
		});
	}

	run(message) {
		try {
			return message.channel.send({
				embed: {
					title: message.language.get("SPONSORS_TITLE"),
					url: "https://discord.gg/7UwmMA3",
					author: {
						name: "Lycos",
						icon_url: this.client.user.displayAvatarURL(),
					},
					color: message.config.embed.color,
					thumbnail: {
						url: this.client.user.displayAvatarURL(),
					},
					description: message.language.get("SPONSORS_EMBED_DESC"),
					fields: [
						{
							name: message.language.get("SPONSORS_NAMES")[0],
							value: message.language.get("SPONSORS_VALUES")[0],
						},
					],
				},
			});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Sponsors;
