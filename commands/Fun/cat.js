const Command = require("../../base/Command.js");

class Cat extends Command {
	constructor(client) {
		super(client, {
			name: "cat",
			description: (language) => language.get("CAT_DESCRIPTION"),
			usage: (language, prefix) => language.get("CAT_USAGE", prefix),
			examples: (language, prefix) => language.get("CAT_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			permLevel: "User",
			botPermissions: ["EMBED_LINKS"],
			aliases: ["cats", "chat", "chats"],
			nsfw: false,
			adminOnly: false,
			cooldown: 2000,
		});
	}

	run(message) {
		try {
			message.bot.pictURL.getImage("cat").then((image) => {
				return message.channel.send({
					embed: {
						"author": {
							"name": "Aww... Kitty!",
						},
						"image": {
							"url": image.url,
						},
						"color": message.config.embed.color,
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

module.exports = Cat;
