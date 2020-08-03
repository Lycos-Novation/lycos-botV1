const Command = require('../../base/Command');

class Unban extends Command {
    constructor(client) {
		super(client, {
			name: "unban",
			description: (language) => language.get("UNBAN_DESCRIPTION"),
			usage: (language, prefix) => language.get("UNBAN_USAGE", prefix),
			examples: (language, prefix) => language.get("UNBAN_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Server Moderator",
			botPermissions: ["SEND_MESSAGES", "BAN_MEMBERS"],
			nsfw: false,
			adminOnly: false,
			cooldown: 1000,
		});
    }
    
    async run(message, args){
        try {
            const searchArgs = args.slice(0).join(" ");
				if (!searchArgs) {
					return message.reply(`<:lycosX:631854509798326322> ${message.language.get("UNBAN_ERRORARGS")}`)
				}
				const guildBans = await message.guild.fetchBans();
				if (!guildBans.some((u) => u.user.id === searchArgs)) {
					return message.channel.send(message.language.get("UNBAN_NOT_BANNED"));
				}
				await message.guild.members.unban(searchArgs)
					.then(u => {
						message.channel.send(message.language.get("UNBAN_INFO", u.username, message));
						var sql = `SELECT prefix, autorole
		FROM Guilds
		WHERE guild_id="${message.guild.id}"`;
                        var g;
                        mysqlcon.query(sql, async function (err, result, fields) {
                            if (err) throw err;
                            g = result[0];
                            if (g.modlogs_channel) {
                                return message.guild.channels.chache.get(g.modlogs_channel).send({
                                    embed: {
                                        title: lang.get(`UNBAN_EMBED_TITLE`),
                                        description: lang.get('UNBAN_EMBED_DESC', member, message),
                                        footer: {
                                            text: config.embed.footer,
                                        },
                                        thumbnail: {
                                            url: member.user.displayAvatarURL({ format: "png", dynamic: true }),
                                        },
                                        color: 0xDB0808,
                                    }
                                })
                            } else {
                                return;
                            }
                        })
					})
					.catch((error) => message.channel.send(`<:lycosX:631854509798326322> ${message.author} ${message.language.get("UNBAN_ERROR")} ${error}`));
				return;
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}
module.exports = Unban;