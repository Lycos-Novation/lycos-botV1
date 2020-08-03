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
			botPermissions: ["SEND_MESSAGES"],
			nsfw: false,
			adminOnly: false,
			cooldown: 1000,
		});
	}

	run(message, args) {
		try {
			let toLook = args.join(" ");
			if (!toLook) {
				var looked = message.member
			}
			if (message.mentions.members.size > 0) {
				looked = message.mentions.members.first();
			} else if (toLook) {
				looked = message.bot.functions.fetchMembers(message.guild, toLook);
				if (looked.size === 0) return message.channel.send(message.language.get("ERROR_NOUSER_FOUND"));
				else if (looked.size === 1) looked = looked.first();
				else return message.channel.send(message.language.get("ERROR_MUCH_USERS_FOUND"));
			}
			
			return message.channel.send({
				embed: {
					color: message.config.embed.color,
					author: {
						name: message.language.get("AVATAR_TITLE", looked),
						icon_url: looked.user.displayAvatarURL({format: "png",dynamic: true}),
					},
					image: {
						url: looked.user.displayAvatarURL({format: "png",dynamic: true, size: 2048}),
					},
					timestamp: new Date(),
					footer: {
						text: message.config.embed.footer,
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
