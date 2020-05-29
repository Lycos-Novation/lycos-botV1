const Command = require('../../base/Command');

class Config extends Command {
    constructor(client) {
        super(client, {
            name: 'config',
            description: (language) => language.get("CONFIG_DESCRIPTION"),
            usage: (language, prefix) => language.get("CONFIG_USAGE", prefix),
            examples: (language, prefix) => language.get("CONFIG_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "Server Admin",
            botPermissions: ["SEND_MESSAGES"],
            aliases: ["server-config", "configuration"],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000
        });
    }

    async run(message, args) {
        try {
            var sql = `SELECT *
		FROM Guilds
		WHERE guild_id="${message.guild.id}"`;
            var g;
            mysqlcon.query(sql, async function (err, result, fields) {
                if (err) throw err;
                g = result[0];
                let ar = result[0].autorole;
                var autorole = "";
                if (ar.split("/").length > 1) {
                    autorole = "<@&" + ar.split("/")[0] + ">";
                    for (var i = 0; i < ar.split("/").length; i++) {
                        autorole = autorole + ", <@&" + ar.split("/")[i] + ">";
                    }
                } else if (ar) {
                    autorole = `<@&${ar}>`
                } else {
                    autorole = "Aucun rôle"
                }
                return message.channel.send({
                    embed: {
                        author: {
                            name: message.bot.user.username,
                            icon_url: message.bot.user.displayAvatarURL({ format: "png", dynamic: true })
                        },
                        title: message.language.get("CONFIG_TITLE", g),
                        fields: [
                            {
                                name: message.language.get("CONFIG_FIELDS")[0],
                                value: g.language,
                                inline: true
                            },
                            {
                                name: message.language.get("CONFIG_FIELDS")[1],
                                value: g.prefix,
                                inline: true
                            },
                            {
                                name: message.language.get("CONFIG_FIELDS")[2],
                                value: autorole
                            },
                            {
                                name: message.language.get("CONFIG_FIELDS")[3],
                                value: message.language.get("CONFIG_VALUES", g)[0],
                                inline: true
                            },
                            {
                                name: message.language.get("CONFIG_FIELDS")[4],
                                value: message.language.get("CONFIG_VALUES", g)[1],
                                inline: true
                            },
                            {
                                name: message.language.get("CONFIG_FIELDS")[5],
                                value: message.language.get("CONFIG_VALUES", g)[2],
                                inline: true
                            },
                            {
                                name: message.language.get("CONFIG_FIELDS")[6],
                                value: message.language.get("CONFIG_VALUES", g)[3],
                                inline: true
                            },
                            {
                                name: message.language.get("CONFIG_FIELDS")[7],
                                value: message.language.get("CONFIG_VALUES", g)[4],
                                inline: true
                            },
                        ],
                        color: message.config.embed.color,
                        thumbnail: {
                            url: message.guild.iconURL({ format: "png", dynamic: true }),
                        },
                    },
                })
            });
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}
module.exports = Config;