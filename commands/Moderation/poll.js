const Command = require("../../base/Command.js");

class Poll extends Command {
	constructor(client) {
		super(client, {
			name: "poll",
			description: (language) => language.get("POLL_DESCRIPTION"),
			usage: (language, prefix) => language.get("POLL_USAGE", prefix),
			examples: (language, prefix) => language.get("POLL_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Server Moderator",
			botPermissions: ["EMBED_LINKS"],
			nsfw: false,
			adminOnly: true,
			cooldown: 1000,
		});
	}

	run(message, args) {
		try {
			if (!args.join(" ")) {
				return message.channel.send(message.language.get("POLL_TEXT_NULL"));
			}
			else {
				return message.channel.send({
					embed: {
						color: message.config.embed.color,
						author: { name: "Poll", icon_url: message.guild.iconURL},
						description: args.join(" "),
						timestamp: new Date(),
						footer : { text : message.language.get("POLL_REACT") },
					},
				}).then(async (msg) => {
					await message.delete();
					await msg.react("✅");
					await msg.react("❌");
				});
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Poll;
