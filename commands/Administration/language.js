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
			var method = args[0];
			if (!method) {
				message.channel.send(message.language.get("LANGUAGE_INFO", message.settings.language, message.settings.prefix));
				method = await message.bot.functions.awaitResponse(message);
			}
			if (method.startsWith(".")) return;
			if (method.toLowerCase() === "list") {
				return message.channel.send(message.language.get("LANGUAGE_LIST", languages));
			}
			if (method.toLowerCase() === "set") {
				var lang = args[1];
				if (!lang) {
					message.channel.send(message.language.get("LANGUAGE_SUPPLY"));
					lang = await message.bot.functions.awaitResponse(message);
				}
				if (lang.startsWith(".")) return;
				if (languages.includes(lang.toLowerCase())) {
					var sql = `SELECT *
							   FROM Guilds
							   WHERE guild_id="${message.guild.id}";`;
					var g;
					mysqlcon.query(sql, async function (err, result, fields) {
						g = result[0];
						if (g.language === lang.toLowerCase()) {
							return message.channel.send(message.language.get("LANGUAGE_ALREADY_SET", lang));
						} else {
							sql = `UPDATE Guilds 
								   SET language="${lang.toLowerCase()}"
								   WHERE guild_id="${message.guild.id}";`;
							mysqlcon.query(sql, async function (err, result, fields) {
							});
							var sql = `SELECT language
							   FROM Guilds
							   WHERE guild_id="${message.guild.id}";`;
					var g;
					mysqlcon.query(sql, async function (err, result, fields) {
						g = result[0];
						const msgLang = new (require(`../../languages/${g.language}.js`));
						return message.channel.send(msgLang.get("LANGUAGE_GUILD_INFO", lang));
					});
							
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
