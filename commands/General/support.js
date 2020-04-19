const Command = require("../../base/Command.js");
const snowflakeID = require("flakeid");

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
				const questionID = new snowflakeID({
					mid : 42,
					timeOffset : (2019 - 1970) * 31536000 * 1000,
				});
				const ID = questionID.gen();

				message.channel.createInvite().then(function(newInvite) {
					message.bot.shard.broadcastEval(`
						const Discord = require('discord.js');
						const channel = this.channels.cache.get("701360670532304927");

						const embed = new Discord.MessageEmbed()
							.setTitle("Support")
							.setColor("#36393F")
							.setAuthor(\`${message.author.username} | ${message.author.id}\`, \`${message.author.avatarURL({animated: true})}\`)
							.setDescription(\`${question.replace(/`/g, "\\`")}\nID: ${ID}\nGuild: [${message.guild.name}](https://discord.gg/${newInvite.code})\`)
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

				try {
					const newSupport = {
						id: ID,
						username: message.author.username,
						question: question,
						channelID: message.channel.id
					}
					await message.bot.functions.createSupport(newSupport);
					return message.channel.send(message.language.get("SUPPORT_QUESTION_SEND"));
				}
				catch (e) {
					return message.channel.send(message.language.get("ERROR", e));
				}
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Support;
