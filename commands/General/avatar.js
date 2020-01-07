const Command = require("../../base/Command.js");

class Avatar extends Command {
	constructor(client) {
		super(client, {
			name: "avatar",
			description: (language) => language.get("AVATAR_DESCRIPTION"),
			usage: (language, prefix) => language.get("AVATAR_USAGE", prefix),
			examples: (language, prefix) => language.get("AVATAR_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			permLevel: "User",
			botPermissions: ["EMBED_LINKS"],
			nsfw: false,
			adminOnly: false,
			cooldown: 1000,
		});
	}

	run(message, args) {
		try {
			let looked = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
			if (!looked) {
				looked = message.member
			}
			return message.channel.send({
				embed: {
					"color": message.config.embed.color,
					"author": {
						"name": message.language.get("AVATAR_TITLE", looked),
						"icon_url": looked.user.displayAvatarURL,
					},
					"image" : {
						"url": looked.user.displayAvatarURL,
					},
					"timestamp": new Date(),
					"footer" : {
						"text" : message.config.embed.footer,
					},
				},
			});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Avatar;
