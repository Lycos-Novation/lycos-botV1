const Command = require("../../base/Command.js");

class Leave extends Command {
	constructor(client) {
		super(client, {
			name: "setleave",
			description: (language) => language.get("SETLEAVE_DESCRIPTION"),
			usage: (language, prefix) => language.get("SETLEAVE_USAGE", prefix),
			examples: (language, prefix) => language.get("SETLEAVE_EXAMPLES", prefix),
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
				message.channel.send(message.language.get("SETLEAVE_SUPPLY", g));
				chan = await message.bot.functions.awaitResponse(message);
			}
			let c = message.guild.channels.resolve(chan) || message.guild.channels.resolveID(chan);
			let cid = c.toString().slice(2, c.toString().length -1) || c.id;
            if (cid === g.leave_channel) {
                return message.channel.send(message.language.get("SETLEAVE_SAME", cid))
            }
            sql = `UPDATE Guilds 
				SET leave_channel=${cid}
				WHERE guild_id="${message.guild.id}";`;
			mysqlcon.query(sql, async function (err, result, fields) {
			});
			return message.channel.send(message.language.get("SETLEAVE_SUCCESS", cid));
		});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Leave;
