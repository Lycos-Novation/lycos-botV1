const Command = require("../../base/Command.js");

class Support extends Command {
	constructor(client) {
		super(client, {
			name: "support",
			description: (language) => language.get("SUPPORT_DESCRIPTION"),
			usage: (language, prefix) => language.get("SUPPORT_USAGE", prefix),
			examples: (language, prefix) => language.get("SUPPORT_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "User",
			botPermissions: ["EMBED_LINKS", "CREATE_INSTANT_INVITE"],
			nsfw: false,
			adminOnly: false,
			cooldown: 30000,
		});
	}

	async run(message, args) {
		try {
			if (args.join(" ").length < 10 || args.join(" ").length > 1900) {
				message.channel.send(message.language.get("SUPPORT_NO_ARGS"))
			}
			else {
				const question = args.join(" ");

				try {
					var sql = `INSERT INTO Supports (user_name, question, channel_id, created_at)
					VALUES ("${message.author.username}", "${question}", ${message.channel.id}, NOW());`;
           			mysqlcon.query(sql, function (err, result) {
						if (err) throw err;
            		});
				}
				catch (e) {
					return message.channel.send(message.language.get("ERROR", e));
				}
				sql = `SELECT id
				FROM Supports 
				WHERE user_name='${message.author.username}' && question="${question}" && channel_id='${message.channel.id}' && created_at=NOW();`;
				var support_id;
				mysqlcon.query(sql, function (err, result, fields) {
					if (err) throw err;
					support_id = result[0].id;
					});
				message.channel.createInvite().then(function(newInvite) {
					message.bot.shard.broadcastEval(`
						const Discord = require('discord.js');
						const channel = this.channels.cache.get("701360670532304927");

						const embed = new Discord.MessageEmbed()
							.setTitle("Support")
							.setColor("#36393F")
							.setAuthor(\`${message.author.username} | ${message.author.id}\`, \`${message.author.avatarURL({animated: true})}\`)
							.setDescription(\`${question.replace(/`/g, "\\`")}\nID de la demande : ${support_id}\nGuild: [${message.guild.name}](https://discord.gg/${newInvite.code})\`)
							.setFooter("Lycos")
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
				return message.channel.send(message.language.get("SUPPORT_QUESTION_SEND")).then(() => {
					message.delete();
				});
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Support;
