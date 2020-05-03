const Command = require("../../base/Command.js");

class Answer extends Command {
	constructor(client) {
		super(client, {
			name: "answer",
			description: (language) => language.get("ANSWER_DESCRIPTION"),
			usage: (language, prefix) => language.get("ANSWER_USAGE", prefix),
			examples: (language, prefix) => language.get("ANSWER_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Bot Support",
			botPermissions: ["EMBED_LINKS"],
			nsfw: false,
			cooldown: 30000,
		});
	}

	async run(message, args) {
		try {
			if (isNaN(args[0])) return message.channel.send(message.language.get("ANSWER_UNKNOWN_ID", args[0]));
			var sql = `SELECT id, channel_id
			FROM Supports 
			WHERE id='${args[0]}';`;
			var support_id;
			var c_id;
			try {
				mysqlcon.query(sql, function (err, result, fields) {
					if (err) throw err;
					support_id = result[0].id;
					c_id = result[0].channel_id;
				});
			} catch (error) {
				return message.channel.send(error)
			}
			message.channel.createInvite().then(function (newInvite) {
				message.bot.shard.broadcastEval(`
						const Discord = require('discord.js');
						const channel = this.channels.cache.get(\`${c_id}\`);

						const embed = new Discord.MessageEmbed()
							.setTitle("Support Answer")
							.setColor("#36393F")
							.setAuthor(\`${message.author.username} | ${message.author.id}\`, \`${message.author.avatarURL()}\`)
							.setDescription("${message.content.split(" ").slice(2).join(" ")}")
							.setFooter(\`Answer to the support ID ${support_id}\`)
							.setTimestamp();
	
						if (channel) {
							channel.send(embed)
							true;
						}
						else {
							false;
						}
        			`)
			});
			return message.channel.send(message.language.get("ANSWER_SENT")).then(() => {
				message.delete();
				sql = `DELETE FROM Supports 
			WHERE id='${args[0]}';`;
				mysqlcon.query(sql, function (err) {
					if (err) throw err;
				});
			})
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Answer;
