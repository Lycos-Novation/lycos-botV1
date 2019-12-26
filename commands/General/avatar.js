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
			const searchArgs = args.join(" ");
			let { member } = message;
			if (message.mentions.members.size > 0) {member = message.mentions.members.first();}
			else if (searchArgs) {
				member = message.bot.functions.fetchMembers(message.guild, searchArgs);
				if (member.size === 0) return message.channel.send(message.language.get("ERROR_NOUSER_FOUND"));
				else if (member.size === 1) member = member.first();
				else return message.channel.send(message.language.get("ERROR_MUCH_USER_FOUND"));
			}
			return message.channel.send({
				embed: {
					"color": message.config.embed.color,
					"author": {
						"name": message.language.get("AVATAR_TITLE", member),
						"icon_url": member.user.displayAvatarURL(),
					},
					"image" : {
						"url": member.user.displayAvatarURL({ size: 512 }),
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
