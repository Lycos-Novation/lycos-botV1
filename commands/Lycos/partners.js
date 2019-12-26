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
			nsfw: false,
			adminOnly: false,
			cooldown: 1000,
		});
	}

	run(message) {
		try {
			return message.channel.send({
				embed: {
					"title": "DenverBot's partner",
					"url": "https://discord.gg/TcTjgeG",
					"author" : {
						"name" : "Skoali",
						"icon_url" : "https://skoali.fr/assets/img/logo.png",
					},
					"color": message.config.embed.color,
					"thumbnail": {
						"url" : "https://skoali.fr/assets/img/logo.png",
					},
					"description": "Skoali is a French hosting company that aims to provide services as cheaply as possible, or even free for some of them.",
					"fields" : [
						{
							"name": "\u200B",
							"value": "[Discord](https://discord.gg/554DCvV) - [Site](https://skoali.fr)",
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
