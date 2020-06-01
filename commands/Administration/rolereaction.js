const Command = require("../../base/Command.js");

class RoleReaction extends Command {
    constructor(client) {
        super(client, {
            name: "rolereaction",
            description: (language) => language.get("RR_DESCRIPTION"),
            usage: (language, prefix) => language.get("RR_USAGE", prefix),
            examples: (language, prefix) => language.get("RR_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "Server Admin",
            botPermissions: ["EMBED_LINKS", "MANAGE_ROLES", "SEND_MESSAGES", "ADD_REACTIONS", "USE_EXTERNAL_EMOJIS"],
            aliases: ["rr", "reactionrole", "rreaction", "role-reaction", "reaction-role"],
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
                var rrr = g.rolereaction_roles;
                var rre = `${g.rolereaction_emotes}`;
                var rrd = g.rolereaction_descs;
                var method = args[0];
                if (!method) {
                    message.channel.send(message.language.get("RR_SUPPLY_METHOD"));
                    method = await message.bot.functions.awaitResponse(message);
                }
                if (method === "launch") {
                    if (rrr === "" || rre === "" || rrd === "") return message.channel.send(message.language.get("RR_EMPTY"));
                    if (rrr.indexOf("/") !== -1 && rre.indexOf("/") !== -1 && rrd.indexOf("/") !== -1) {
                        rrr = rrr.split("/");
                        rre = rre.split("/");
                        rrd = rrd.split("/");
                        var set = {
                            roles: rrr,
                            emotes: rre,
                            descs: rrd,
                        };
                    } else {
                        set = {
                            roles: [rrr],
                            emotes: [rre],
                            descs: [rrd],
                        };
                    }

                    if (set.roles.length <= 1) {
                        var configuration = [{
                            role: rrr,
                            emoji: rre,
                            desc: rrd,
                        }];
                    } else {
                        configuration = set.roles.map((role, emote) => {
                            return {
                                role: role,
                                emoji: set.emotes[emote],
                                desc: set.descs[emote],
                            };
                        });
                    }
                    var descr = "";
                    for (const { role, emoji, desc } of configuration) {
                        if (!message.guild.roles.cache.find((r) => r.id === role)) return message.channel.send(`The role \`${role}\` doesn't exist.`);

                        const guildEmoji = message.bot.emojis.cache.find((emote) => emote.id === emoji.slice(emoji.length - 19, emoji.length - 1));
                        descr = descr + `${guildEmoji !== undefined ? guildEmoji : emoji} **• ${message.guild.roles.cache.get(role).name}** - ${desc}\n`;
                    }
                    const embed = {
                        embed: {
                            title: message.language.get("RR_EMBED_TITLE"),
                            description: message.language.get("RR_EMBED_DESC"),
                            color: 6841599,
                            footer: {
                                text: message.language.get("RR_EMBED_FOOTER"),
                            },
                            fields: [
                                {
                                    name: message.language.get("RR_EMBED_FIELD"),
                                    value: descr,
                                },
                            ]
                        }
                    };
                    if (!g.rolereaction_channel) return message.channel.send(message.language.get("RR_NO_CHANNEL"));
                    return message.guild.channels.cache.get(g.rolereaction_channel).send(embed).then(async (msg) => {
                        try {
                            for (const { emoji } of configuration) {
                                const guildEmoji = message.bot.emojis.cache.find((emote) => emote.id === emoji.slice(emoji.length - 19, emoji.length - 1));
                                if (guildEmoji === undefined) await msg.react(`${emoji}`);
                                else await msg.react(guildEmoji.id);
                            }
                        } catch (error) {
                            console.error(error);
                            return message.channel.send(message.language.get("ERROR", error));
                        }

                    });
                }
                if (method !== "add" && method !== "remove") return message.channel.send(message.language.get("RR_BAD_METHOD", g));
                var e = args[1];
                if (!e) {
                    message.channel.send(message.language.get("RR_SUPPLY_EMOTE"));
                    e = await message.bot.functions.awaitResponse(message);
                }
                var name = args[2];
                if (!name) {
                    message.channel.send(message.language.get("RR_SUPPLY_NAME"))
                    name = await message.bot.functions.awaitResponse(message);
                }
                let r = message.guild.roles.resolve(name) || message.guild.roles.resolveID(name);
                let test = message.guild.roles.cache.get(r);
				if (test === undefined) return message.channel.send(message.language.get("AUTOROLE_ROLE_NOT_FOUND"));
                let rid = r.id || r.toString().slice(3, r.toString().length - 1);
                var rr = result[0].rolereaction_roles, ids = [];
                var re = result[0].rolereaction_emotes;
                if (method === "add") {
                    var description = args.slice(3).join(" ");
                    if (!description) {
                        message.channel.send(message.language.get("RR_SUPPLY_DESCRIPTION"));
                        description = await message.bot.functions.awaitResponse(message);
                    }
                    if (description.indexOf("/") !== -1) return message.channel.send(message.language.get("RR_ERROR_DESC"));
                    if (re.includes(e) === true) return message.channel.send(message.language.get("RR_EMOTE_ALREADY_IN"));
                    if (rr.includes(rid) === true) return message.channel.send(message.language.get("RR_ROLE_ALREADY_IN"));
                    if (rr.split("/").length === 30) return message.channel.send(message.language.get("RR_LIMIT"));
                    if (rr.split("/").length > 1 || rr !== "") {
                        mysqlcon.query("UPDATE Guilds SET rolereaction_emotes = ?, rolereaction_roles = ?, rolereaction_descs = ? WHERE guild_id = ?", [result[0].rolereaction_emotes + "/" + e, result[0].rolereaction_roles + "/" + rid, result[0].rolereaction_descs + "/" + description, message.guild.id]);
                    } else {
                        mysqlcon.query("UPDATE Guilds SET rolereaction_emotes = ?, rolereaction_roles = ?, rolereaction_descs = ? WHERE guild_id = ?", [e, rid, description, message.guild.id]);
                    }
                    return message.channel.send(message.language.get("RR_ROLE_ADDED"));
                } else if (method === "remove") {
                    if (!re.includes(e) || !rr.includes(rid)) {
                        return message.channel.send(message.language.get("RR_NOT_IN"));
                    }
                    if (rr.split("/").length > 1) {
                        for (var i = 0; i < rr.split("/").length; i++) {
                            if (rr.split("/")[i] !== rid) {
                                ids.push(rr.split("/")[i])
                            }
                        }
                        ids.join("/");
                        mysqlcon.query("UPDATE Guilds SET rolereaction_roles = ? WHERE guild_id = ?", [ids, message.guild.id]);

                        ids = [];
                        var ids2 = [];

                        for (var i = 0; i < re.toString('utf-8').split("/").length; i++) {
                            if (re.toString('utf-8').split("/")[i] !== e) {
                                ids.push(re.toString('utf-8').split("/")[i])
                                ids2.push(result[0].rolereaction_descs.split("/")[i]);
                            }
                        }
                        ids.join("/");
                        ids2.join("/");
                        mysqlcon.query("UPDATE Guilds SET rolereaction_emotes = ?, rolereaction_descs = ? WHERE guild_id = ?", [ids, ids2, message.guild.id]);
                    } else {
                        mysqlcon.query("UPDATE Guilds SET rolereaction_roles = ?, rolereaction_emotes = ?, rolereaction_descs = ? WHERE guild_id = ?", ["", "", "", message.guild.id]);
                    }
                    return message.channel.send(message.language.get("RR_ROLE_REMOVED"));
                } else {
                    return message.channel.send(message.language.get("RR_BAD_METHOD", g));
                }
            });
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }

    }
}

module.exports = RoleReaction;