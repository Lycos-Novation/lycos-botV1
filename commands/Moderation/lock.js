const Command = require("../../base/Command.js");

class Lock extends Command {
    constructor(client) {
        super(client, {
            name: "lock",
            description: (language) => language.get("LOCK_DESCRIPTION"),
            usage: (language, prefix) => language.get("LOCK_USAGE", prefix),
            examples: (language, prefix) => language.get("LOCK_EXAMPLES", prefix),
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
            if (check && check.deny.toArray().includes("SEND_MESSAGES")) {
                return message.channel.send(message.language.get("ALREADY_LOCKED"))
            } else if (!check) {
                message.channel.createOverwrite(role, {
                    SEND_MESSAGES: false
                })
            } else {
                message.channel.permissionOverwrites.get(role.id).update({
                    SEND_MESSAGES: false
                })
            }
            return message.channel.send(message.language.get("LOCKED"))
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = Lock;
