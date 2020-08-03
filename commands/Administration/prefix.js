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
			botPermissions: ["SEND_MESSAGES"],
			nsfw: false,
			adminOnly: true,
			cooldown: 1000,
		});
	}

	async run(message, args) {
		try {
			var sql = `SELECT *
					   FROM Guilds
					   WHERE guild_id="${message.guild.id}"`;
			var g;
			mysqlcon.query(sql, async function (err, result, fields) {
				g = result[0];
				var method = args[0];
			if (!method) {
				message.channel.send(message.language.get("PREFIX_INFO", message.settings.prefix)+"\n"+message.language.get("COMMAND_CANCEL"));
				method = await message.bot.functions.awaitResponse(message);
			}
			if (method.startsWith(message.prefix)) return;
			if (method.toLowerCase() === "stop" || method.toLowerCase() === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
			if (method.toLowerCase() === "set") {
				var pref = args[1];
				if(!pref) {
					message.channel.send(message.language.get("PREFIX_NULL")+"\n"+message.language.get("COMMAND_CANCEL"));
					pref = await message.bot.functions.awaitResponse(message);
				}
				if (pref.startsWith(message.prefix)) return;
				if (pref.toLowerCase() === "stop" || pref.toLowerCase() === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
				if (pref.length > 15) return message.channel.send(message.language.get("PREFIX_TOO_LONG", pref));
				mysqlcon.query("UPDATE Guilds SET prefix = ? WHERE guild_id = ?", [pref, message.guild.id]);
				return message.channel.send(message.language.get("PREFIX_CHANGE", pref));
			}
			if (method.toLowerCase() === "reset") {
				mysqlcon.query("UPDATE Guilds SET prefix = '.' WHERE guild_id = ?", [message.guild.id]);
				return message.channel.send(message.language.get("PREFIX_RESET"));
			}
		});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Prefix;
