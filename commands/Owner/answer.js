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
			const support = await message.bot.functions.getSupport(args[0]);
			if (support === false) {
				return message.channel.send(message.language("ANSWER_UNKNOWN_ID"))
			}
			else {
				message.bot.shard.broadcastEval(`
						const Discord = require('discord.js');
						const channel = this.channels.cache.get("${support.channelID}");
	
						const embed = new Discord.MessageEmbed()
							.setTitle("Support Answer")
							.setColor("#36393F")
							.setAuthor(\`${message.author.username} | ${message.author.id}\`, \`${message.author.avatarURL()}\`)
							.setDescription("${message.content.split(" ").slice(2).join(" ")}")
							.setFooter("Answer to the support ID ${support.id}")
							.setTimestamp();
	
						if (channel) {
							channel.send(embed)
							true;
						}
						else {
							false;
						}
					`);
				return message.channel.send(message.language.get("ANSWER_SENT", support)).then(() =>{
					message.delete();
					message.bot.functions.deleteSupport(args[0])
				})
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Answer;
