const Command = require("../../base/Command.js");
const ms = require('ms');
Discord = require("discord.js");
class Number extends Command {
	constructor(client) {
		super(client, {
			name: "number",
			description: (language) => language.get("NUMBER_DESCRIPTION"),
			usage: (language, prefix) => language.get("NUMBER_USAGE", prefix),
			examples: (language, prefix) => language.get("NUMBER_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Server Moderator",
			botPermissions: ["SEND_MESSAGES"],
			aliases: ["bingo"],
			nsfw: false,
			adminOnly: false,
			cooldown: 2000,
		});
	}

	run(message, args) {
		try {
			var min = parseInt(args[0], 10);
			if (!min) return message.channel.send(message.language.get("NUMBER_MIN"));
			var max = parseInt(args[1], 10);
			if (!max) return message.channel.send(message.language.get("NUMBER_MAX"));
			if (min >= max) return message.channel.send(message.language.get("NUMBER_MIN_LOWER"));
			let time = parseInt(args[2], 10);
			if (!time) return message.channel.send(message.language.get("NUMBER_TIME"));
			let toFind = parseInt((Math.random() * (max - min) + min), 10);
			message.author.send(message.language.get("NUMBER_ANSWER", toFind));
			message.channel.send(message.language.get("NUMBER_START", min, max, time))
				.then(msg => {
					let collector = new Discord.MessageCollector(message.channel, (m) => !m.author.bot, {
						time: ms(time)
					});
					collector.on('collect', async (m) => {
						if (isNaN(m.content)) return;
						/*message.channel.send({
							content: m,
							split: true
						});*/
						if (parseInt(m.content) < min || parseInt(m.content) > max) return m.reply(message.language.get("NUMBER_INTERVAL", min, max));
						if (parseInt(m.content) < toFind) return m.reply(message.language.get("NUMBET_HIGHER"));
						if (parseInt(m.content) > toFind) return m.reply(message.language.get("NUMBER_LOWER"));
						if (parseInt(m.content) === toFind) {
							message.channel.send(message.language.get("NUMBER_WINNER", m.author));
							return collector.stop();
						}
					});
					collector.on('end', collected => message.channel.send(message.language.get("NUMBER_END", collected)));
				});

		} catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Number;
