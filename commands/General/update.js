const Command = require("../../base/Command.js");
const {version} = require("../../package.json");

class Update extends Command {
    constructor(client) {
        super(client, {
            name: "update",
            description: (language) => language.get("UPDATE_DESCRIPTION"),
            usage: (language, prefix) => language.get("UPDATE_USAGE", prefix),
            examples: (language, prefix) => language.get("UPDATE_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "User",
            botPermissions: ["SEND_MESSAGES"],
            aliases: ["updates", "maj"],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000,
        });
    }

    async run(message) {
        try {
            //add : 0x1EF121 | update : 0xF5870A | remove : 0xF40C0C
            message.channel.send({
                embed: {
                        color: 0x1EF121,
                        footer: {
                            text: message.config.embed.footer
                        },
                        title: message.language.get("UPDATE_TITLE", version),
                        description: message.language.get("UPDATE_ADD"),
                    }
            })
            return message.channel.send({
                embed: {
                        color: 0xF5870A,
                        footer: {
                            text: message.config.embed.footer
                        },
                        title: message.language.get("UPDATE_TITLE", version),
                        description: message.language.get("UPDATE_UPDATE"),
                    }
            })
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = Update;
