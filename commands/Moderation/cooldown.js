const Command = require("../../base/Command.js");
const ms = require("ms");
class cooldown extends Command {
    constructor(client) {
        super(client, {
            name: "giveaway",
            description: (language) => language.get("GIVEAWAY_DESCRIPTION"),
            usage: (language, prefix) => language.get("GIVEAWAY_USAGE", prefix),
            examples: (language, prefix) => language.get("GIVEAWAY_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            permLevel: "Server Moderator",
            botPermissions: ["MANAGE_MESSAGES"],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000,
        });
    }

    async run(message, args) {
        try {
            const talkedRecently = new Set();
            talkedRecently.add(message.author.id);
            setTimeout(() => {
                talkedRecently.delete(message.author.id)
            },86400000)
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = cooldown;
