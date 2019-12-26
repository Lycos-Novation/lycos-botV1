const Command = require("../../base/Command.js");

class Prefix extends Command {
	constructor(client) {
		super(client, {
			name: "prefix",
			description: (language) => language.get("PREFIX_DESCRIPTION"),
			usage: (language, prefix) => language.get("PREFIX_USAGE", prefix),
			examples: (language, prefix) => language.get("PREFIX_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Server Admin",
			botPermissions: ["EMBED_LINKS"],
			nsfw: false,
			adminOnly: true,
			cooldown: 1000,
		});
	}

	run(message, args) {
		try {
			if (!args[0]) {
				return message.channel.send(message.language.get("PREFIX_INFO", message.settings.prefix));
			}
			if (args[0] === "set") {
				if(!args[1] || !/\S+/g.test(args[1])) {
					return message.channel.send(message.language.get("PREFIX_NULL"));
				}
				else {
					message.bot.guildsData.set(message.guild.id, args[1], "prefix");
					return message.channel.send(message.language.get("PREFIX_CHANGE", args));
				}
			}
			if (args[0] === "reset") {
				message.bot.guildsData.set(message.guild.id, ".", "prefix");
				return message.channel.send(message.language.get("PREFIX_RESET"));
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Prefix;
