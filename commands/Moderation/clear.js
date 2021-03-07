const Command = require("../../base/Command.js");

class clear extends Command {
    constructor(client) {
        super(client, {
            name: "clear",
            description: (language) => language.get("CLEAR_DESCRIPTION"),
            usage: (language, prefix) => language.get("CLEAR_USAGE", prefix),
            examples: (language, prefix) => language.get("CLEAR_EXAMPLE", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "Server Moderator",
            botPermissions: ["MANAGE_CHANNELS"],
            nsfw: false,
            adminOnly: false,
            cooldown: 1000,
        });
    }

    async run(message) {
        try {
            const filter = (reaction, user) => ["✅", "❌"].includes(reaction.emoji.name) && user.id === message.author.id
            message.channel.send(`:warning: Êtes-vous sûrs de vouloir supprimer le channel ? (vous avez 30 secondes)`).then(async msg => {
                await msg.react("✅")
                await msg.react("❌")

                msg.awaitReactions(filter, {
                    max: 1,
                    time: 30000,
                    errors: ['time']
                }).then(async collected => {
                    try {
                    const reaction = collected.first()

                    if (reaction.emoji.name === "✅") {
                        msg.delete()
                        const position = message.channel.position;
                        const newChannel = await message.channel.clone();
                        await message.channel.delete();
                        newChannel.setPosition(position);
                        return;
                    }

                    if (reaction.emoji.name === "❌") {
                        msg.delete()
                        message.channel.send({
                            embed: {
                                color: 0xffcc00&&0x2f3136,
                                description: message.language.get('CANCEL_X')
                            }
                        }).then(async m => {
                            setTimeout(function() {
                                m.delete()
                                message.delete()
                            }, 5000)
                        }).catch(async(err) => {
                            await console.error(err)
                        })
                        return;
                    }
                    setTimeout(function() {
                        try {
                        msg.delete()
                        message.channel.send({
                            embed: {
                                color: 0xffcc00&&0x2f3136,
                                description: message.language.get('CANCEL_30_SECONDS')
                            }
                        }).then(async m => {
                            setTimeout(function() {
                                m.delete()
                                message.delete()
                            }, 5000)
                        }).catch(async(err) => {
                            await console.error(err)
                        })
                    } catch (error) {
                        console.error(error);
                        return message.channel.send(message.language.get("ERROR", error));
                    }
                    }, 30000)
                } catch (error) {
                    console.error(error);
                    return message.channel.send(message.language.get("ERROR", error));
                }
                })
            })
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = clear;
