const Command = require("../../base/Command.js");

class unmute extends Command {
    constructor(client) {
        super(client, {
            name: "unmute",
            description: (language) => language.get("UNMUTE_DESCRIPTION"),
            usage: (language, prefix) => language.get("UNMUTE_USAGE", prefix),
            examples: (language, prefix) => language.get("UNMUTE_EXAMPLE", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "Server Moderator",
            botPermissions: ["MANAGE_ROLES", "SEND_MESSAGES"],
            nsfw: false,
            adminOnly: false,
            cooldown: 1000,
        });
    }

    async run(message, args) {
        try {
            const searchArgs = args.join(" ");
            if (!searchArgs) {
                return message.channel.send(`<:lycosX:631854509798326322> ${message.language.get("MUTE_ERRORARGS")}`)
            } else {
                let member;
                if (message.mentions.members.size > 0) {
                    member = message.mentions.members.first();
                } else if (searchArgs) {
                    member = message.bot.functions.fetchMembers(message.guild, searchArgs);
                    if (member.size === 0) return message.channel.send(message.language.get("ERROR_NOUSER_FOUND"));
                    else if (member.size === 1) member = member.first();
                    else return message.channel.send(message.language.get("ERROR_MUCH_USER_FOUND"));
                }
                let muteRole = message.guild.roles.cache.find(m => m.name === 'muted');
                if(!muteRole){
                    await message.guild.roles.create({
                        data: {
                            name: 'muted',
                            color: "BLACK",
                            permissions: 0
                        },
                        reason: "Unmute - Auto create role"
                    }).catch(message.language.get("ERROR_CREATING_ROLE"));
                    muteRole = message.guild.roles.cache.find(m => m.name === 'muted')

                    message.guild.channels.cache.forEach(async (channel, id) => {
                        await channel.createOverwrite(muteRole.id,
                                {
                                    SEND_MESSAGES: false,
                                    ADD_REACTIONS: false,
                                    SEND_TTS_MESSAGES: false, 
                                    ATTACH_FILES: false,
                                    SPEAK: false
                            }, "Unmute - Auto setting up mute role")
                    });
                }
                if (!member.roles.cache.some(r => r.name === 'muted')) return message.channel.send(message.language.get("UNMUTE_USER_NOT_MUTED"));
                await member.roles.remove(muteRole.id)
                    .then(r => {
                        message.channel.send(message.language.get("UNMUTE_SUCCESS", member));
                        member.send(message.language.get("UNMUTE_USER_SUCCESS", message));
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
                                        title: lang.get(`UNMUTE_EMBED_TITLE`),
                                        description: lang.get('UNMUTE_EMBED_DESC', member),
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
                    .catch((error) => message.channel.send(`<:lycosX:631854509798326322> ${message.author} ${message.language.get("UNMUTE_ERROR")} ${error}`));
            }
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = unmute;