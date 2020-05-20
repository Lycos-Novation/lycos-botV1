const Command = require("../../base/Command.js");

class memberCount extends Command {
    constructor(client) {
        super(client, {
            name: "membercount",
            description: (language) => language.get("MEMBERCOUNT_DESCRIPTION"),
            usage: (language, prefix) => language.get("MEMBERCOUNT_USAGE", prefix),
            examples: (language, prefix) => language.get("MEMBERCOUNT_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildonly: true,
            permLevel: "Server Admin",
            botPermissions: ["MANAGE_CHANNELS"],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000,
        });
    }

    async run(message, args) {
        try {
            var sql = `SELECT *
        FROM Guilds
        WHERE guild_id="${message.guild.id}"`;
            var g;
            mysqlcon.query(sql, async function (err, result, fields) {
                g = result[0];
                var method = args[0];

                if (!method) {
                    message.channel.send(message.language.get("MEMBERCOUNT_NO_METHOD"));
                    method = await message.bot.functions.awaitResponse(message)
                }
                let salon = g.membercount_channel === null ? null : message.guild.channels.cache.get(g.membercount_channel);
                var mc;
                if (method === "category") {
                    if (salon) {
                        salon.delete("Membercount")
                            .then()
                            .catch(console.error);
                    }
                    await message.guild.channels.create(`${message.guild.memberCount} ${message.language.get("MEMBERCOUNT_MEMBERS")}`, {
                        type: 'category',
                        reason: "Membercount"
                    })
                        .then(c => {
                            message.guild.channels.cache.get(c.id).setPosition(0);
                            message.channel.send(message.language.get("MEMBERCOUNT_CREATED"));
                            mc = c.id;
                        })
                        .catch(console.error)
                } else if (method === "channel") {
                    if (salon) {
                        salon.delete("Membercount")
                            .then()
                            .catch(console.error);
                    }
                    await message.guild.channels.create(`${message.guild.memberCount} ${message.language.get("MEMBERCOUNT_MEMBERS")}`, {
                        type: 'voice',
                        position: 0,
                        reason: "Membercount"
                    })
                        .then(c => {
                            message.channel.send(message.language.get("MEMBERCOUNT_CREATED"));
                            mc = c.id;
                        })
                        .catch(console.error)
                } else if (method === "delete") {
                    if (salon) {
                        salon.delete("Membercount")
                            .then(mc = null)
                            .catch(console.error);
                            message.channel.send(message.language.get("MEMBERCOUNT_DELETED"))
                    } else {
                        return message.channel.send(message.channel.get("MEMBERCOUNT_NOT_EXISTS"))
                    }
                } else {
                    return message.channel.send(message.language.get("MEMBERCOUNT_UNVALID_METHOD"))
                }
                return mysqlcon.query("UPDATE Guilds SET membercount_channel = ? WHERE guild_id = ?", [mc, message.guild.id]);

            });
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error))
        }
    }
}

module.exports = memberCount;