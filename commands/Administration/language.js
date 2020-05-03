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
			aliases: ["lang"],
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
				if (!args[1] || !/\S+/g.test(args[1])) {
					return message.channel.send(message.language.get("LANGUAGE_NULL"))
				}
				else if (languages.includes(args[1].toLowerCase())) {
					var sql = `SELECT *
							   FROM Guilds
							   WHERE guild_id="${message.guild.id}"`;
					var g;
					mysqlcon.query(sql, async function (err, result, fields) {
						g = result[0];
						if (g.language === args[1].toLowerCase()) {
							return message.channel.send(message.language.get("LANGUAGE_ALREADY_SET", args))
						} else {
							sql = `UPDATE Guilds 
								   SET language=${args[1].toLowerCase()}
								   WHERE guild_id="${message.guild.id}";`;
							mysqlcon.query(sql, async function (err, result, fields) {
							});
							return message.channel.send(message.language.get("LANGUAGE_GUILD_INFO", args));
						}
					});
				} else {
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
