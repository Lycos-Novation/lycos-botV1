const Command = require("../../base/Command.js");
const aliases_fr = ["french", "français", "francais", "fr"], aliases_en = ["english", "anglais", "englais", "en"];
aliases_fr[0];
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
			botPermissions: ["SEND_MESSAGES"],
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
				message.channel.send(message.language.get("LANGUAGE_INFO", message.settings.language)+"\n"+message.language.get("COMMAND_CANCEL"));
				method = await message.bot.functions.awaitResponse(message);
			}
			if (method.startsWith(message.prefix)) return;
			if (method.toLowerCase() === "stop" || method.toLowerCase() === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
			if (method.toLowerCase() === "list") {
				return message.channel.send({
					embed: {
						author: {
							name: message.bot.user.username,
							icon_url: message.bot.user.displayAvatarURL({ format: "png", dynamic: true })
						},
						title: message.language.get("LANGUAGE_LIST", g),
						description: message.language.get("LANGAUGE_LIST_DESC", message.settings.prefix),
						fields: [
							{
								name: message.language.get("LANGUAGE_NAMES")[0],
								value: aliases_en.join(", "),
							},
							{
								name: message.language.get("LANGUAGE_NAMES")[1],
								value: aliases_fr.join(", "),
							},
							{
								name: message.language.get("LANGUAGE_HELP_TRAD_TITLE"),
								value: message.language.get("LANGUAGE_HELP_TRAD_MSG"),
							},
						],
						color: message.config.embed.color,
						thumbnail: {
							url: message.guild.iconURL({ format: "png", dynamic: true }),
						},
					},
				});
			} else if (method.toLowerCase() === "set") {
				var lang = args[1];
				if (!lang) {
					await message.channel.send(message.language.get("LANGUAGE_SUPPLY")+"\n"+message.language.get("COMMAND_CANCEL"));
					lang = await message.bot.functions.awaitResponse(message);
				}
				if (lang.startsWith(message.prefix)) return;
				if (lang.toLowerCase() === "stop" || lang.toLowerCase() === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
				if (aliases_fr.includes(lang.toLowerCase()) || aliases_en.includes(lang.toLowerCase())) {
					var sql = `SELECT *
							   FROM Guilds
							   WHERE guild_id="${message.guild.id}";`;
					var g;
					mysqlcon.query(sql, async function (err, result, fields) {
						g = result[0];
						let langToSet = aliases_fr.includes(lang.toLowerCase()) ? "french" : "english";
						if (g.language === langToSet) {
							return message.channel.send(message.language.get("LANGUAGE_ALREADY_SET", langToSet === "french" ? 'français' : langToSet));
						} else {
							sql = `UPDATE Guilds 
								   SET language="${langToSet}"
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
								return message.channel.send(msgLang.get("LANGUAGE_GUILD_INFO", langToSet === "french" ? 'français' : langToSet));
							});

						}
					});
				} else {
					return message.channel.send(message.language.get("ERROR_LANGUAGE_INCORRECT"));
				}
			} else {
				return message.channel.send(message.language.get("LANGUAGE_METHOD_ERROR"));
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Language;
