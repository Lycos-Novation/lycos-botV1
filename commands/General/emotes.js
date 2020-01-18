const Command = require("../../base/Command.js");

class emotes extends Command {
    constructor(client) {
        super(client, {
            name: "emotes",
            description: (language) => language.get("EMOTES_DESCRIPTION"),
            usage: (language, prefix) => language.get("EMOTES_USAGE", prefix),
            examples: (language, prefix) => language.get("EMOTES_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "User",
            aliases: ["emojis", "emotes-list", "emojis-list"],
            botPermissions: ["MANAGE_ROLES"],
            nsfw: false,
            adminOnly: false,
            cooldown: 1000,
        });
    }

    async run(message, args) {
        try {
            await message.channel.send({
                embed: {
                    "color": message.config.embed.color,
                    "author": {
                        "name": message.language.get("EMOTES_TITLE"),
                        "icon_url": message.guild.iconURL,
                    },
                    "description": message.language.get("EMOTES_DESC", message),
                    "fields": [{
                        "name": message.language.get("EMOTES_TITLES")[0] + ` (${message.guild.emojis.filter(e => !e.animated).size})`,
                        "value": message.guild.emojis.filter(e => !e.animated).map(e => `${e}`).join(' '),
                        "inline": true,
                    },
                        {
                            "name": message.language.get("EMOTES_TITLES")[1]+ ` (${message.guild.emojis.filter(e => e.animated).size})`,
                            "value": message.guild.emojis.filter(e => e.animated).map(e => `${e}`).join(' '),
                            "inline": false,
                        },
                    ],
                    "timestamp": new Date(),
                    "footer" : {
                        "text" : message.config.embed.footer,
                    },
                },
            })
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = emotes;
