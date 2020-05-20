const Command = require('../../base/Command');

class Autorole extends Command {
    constructor(client) {
        super(client, {
            name: 'autorole',
            description: (language) => language.get("AUTOROLE_DESCRIPTION"),
            usage: (language, prefix) => language.get("AUTOROLE_USAGE", prefix),
            examples: (language, prefix) => language.get("AUTOROLE_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "Server Admin",
            botPermissions: ["SEND_MESSAGES", "MANAGE_ROLES"],
            aliases: [],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000
        });
    }

    async run(message, args) {
        try {
            var sql = `SELECT prefix, autorole
		FROM Guilds
		WHERE guild_id="${message.guild.id}"`;
            var g;
            mysqlcon.query(sql, async function (err, result, fields) {
                if (err) throw err;
                g = result[0];
                var method = args[0];
                var ar = result[0].autorole, ids = [];
                if (!method) {
                    await message.channel.send(message.language.get("AUTOROLE_SUPPLY_METHOD"));
                    method = await message.bot.functions.awaitResponse(message);
                }
                if (method.startsWith(".")) return;
                if (method !== "add" && method !== "remove") return message.channel.send(message.language.get("AUTOROLE_BAD_METHOD", g));
                var role_supplied = args.slice(1).join(" ");
                if (!role_supplied) {
                    await message.channel.send(message.language.get("AUTOROLE_SUPPLY_ROLE"));
                    role_supplied = await message.bot.functions.awaitResponse(message);
                }
                if (role_supplied.startsWith(".")) return;
                let r = message.guild.roles.resolve(role_supplied) || message.guild.roles.resolveID(role_supplied);
                let rid = r.id || r.toString().slice(3, r.toString().length - 1);
                if (!rid || isNaN(parseInt(rid))) return message.channel.send(message.language.get("AUTOROLE_ROLE_NOT_FOUND"));
                if (method === 'add') {
                    if (ar.includes(rid)) return message.channel.send(message.language.get("AUTOROLE_ALREADY_IN"));
                    if (ar.split("/").length === 5) return message.channel.send(message.language.get("AUTOROLE_LIMIT"));
                    if (ar.split("/").length > 1 || ar !== "") {
                        mysqlcon.query("UPDATE Guilds SET autorole = ? WHERE guild_id = ?", [result[0].autorole + "/" + rid, message.guild.id]);
                        return message.channel.send(message.language.get("AUTOROLE_ROLE_ADDED", rid));
                    } else {
                        mysqlcon.query("UPDATE Guilds SET autorole = ? WHERE guild_id = ?", [result[0].autorole + rid, message.guild.id]);
                        return message.channel.send(message.language.get("AUTOROLE_ROLE_ADDED", rid));
                    }
                } else if (method === "remove") {
                    if (!ar.includes(rid)) {
                        return message.channel.send(message.language.get("AUTOROLE_NOT_IN"));
                    }
                    if (ar.split("/").length > 1) {
                        for (var i = 0; i < ar.split("/").length; i++) {
                            if (ar.split("/")[i] !== rid) {
                                ids.push(ar.split("/")[i])
                            }
                        }
                        let envoi = ids.join("/");
                        mysqlcon.query(`UPDATE Guilds SET autorole = ? WHERE guild_id = ?`, [envoi, message.guild.id]);
                        return message.channel.send(message.language.get("AUTOROLE_ROLE_REMOVED", rid));
                    }
                } else {
                    return message.channel.send(message.language.get("AUTOROLE_BAD_REASON", g))
                }
            });
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}
module.exports = Autorole;