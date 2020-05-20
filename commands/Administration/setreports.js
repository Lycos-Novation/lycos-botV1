const Command = require("../../base/Command.js");

class Setreports extends Command {
	constructor(client) {
		super(client, {
			name: "setreports",
			description: (language) => language.get("SETREPORTS_DESCRIPTION"),
			usage: (language, prefix) => language.get("SETREPORTS_USAGE", prefix),
			examples: (language, prefix) => language.get("SETREPORTS_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Server Admin",
            botPermissions: ["EMBED_LINKS"],
            aliases: [],
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
				var chan = args[0];
			if (!chan) {
				message.channel.send(message.language.get("SETREPORTS_NO_ARGS", g));
				chan = await message.bot.functions.awaitResponse(message);
			}
			if (chan.startsWith(".")) return;
			let c = message.guild.channels.resolve(chan) || message.guild.channels.resolveID(chan);
			let cid = c.toString().slice(2, c.toString().length -1) || c.id;
			if (isNaN(parseInt(cid)) || !message.guild.channels.cache.find(c => c.id === cid)) return message.channel.send(message.language.get("SETLOGS_ERROR_CHANNEL"));
            if (cid === g.reports_channel) {
                return message.channel.send(message.language.get("SETREPORTS_SAME", cid))
            }
            mysqlcon.query("UPDATE Guilds SET reports_channel = ? WHERE guild_id = ?", [cid, message.guild.id]);
			return message.channel.send(message.language.get("SETREPORTS_SUCCESS", cid));
		});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Setreports;
