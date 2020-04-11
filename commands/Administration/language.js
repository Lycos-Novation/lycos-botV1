const Command = require("../../base/Command.js");
const languages = ["english", "french"];

class Language extends Command {
	constructor(client) {
		super(client, {
			name: "language",
			description: (language) => language.get("LANGUAGE_DESCRIPTION"),
			usage: (language, prefix) => language.get("LANGUAGE_USAGE", prefix),
			examples: (language, prefix) => language.get("LANGUAGE_EXAMPLES", prefix),
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

	async run(message, args) {
		try {
			if (!args[0]) {
				return message.channel.send(message.language.get("LANGUAGE_INFO", message.settings.language, message.settings.prefix));
			}
			if (args[0].toLowerCase() === "list") {
				return message.channel.send(message.language.get("LANGUAGE_LIST", languages));
			}
			if (args[0].toLowerCase() === "set") {
				if(!args[1] || !/\S+/g.test(args[1])) {
					return message.channel.send(message.language.get("LANGUAGE_NULL"))
				}
				else if (languages.includes(args[1].toLowerCase())) {
					const g = await message.bot.functions.getDataGuild(message.guild);
					if (g.language === args[1].toLowerCase()) {
						return message.channel.send(message.language.get("LANGUAGE_ALREADY_SET", args))
					}
					else {
						await message.bot.functions.updateGuild(g, {language: args[1].toLowerCase()})
						.then(message.channel.send(message.language.get("LANGUAGE_GUILD_INFO", args)));
						return;
					}
				}
				else {
					return message.channel.send(message.language.get("ERROR_LANGUAGE_INCORRECT"));
				}
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Language;
