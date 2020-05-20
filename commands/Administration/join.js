const Command = require("../../base/Command.js");

class Join extends Command {
	constructor(client) {
		super(client, {
			name: "join",
			description: (language) => language.get("SETJOIN_DESCRIPTION"),
			usage: (language, prefix) => language.get("SETJOIN_USAGE", prefix),
			examples: (language, prefix) => language.get("SETJOIN_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Server Admin",
			botPermissions: ["EMBED_LINKS"],
			aliases: ["setjoin", "welcome", "setwelcome"],
			nsfw: false,
			adminOnly: true,
			cooldown: 1000,
		});
	}

	async run(message, args) {
		try {
			var sql = `SELECT welcome_channel
					   FROM Guilds
					   WHERE guild_id="${message.guild.id}"`;
			var g;
			mysqlcon.query(sql, async function (err, result, fields) {
				g = result[0];
				var chan = args[0]
				if (!chan) {
					message.channel.send(message.language.get("SETJOIN_NO_ARGS", g));
					chan = await message.bot.functions.awaitResponse(message);
				}
				if (chan.startsWith(".")) return;
				let c = message.guild.channels.resolve(chan) || message.guild.channels.resolveID(chan);
				let cid = c.toString().slice(2, c.toString().length - 1) || c.id;
				if (isNaN(parseInt(cid)) || !message.guild.channels.cache.find(c => c.id === cid)) return message.channel.send(message.language.get("SETLOGS_ERROR_CHANNEL"));
				if (cid === g.welcome_channel) {
					return message.channel.send(message.language.get("SETJOIN_SAME", cid))
				}
				sql = `UPDATE Guilds 
				SET welcome_channel=${cid}
				WHERE guild_id="${message.guild.id}";`;
			mysqlcon.query(sql, async function (err, result, fields) {
			});
				return message.channel.send(message.language.get("SETJOIN_SUCCESS", cid));
			});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Join;
