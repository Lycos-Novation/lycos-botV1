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
            botPermissions: ["MANAGE_MESSAGES"],
            nsfw: false,
            adminOnly: false,
            cooldown: 1000,
        });
    }

    async run(message) {
        try {
            message.channel.messages.fetch()
                .then(function (list) {
                    message.channel.bulkDelete(list)
                })
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = clear;
