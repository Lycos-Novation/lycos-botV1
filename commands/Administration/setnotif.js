const Command = require("../../base/Command.js");

class Setnotif extends Command {
	constructor(client) {
		super(client, {
			name: "setnotif",
			description: (language) => language.get("PREFIX_DESCRIPTION"),
			usage: (language, prefix) => language.get("PREFIX_USAGE", prefix),
			examples: (language, prefix) => language.get("PREFIX_EXAMPLES", prefix),
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
			if (!args[0]) {
				return message.channel.send(message.language.get("SETNOTIF_NO_ARGS", g));
			}
			let c = message.guild.channels.resolve(args[0]) || message.guild.channels.resolveID(args[0]);
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
