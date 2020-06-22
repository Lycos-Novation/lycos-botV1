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
                if (message.guild.channels.cache.size === 500) return message.channel.send(message.language.get("MEMBERCOUNT_TOO_MUCH_CHANNELS"));
                if (!method) {
                    message.channel.send(message.language.get("MEMBERCOUNT_NO_METHOD")+"\n"+message.language.get("COMMAND_CANCEL"));
                    method = await message.bot.functions.awaitResponse(message)
                }
                if (method.startsWith(message.prefix)) return;
			    if (method.toLowerCase() === "stop" || method.toLowerCase() === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
                let salon = g.membercount_channel === null ? null : message.guild.channels.cache.get(g.membercount_channel);
                var mc;
                var name = args.slice(1).join(" ");
                if (name.indexOf("{membercount}") !== -1){
                    name = name.replace("{membercount}", message.guild.memberCount);
                } else {
                    name = `${message.guild.name} | ${message.guild.memberCount} ${message.language.get("MEMBERCOUNT_MEMBERS")}`;
                }
                if (method.toLowerCase() === "category") {
                    if (salon) {
                        salon.delete("Membercount")
                            .then()
                            .catch(console.error);
                    }
                    await message.guild.channels.create(name, {
                        type: 'category',
                        reason: "Membercount"
                    })
                        .then(c => {
                            message.guild.channels.cache.get(c.id).setPosition(0);
                            message.channel.send(message.language.get("MEMBERCOUNT_CREATED"));
                            mc = c.id;
                        })
                        .catch(console.error)
                } else if (method.toLowerCase() === "channel") {
                    if (salon) {
                        salon.delete("Membercount")
                            .then()
                            .catch(console.error);
                    }
                    await message.guild.channels.create(name, {
                        type: 'voice',
                        position: 0,
                        reason: "Membercount"
                    })
                        .then(c => {
                            message.channel.send(message.language.get("MEMBERCOUNT_CREATED"));
                            mc = c.id;
                        })
                        .catch(console.error)
                } else if (method.toLowerCase() === "delete") {
                    if (salon) {
                        salon.delete("Membercount")
                            .then(mc = null)
                            .catch(console.error);
                            message.channel.send(message.language.get("MEMBERCOUNT_DELETED"))
                    } else {
                        return message.channel.send(message.language.get("MEMBERCOUNT_NOT_EXISTS"))
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