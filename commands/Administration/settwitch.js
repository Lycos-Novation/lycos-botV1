const Command = require("../../base/Command.js");

class SetTwitch extends Command {
	constructor(client) {
		super(client, {
			name: "settwitch",
			description: (language) => language.get("SETTWITCH_DESCRIPTION"),
			usage: (language, prefix) => language.get("SETTWITCH_USAGE", prefix),
			examples: (language, prefix) => language.get("SETTWITCH_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Server Admin",
            botPermissions: ["EMBED_LINKS"],
            aliases: ["set-twitch"],
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
				var toModify = args[0];
				if (!toModify) {
					message.channel.send(message.language.get("SETTWITCH_NO_MODIFY")+"\n"+message.language.get("COMMAND_CANCEL"));
					toModify = await message.bot.functions.awaitResponse(message);
				}
				if (toModify.startsWith(g.prefix)) return;
				if (toModify.toLowerCase() === "stop" || toModify.toLowerCase() === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
				if (toModify.toLowerCase() !== "channel" && toModify.toLowerCase() !== "message") return message.channel.send(message.language.get("SETTWITCH_BAD_MODIFY"));
				if (toModify.toLowerCase() === "channel"){
					var chan = args[1];
					if (!chan) {
						message.channel.send(message.language.get("SETTWITCH_NO_ARGS", g)+"\n"+message.language.get("COMMAND_CANCEL"));
						chan = await message.bot.functions.awaitResponse(message);
					}
					if (chan.startsWith(g.prefix)) return;
					if (chan.toLowerCase() === "stop" || chan.toLowerCase() === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
					if (chan === "stop" || chan === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
					let c = message.guild.channels.resolve(chan) || message.guild.channels.resolveID(chan);
					let cid = c.toString().slice(2, c.toString().length -1) || c.id;
					if (isNaN(parseInt(cid)) || !message.guild.channels.cache.find(c => c.id === cid)) return message.channel.send(message.language.get("SETLOGS_ERROR_CHANNEL"));
					if (message.guild.channels.cache.get(`${cid}`).type !== "text") return message.channel.send(message.language.get("SETREPORTS_NOT_TEXT"));
					if (cid === g.twitch_channel) {
						return message.channel.send(message.language.get("SETTWITCH_SAME", cid))
					}
					mysqlcon.query("UPDATE Guilds SET twitch_channel = ? WHERE guild_id = ?", [cid, message.guild.id]);
					return message.channel.send(message.language.get("SETTWITCH_SUCCESS", cid));
				} else if (toModify.toLowerCase() === "message"){
					var annonce = args.slice(1).join(" ");
					if (!annonce) {
						message.channel.send(message.language.get("SETTWITCH_NO_MSG")+"\n"+message.language.get("COMMAND_CANCEL"));
						chan = await message.bot.functions.awaitResponse(message);
					}
					if (annonce.startsWith(g.prefix)) return;
					if (annonce.toLowerCase() === "stop" || annonce.toLowerCase() === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
					if (annonce.length > 1500 || annonce.length < 1) return message.channel.send(message.language.get("SETTWTICH_MSG_LENGTH"));
					if (annonce === g.stream_annonce) {
						return message.channel.send(message.language.get("SETTWITCH_SAME_MSG"));
					}
					mysqlcon.query("UPDATE Guilds SET stream_annonce = ? WHERE guild_id = ?", [annonce, message.guild.id]);
					return message.channel.send(message.language.get("SETTWITCH_NEW_MSG", annonce));
				} else {
					return message.channel.send(message.language.get("SETTWITCH_ERROR_MODIFY"));
				}
		});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = SetTwitch;
