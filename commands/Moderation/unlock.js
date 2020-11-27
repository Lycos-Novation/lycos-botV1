const Command = require("../../base/Command.js");

class Unlock extends Command {
    constructor(client) {
        super(client, {
            name: "unlock",
            description: (language) => language.get("UNLOCK_DESCRIPTION"),
            usage: (language, prefix) => language.get("UNLOCK_USAGE", prefix),
            examples: (language, prefix) => language.get("UNLOCK_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "Server Moderator",
            botPermissions: ["MANAGE_CHANNELS", "SEND_MESSAGES"],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000,
        });
    }

    async run(message) {
        try {
            let role = message.guild.roles.everyone;
            let check = message.channel.permissionOverwrites.get(role.id);
            if (check && check.allow.toArray().includes("SEND_MESSAGES")) {
                return message.channel.send(message.language.get("NOT_LOCKED"));
            } else {
                message.channel.permissionOverwrites.get(role.id).update({
                    SEND_MESSAGES: true
                })
            }
            return message.channel.send(message.language.get("UNLOCKED"));
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = Unlock;
