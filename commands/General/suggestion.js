const Command = require("../../base/Command.js");

class LycosSuggestion extends Command {
	constructor(client) {
		super(client, {
			name: "suggestion",
			description: (language) => language.get("SUGGESTION_DESCRIPTION"),
			usage: (language, prefix) => language.get("SUGGESTION_USAGE", prefix),
			examples: (language, prefix) => language.get("SUGGESTION_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "User",
            botPermissions: ["SEND_MESSAGES"],
            aliases: ["suggestions", "suggest", "suggests"],
			nsfw: false,
			adminOnly: false,
			cooldown: 30000,
		});
	}

	async run(message, args) {
		try {
			if (args.join(" ").length < 10 || args.join(" ").length > 1900) {
				message.channel.send(message.language.get("SUGGESTION_NO_ARGS"))
			}
			else {

                const suggestion = args.join(" ");
                var sql = `SELECT *
		FROM Guilds
		WHERE guild_id="${message.guild.id}"`;
            var g;
            mysqlcon.query(sql, async function (err, result) {
                if (err) throw err;
                g = result[0];
                if (!g.suggestions_channel){
                    return message.channel.send(message.language.get("SUGGESTION_NOT_SET"))
                }
				message.bot.shard.broadcastEval(`
						const Discord = require('discord.js');
						const channel = this.channels.cache.get(\`${g.suggestions_channel}\`);

						const embed = new Discord.MessageEmbed()
							.setTitle("Suggestion")
							.setColor(0xffcc00&&0x2f3136)
							.setAuthor(\`${message.author.username} | ${message.author.id}\`, \`${message.author.avatarURL({animated: true})}\`)
							.setDescription(\`${suggestion.replace(/`/g, "\\`")}\`)
							.setFooter("Lycos")
							.setTimestamp();

						if (channel) {
							channel.send(embed).then(async(m) => {
							await m.react(this.emojis.cache.get("631854492173991947"));
							await m.react(this.emojis.cache.get("631854509798326322"));
						});
							true;
						}
						else {
							false;
						}
        			`);
				return message.channel.send(message.language.get("SUGGESTION_QUESTION_SEND")).then(() => {
					message.delete();
                });
            });
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = LycosSuggestion;
