const Command = require("../../base/Command.js"),
	{ version } = require("../../package.json");
const moment = require("moment");
require("moment-duration-format");

class Bot extends Command {
	constructor(client) {
		super(client, {
			name: "bot",
			description: (language) => language.get("BOT_DESCRIPTION"),
			usage: (language, prefix) => language.get("BOT_USAGE", prefix),
			examples: (language, prefix) => language.get("BOT_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: ["denver", "botinfo"],
			permLevel: "User",
			botPermissions: ["EMBED_LINKS"],
			cooldown: 1000,
		});
	}

	async run(message) {
		try {
			let users = message.bot.shard ? await message.bot.shard.broadcastEval("this.guilds.reduce((prev, guild) => prev + guild.memberCount, 0)") : message.bot.users.size;
			if (users instanceof Array) {
				users = users.reduce((sum, val) => sum + val, 0);
			}
			let guilds = message.bot.shard ? await message.bot.shard.broadcastEval("this.guilds.size") : message.bot.guilds.size;
			if (guilds instanceof Array) {
				guilds = guilds.reduce((sum, val) => sum + val, 0);
			}
			let channels = message.bot.shard ? await message.bot.shard.broadcastEval("this.channels.size") : message.bot.channels.size;
			if (channels instanceof Array) {
				channels = channels.reduce((sum, val) => sum + val, 0);
			}
			return message.channel.send({
				embed: {
					author : { name: message.bot.user.username, icon_url: message.bot.user.displayAvatarURL() },
					color: message.config.embed.color,
					fields: [
						{
							name: message.language.get("BOT_FIELDS")[0],
							value: message.language.get("BOT_FIELDS_CONTENT_GENERALINFO", message, version),
						},
						{
							name: message.language.get("BOT_FIELDS")[1],
							value: message.language.get("BOT_FIELDS_CONTENT_GENERALSTATS", guilds, users, channels),
						},
						{
							name: message.language.get("BOT_FIELDS")[2],
							value: message.language.get("BOT_FIELDS_CONTENT_OTHERINFO", process, moment, message),
						},
						{
							name: message.language.get("BOT_FIELDS")[3],
							value: message.language.get("BOT_FIELDS_CONTENT_LINKS"),
						},
					],
				},
			});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Bot;
