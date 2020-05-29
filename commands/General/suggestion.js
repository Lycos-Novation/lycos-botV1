const Command = require("../../base/Command.js");

class Suggestion extends Command {
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
            botPermissions: [],
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
				message.bot.shard.broadcastEval(`
						const Discord = require('discord.js');
						const channel = this.channels.cache.get("627955885582581790");

						const embed = new Discord.MessageEmbed()
							.setTitle("Suggestion")
							.setColor("#36393F")
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
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Suggestion;
