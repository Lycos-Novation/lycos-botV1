const Command = require("../../base/Command.js");

class Dog extends Command {
	constructor(client) {
		super(client, {
			name: "dog",
			description: (language) => language.get("DOG_DESCRIPTION"),
			usage: (language, prefix) => language.get("DOG_USAGE", prefix),
			examples: (language, prefix) => language.get("DOG_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			permLevel: "User",
			botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
			nsfw: false,
			adminOnly: false,
			cooldown: 2000,
		});
	}

	run(message) {
		try {
			message.bot.pictURL.getImage("dog").then((image) => {
					if(image.url.includes(".mp4")) {
						return message.channel.send(image.url)
					}
					return message.channel.send({
						embed: {
							author: {
								name: "Aww... Doggo!",
							},
							image: {
								url: image.url,
							},
							color: message.config.embed.color,
						},
					});
			});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Dog;
