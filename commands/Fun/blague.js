const Command = require("../../base/Command.js");
const fetch = require("node-fetch");
class Number extends Command {
    constructor(client) {
        super(client, {
            name: "blague",
            description: (language) => language.get("BLAGUE_DESCRIPTION"),
            usage: (language, prefix) => language.get("BLAGUE_USAGE", prefix),
            examples: (language, prefix) => language.get("BLAGUE_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            permLevel: "Server Moderator",
            botPermissions: ["EMBED_LINKS"],
            aliases: ["joke", "blagues", "jokes"],
            nsfw: false,
            adminOnly: false,
            cooldown: 2000,
        });
    }

    run(message, args) {
        try {
            if (message.settings.language !== "french") return message.channel.send(message.language.get("BLAGUE_NOT_AVALIABLE"));
            fetch('https://www.blagues-api.fr/api/random', {
                headers: {
                    'Authorization': `Bearer [Token]`
                }
            })
                .then(response => response.json())
                .then(data => {
                    return message.channel.send({
                        embed: {
                            author: {
                                name: message.bot.user.username,
						        icon_url: message.bot.user.displayAvatarURL({format: "png",dynamic: true})
                            },
                            fields: [
                                {
                                    name: message.language.get("BLAGUE_QUESTION"),
                                    value: data.joke,
                                },
                                {
                                    name: message.language.get("BLAGUE_ANSWER"),
                                    value: `||${data.answer}||`,
                                },
                            ],
                            color: message.config.embed.color,
                            timestamp: new Date(),
					        footer: {
						        text: message.language.get("BLAGUE_FOOTER", data.type, data.id),
					        },
                        },
                    });
                })
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = Number;
