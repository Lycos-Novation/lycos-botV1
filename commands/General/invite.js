const Command = require("../../base/Command.js");

class Invite extends Command {
	constructor(client) {
		super(client, {
			name: "invite",
			description: (language) => language.get("INVITE_DESCRIPTION"),
			usage: (language, prefix) => language.get("INVITE_USAGE", prefix),
			examples: (language, prefix) => language.get("INVITE_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [],
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
					title: message.language.get("INVITE_TITLE"),
					description: message.language.get("INVITE_DESC"),
				},
			});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Invite;
