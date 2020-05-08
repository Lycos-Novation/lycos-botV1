const Command = require("../../base/Command.js");

class Setnotif extends Command {
	constructor(client) {
		super(client, {
			name: "setnotif",
			description: (language) => language.get("SETNOTIF_DESCRIPTION"),
			usage: (language, prefix) => language.get("SETNOTIF_USAGE", prefix),
			examples: (language, prefix) => language.get("SETNOTIF _EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Server Admin",
            botPermissions: ["EMBED_LINKS"],
            aliases: ["setreactionrole", "setrolereaction"],
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
				message.channel.send(message.language.get("SETNOTIF_NO_ARGS", g));
				chan = await message.bot.functions.awaitResponse(message);
			}
			let c = message.guild.channels.resolve(chan) || message.guild.channels.resolveID(chan);
			let cid = c.toString().slice(2, c.toString().length -1) || c.id;
            if (cid === g.rolereaction_channel) {
                return message.channel.send(message.language.get("SETNOTIF_SAME", cid))
            }
            mysqlcon.query("UPDATE Guilds SET rolereaction_channel = ? WHERE guild_id = ?", [cid, message.guild.id]);
			return message.channel.send(message.language.get("SETNOTIF_SUCCESS", cid));
		});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Setnotif;
