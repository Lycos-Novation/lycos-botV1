const Command = require("../../base/Command.js");
const moment = require("moment")
const { Collection } = require("discord.js")
class Chrono extends Command {
	constructor(client) {
		super(client, {
			name: "chrono",
			description: (language) => language.get("CHRONO_DESCRIPTION"),
			usage: (language, prefix) => language.get("CHRONO_USAGE", prefix),
			examples: (language, prefix) => language.get("CHRONO_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			permLevel: "User",
			botPermissions: ["SEND_MESSAGES"],
			aliases: ["stopwatch"],
			nsfw: false,
			adminOnly: false,
			cooldown: 2000,
		});
	}

	async run(message, args) {
		try {
            const method = args[0];
            if(!method) return message.channel.send(message.language.get("CHRONO_METHODS"))
            if (method.toLowerCase() !== "start" && method.toLowerCase() !== "stop") return message.channel.send(message.language.get("CHRONO_METHODS"));
            if (method.toLowerCase() === "start"){
                if (!message.bot.chronos.has(message.guild.id)){
                    message.bot.chronos.set(message.guild.id, new Collection());
                }
    
                const start = moment();
                const timestamps = message.bot.chronos.get(message.guild.id);
    
                if (timestamps.has(message.author.id)){
                    return message.channel.send(message.language.get("CHRONO_RUNNING"))
                }
                timestamps.set(message.author.id, start);
                return message.channel.send(message.language.get("CHRONO_STARTED"))
            }
            if (method.toLowerCase() === "stop"){
                if (!message.bot.chronos.has(message.guild.id)){
                    message.bot.chronos.set(message.guild.id, new Collection());
                }
    
                const stop = moment();
                const timestamps = message.bot.chronos.get(message.guild.id);
    
                if (!timestamps.has(message.author.id)){
                    return message.channel.send(message.language.get("CHRONO_NOT_RUNNING"))
                }
                const start = timestamps.get(message.author.id)
                timestamps.delete(message.author.id)
                const duration = stop.diff(start);
                const result = (stop.diff(start) >= 3600000 ? moment(duration).format('H:mm:ss:SSS') : moment(duration).format('m:ss:SSS'))
                return message.channel.send(message.language.get("CHRONO_STOPPED", result))
            }
		} catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Chrono;
