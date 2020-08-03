const Command = require("../../base/Command.js");
const fetch = require("node-fetch");
class Number extends Command {
    constructor(client) {
        super(client, {
            name: "joke",
            description: (language) => language.get("BLAGUE_DESCRIPTION"),
            usage: (language, prefix) => language.get("BLAGUE_USAGE", prefix),
            examples: (language, prefix) => language.get("BLAGUE_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            permLevel: "User",
            botPermissions: ["SEND_MESSAGES"],
            aliases: ["blague", "blagues", "jokes"],
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
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTUzMTYzMzA4ODAxNzIwMzIxIiwibGltaXQiOjEwMCwia2V5IjoiYUl3YXoxSk5BeWVramtCS0d5VE1XbkRiTFRGOXk0bDFVOHJlTFlka0xCcXdyVzZhbVAiLCJjcmVhdGVkX2F0IjoiMjAyMC0wNC0xOVQyMzozMTozMyswMjowMCIsImlhdCI6MTU4NzMzMTg5M30.VtRtZDm1MuU23OCeJog8rCz1npFSUKqQ3MpbyHLaPII`
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
                });
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = Number;
