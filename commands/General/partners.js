const Command = require("../../base/Command.js");

class Partners extends Command {
	constructor(client) {
		super(client, {
			name: "partners",
			description: (language) => language.get("PARTNERS_DESCRIPTION"),
			usage: (language, prefix) => language.get("PARTNERS_USAGE", prefix),
			examples: (language, prefix) => language.get("PARTNERS_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			permLevel: "User",
			aliases: ["partenaires", "partner", "partenaire"],
			nsfw: false,
			adminOnly: false,
			cooldown: 1000,
		});
	}

	run(message) {
		try {
			return message.channel.send({
				embed: {
					title: message.language.get("PARTNERS_TITLE"),
					url: "https://discord.gg/7UwmMA3",
					author: {
						name: "Lycos",
						icon_url: this.client.user.displayAvatarURL({format: "png",dynamic: true})
					},
					color: message.config.embed.color,
					thumbnail: {
						url: this.client.user.displayAvatarURL({format: "png",dynamic: true})
					},
					description: message.language.get("PARTNERS_EMBED_DESC"),
					fields: [
						{
							name: message.language.get("PARTNERS_NAMES")[0],
							value: message.language.get("PARTNERS_VALUES")[0],
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

module.exports = Partners;
