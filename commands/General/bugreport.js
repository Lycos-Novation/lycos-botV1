const Command = require("../../base/Command.js");

class bugReport extends Command {
    constructor(client) {
        super(client, {
            name: "bugreport",
            description: (language) => language.get("BUGREPORT_DESCRIPTION"),
            usage: (language, prefix) => language.get("BUGREPORT_USAGE", prefix),
            examples: (language, prefix) => language.get("BUGREPORT_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "User",
            botPermissions: [],
            aliases: ["br", "bugsreport", "bugsreports", "bugreports", "bugs", "bug"],
            nsfw: false,
            adminOnly: false,
            cooldown: 30000,
        });
    }
    async run(message, args) {
        try {
            if (args.join(" ").length < 10 || args.join(" ").length > 1900) {
                message.channel.send(message.language.get("BUGREPORT_NO_ARGS"))
            } else {
                const report = args.join(" ");
                message.bot.shard.broadcastEval(`
						const Discord = require('discord.js');
						const channel = this.channels.cache.get("629042318774632478");

						const embed = new Discord.MessageEmbed()
							.setTitle("Bug report")
							.setColor(0xffcc00&&0x2f3136)
							.setAuthor(\`${message.author.username} | ${message.author.id}\`, \`${message.author.avatarURL({ animated: true })}\`)
							.setDescription(\`${report.replace(/`/g, "\\`")}\`)
							.setFooter("Lycos")
							.setTimestamp();

						if (channel) {
                            channel.send(embed)
							true;
						} else {
							false;
						}
        			`);
                return message.channel.send(message.language.get("BUGREPORT_REPORT_SEND"))
                .then(() => {
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

module.exports = bugReport;
